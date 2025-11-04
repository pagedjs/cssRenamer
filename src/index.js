import * as csstree from "css-tree";
import { format } from "@projectwallace/format-css";
import loadAllStylesheets from "./utils/loadStylesheets";
import { pagedjsRenamer } from "./renamer/dictionnary";
import "@andypf/json-viewer";
import { getCSSOMStringFromCSS } from "./cssom/cssom";
renamer();

async function renamer() {
  let stylesheets = await loadAllStylesheets();
  const renamedAsts = [];
  stylesheets.forEach((stylesheet) => {
    let section = document.createElement("section");
    section.classList.add("styles");
    section.insertAdjacentHTML("beforeend", `<h2>${stylesheet.filename}</h2>`);

    section.insertAdjacentHTML(
      "beforeend",
      `<div><h3>source</h3><pre>${stylesheet.rules}</pre></div>`,
    );
    section.insertAdjacentHTML(
      "beforeend",
      `<div><h3>transformed</h3><pre>${format(csstree.generate(pagedjsRenamer(stylesheet.ast)), { tab_size: 2 })}</pre></div>`,
    );
    section.insertAdjacentHTML(
      "beforeend",
      `<div><h3>CSSOM from source</h3><pre>${format(stylesheet.cssom, { tab_size: 2 })}</pre></div>`,
    );
    section.insertAdjacentHTML(
      "beforeend",
      `<div><h3>CSSOM from transformed CSS</h3><pre>${format(getCSSOMStringFromCSS(csstree.generate(pagedjsRenamer(stylesheet.ast))), { tab_size: 2 })}</pre></div>`,
    );

    document.body.insertAdjacentElement("beforeend", section);

    // renamedAsts.push(pagedjsRenamer(stylesheet.ast));
    // renamedAsts.forEach(() => {});
  });
}

export function renameValue({ value, property, replacement, ast }) {
  if (!value) return [];

  const replacements = [];

  csstree.walk(ast, {
    visit: "Declaration",
    enter: (node, item, list) => {
      if (!property || node.property === property) {
        const valueString = csstree.generate(node.value);
        if (valueString === value) {
          replacements.push({ node, item, list });
        }
      }
    },
  });

  for (const { node, item, list } of replacements) {
    const newDeclaration = {
      type: "Declaration",
      loc: node.loc,
      important: node.important,
      property: node.property,
      value: csstree.parse(replacement, { context: "value" }),
    };

    const newItem = list.createItem(newDeclaration);
    list.replace(item, newItem);
  }

  return replacements;
}

export function renameProperty({ property, replacement, ast }) {
  const replacements = [];

  csstree.walk(ast, {
    visit: "Declaration",
    enter: (node, item, list) => {
      // Match property name (case-insensitive)
      if (node.property === property) {
        // Optionally, also match specific value
        const valueString = csstree.generate(node.value);
        replacements.push({ node, item, list, replacement });
      }
    },
  });

  console.log(replacements);

  for (const { node, item, list, replacement } of replacements) {
    const newDeclaration = {
      type: "Declaration",
      loc: node.loc,
      important: node.important,
      property: replacement,
      value: node.value,
    };

    // Replace the old declaration
    const newItem = list.createItem(newDeclaration);
    list.replace(item, newItem);
  }
}
export function renameAtRule({ name, replacement, ast }) {
  const replacements = [];

  csstree.walk(ast, {
    visit: "Atrule",
    enter: (node, item, list) => {
      if (node.name === name) {
        replacements.push({ node, item, list });
      }
    },
  });

  for (const { node, item, list } of replacements) {
    let prelude = {};
    if (node.prelude) {
      console.log(node.prelude);
      prelude.name = csstree.generate(node.prelude).split(":")[0];
      prelude.pseudo = csstree
        .generate(node.prelude)
        .replace(/\(/g, "_")
        .replace(/\)/g, "")
        .split(":")[1];
      //remove function
    }

    const newRule = {
      type: "Rule",
      prelude: csstree.parse(
        `${replacement ? replacement : `.paged-${name}`}${prelude.name ? `.paged-name-${prelude.name}` : ``}${prelude.pseudo ? `.paged-pseudo-${prelude.pseudo}` : ``}`,
        { context: "selectorList" },
      ),
      loc: node.loc,
      block: csstree.clone(node.block),
    };

    const newItem = list.createItem(newRule);
    list.replace(item, newItem);
  }
}
