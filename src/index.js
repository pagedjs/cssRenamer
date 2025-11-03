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

body {
  font-family: Arial;
}
`;

letsgo();

function letsgo() {
  const ast = csstree.parse(css, { positions: true });

  // let’s create a clone of the ast and then replace the rule in the new css ast

  // Walk AST

  // console.log(node, item, list);
  renameAtRule("page", ast);
  renameAtRule("footnotes", ast);

  document.querySelector("pre").textContent = csstree.generate(ast);
}

function renameAtRule(name, ast) {
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
        `.paged-${name}${paged.name ? `.paged-name-${paged.name}` : ``}${paged.pseudo ? `.paged-pseudo-${paged.pseudo}` : ``}`,
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
      `.paged-page${paged.name ? `.paged-name-${paged.name}` : ``}${paged.pseudo ? `.paged-pseudo-${paged.pseudo}` : ``}`,
      { context: "selectorList" },
    ),
    loc: node.loc,
    block: csstree.clone(node.block),
  };

  const newItem = list.createItem(newRule);

  list.replace(item, newItem);
}
