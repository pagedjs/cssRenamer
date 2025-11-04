import * as csstree from "css-tree";
import { getCSSOMStringFromCSS } from "../cssom/cssom";
import { format } from "@projectwallace/format-css";

/**
 * Fetch and return full CSS text, following @import recursively.
 */
export async function getCSStext(link, seen = new Set()) {
  try {
    // Avoid circular imports
    if (seen.has(link)) {
      console.warn(`Skipping circular import: ${link}`);
      return "";
    }
    seen.add(link);

    const res = await fetch(link);
    if (!res.ok) throw new Error(`Failed to load CSS: ${res.status} ${link}`);
    const css = await res.text();

    // Parse CSS to find @import rules
    const ast = csstree.parse(css, { positions: true });
    const imports = [];

    csstree.walk(ast, {
      visit: "Atrule",
      enter(node) {
        if (node.name === "import" && node.prelude) {
          // Extract the import URL from the prelude
          const importURL = csstree
            .generate(node.prelude)
            .replace(/url\(|\)|'|"/g, "")
            .trim();
          if (importURL) imports.push(importURL);
        }
      },
    });

    // Resolve and fetch all imports recursively
    let resolvedImports = "";
    for (const i of imports) {
      // Resolve relative to current stylesheet
      const resolved = new URL(i, link).href;
      const importedCSS = await getCSStext(resolved, seen);
      resolvedImports += `\n/* Imported from ${resolved} */\n${importedCSS}`;
    }

    // Return combined CSS: imported content first, then the current CSS (without @import rules)
    const cssWithoutImports = csstree.generate(
      csstree.fromPlainObject(
        JSON.parse(
          JSON.stringify(ast, (key, value) =>
            key === "name" && value === "import" ? undefined : value,
          ),
        ),
      ),
    );

    return `${resolvedImports}\n${cssWithoutImports}`;
  } catch (err) {
    console.warn(`Could not fetch ${link}:`, err);
    return "";
  }
}

/**
 * Main loader: loads all <link> stylesheets, resolves @imports recursively.
 */
export default async function loadAllStylesheets() {
  const links = [...document.querySelectorAll(`link[href*=".css"]`)];
  const stylesheets = [];

  await Promise.all(
    links.map(async (link) => {
      if (link.dataset.pagedjsIgnore) return;

      const filename = new URL(link.href);
      let rules = await getCSStext(link.href);
      rules = format(rules, { tab_size: 2 });
      const cssom = getCSSOMStringFromCSS(rules);
      const ast = csstree.parse(rules, { positions: true });
      stylesheets.push({ filename, rules, ast, cssom });
    }),
  );

  return stylesheets;
}
