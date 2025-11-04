import { Sheet } from "./modules/sheet.js";
import * as csstree from "css-tree";

class RenameCSS extends Sheet {
  constructor(url) {
    super(url);

    // Register hook for @page transformation
    this.hooks.onAtPage.register(this.transformAtPage.bind(this));
  }

  /**
   * Transform @page into .paged-page
   */
  transformAtPage(node, item, list) {
    // Extract all declarations (children of the block)
    const declarations = [];
    node.block.children.forEach((decl) => {
      // Clone each declaration node deeply
      declarations.push(csstree.clone(decl));
    });

    // Create a new Block node with those cloned declarations
    const newBlock = {
      type: "Block",
      children: new csstree.List(),
    };
    declarations.forEach((decl) => newBlock.children.appendData(decl));

    console.log(newBlock);

    // Build a new Rule node to replace the @page
    const newRule = {
      type: "Rule",
      prelude: csstree.parse(".paged-page", { context: "selectorList" }),
      block: newBlock,
    };

    console.log(newRule);
    console.log(csstree.generate(newRule));

    // Replace @page node in the list with the new .paged-page rule
    list.replace(
      item,
      csstree.parse(csstree.generate(newRule), { context: "rule" }),
    );
  }

  async parseAndTransform(cssText) {
    // Parse the CSS text
    this.ast = csstree.parse(cssText, {
      parseAtrulePrelude: true,
      parseRulePrelude: true,
    });

    console.log(this.ast);

    // Walk the AST to find @page rules and transform them
    csstree.walk(this.ast, {
      visit: "Atrule",
      enter: (node, item, list) => {
        if (node.name === "page") {
          this.transformAtPage(node, item, list);
          console.log(node, item, list);
        }
      },
    });
    // return;

    // Return transformed CSS
    return csstree.generate(this.ast);
  }
}

// Example usage
const css = `
@page {
  margin: 1in;
  size: A4;
}
`;

const renamer = new RenameCSS();
renamer.parseAndTransform(css).then((output) => {
  console.log(output);
});
