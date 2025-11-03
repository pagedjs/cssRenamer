const csstree = require("css-tree");

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

@tamere {
ok: true;
}

body {
chaussette: socks;
}
`;

letsgo();

function letsgo() {
  const ast = csstree.parse(css, { positions: true });

  // let’s create a clone of the ast and then replace the rule in the new css ast

  // Walk AST

  // console.log(node, item, list);
  renameAtRule({ name: "page", replacement: "paged-page", ast });
  renameAtRule({ name: "footnotes", ast });
  renameProperty({
    property: "chaussette",
    replacement: "--paged-socks",
    ast,
  });

  // renameProperty("property", ast);
  // renameValue("property", ast);

  document.querySelector("pre").textContent = csstree.generate(ast);
}

function renameValue({ value, property, replacement, ast }) {
  const replacements = [];

  csstree.walk(ast, {
    visit: "Declaration",
    enter: (node, item, list) => {
      //only check a specific property?

      if (property) {
        if (node.property === property) {
          const valueString = csstree.generate(node.value);
          if (!valueName || valueString === valueName) {
            replacements.push({ node, item, list, valueString });
          }
        }
      } else {
        const valueString = csstree.generate(node.value);
        if (value || valueString === value) {
          replacements.push({ node, item, list, value });
        }
      }
    },
  });

  for (const { node, item, list, value } of replacements) {
    // Create new property and value names
    // let newProperty = replacement ? replacement : `--paged-${node.property}`;
    // let newValue = `paged-value-${valueString.replace(/\s+/g, "-")}`;

    // Build new Declaration node
    const newDeclaration = {
      type: "Declaration",
      loc: node.loc,
      important: node.important,
      property: value,
      value: csstree.parse(value, { context: "value" }),
    };

    // Replace the old declaration
    const newItem = list.createItem(newDeclaration);
    list.replace(item, newItem);
  }
}

function renameProperty({ propertyName, replacement, valueName, ast }) {
  const replacements = [];

  csstree.walk(ast, {
    visit: "Declaration",
    enter: (node, item, list) => {
      // Match property name (case-insensitive)
      if (node.property === propertyName) {
        // Optionally, also match specific value
        const valueString = csstree.generate(node.value);
        if (!valueName || valueString === valueName) {
          replacements.push({ node, item, list, valueString });
        }
      }
    },
  });

  for (const { node, item, list, valueString } of replacements) {
    // Create new property and value names
    // let newProperty = replacement ? replacement : `--paged-${node.property}`;
    // let newValue = `paged-value-${valueString.replace(/\s+/g, "-")}`;

    // Build new Declaration node
    const newDeclaration = {
      type: "Declaration",
      loc: node.loc,
      important: node.important,
      property: valueString,
      value: csstree.parse(newValue, { context: "value" }),
    };

    // Replace the old declaration
    const newItem = list.createItem(newDeclaration);
    list.replace(item, newItem);
  }
}
function renameAtRule({ name, replacement, ast }) {
  const replacements = [];

  csstree.walk(ast, {
    visit: "Atrule",
    enter: (node, item, list) => {
      if (node.name === name) {
        replacements.push({ node, item, list });
      }
    },
  });

  let paged = {};

  for (const { node, item, list } of replacements) {
    if (node.prelude) {
      paged.name = csstree.generate(node.prelude).split(":")[0];
      paged.pseudo = csstree.generate(node.prelude).split(":")[1];
    }

    const newRule = {
      type: "Rule",
      prelude: csstree.parse(
        `${replacement ? replacement : `.paged-${name}`}${paged.name ? `.paged-name-${paged.name}` : ``}${paged.pseudo ? `.paged-pseudo-${paged.pseudo}` : ``}`,
        { context: "selectorList" },
      ),
      loc: node.loc,
      block: csstree.clone(node.block),
    };

    const newItem = list.createItem(newRule);
    list.replace(item, newItem);
  }
}

function renameAtPage(node, item, list) {
  let paged = {};

  if (node.prelude) {
    paged.name = csstree.generate(node.prelude).split(":")[0];
    paged.pseudo = csstree.generate(node.prelude).split(":")[1];
  }

  const newRule = {
    type: "Rule",
    prelude: csstree.parse(
      `.paged-page${paged.name ? `.paged-name-${paged.name.trim}` : ``}${paged.pseudo ? `.paged-pseudo-${paged.pseudo}` : ``}`,
      { context: "selectorList" },
    ),
    loc: node.loc,
    block: csstree.clone(node.block),
  };

  const newItem = list.createItem(newRule);

  list.replace(item, newItem);
}
