import * as csstree from "css-tree";
import { format } from "@projectwallace/format-css";

const css = `
@page {
  margin: 1cm;
  size: A4;
}

@page introduction {
  color:red;
}
@page introduction:right {
@footnotes {
  display: span;
}
  color:red;
}
@page:left {
  color:red;
}

body {
  chaussette: socks;
}`;

renamer();

function renamer() {
  const ast = csstree.parse(css, { positions: true });

  // renameAtRule({ name: "page", replacement: "paged-page", ast });
  // renameAtRule({ name: "footnotes", ast });
  // renameProperty({
  //   property: "chaussette",
  //   replacement: "--paged-socks",
  //   ast,
  // });
  //
  //
  //
  renameAtRule({ name: "page", replacement: "paged-page", ast });
  renameProperty({
    property: "chaussette",
    replacement: "--paged-chaussette",
    ast,
  });
  // renameValue({ value: "socks", ast });

  document.querySelector("pre").textContent = format(csstree.generate(ast), {
    tab_size: 2,
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

  let prelude = {};

  for (const { node, item, list } of replacements) {
    if (node.prelude) {
      prelude.name = csstree.generate(node.prelude).split(":")[0];
      prelude.pseudo = csstree.generate(node.prelude).split(":")[1];
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
