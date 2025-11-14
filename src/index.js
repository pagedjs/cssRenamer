import * as csstree from "css-tree";
import { format } from "@projectwallace/format-css";
import loadAllStylesheets from "./utils/loadStylesheets";
import { pagedjsRenamer } from "./modules/dictionnary";
import "@andypf/json-viewer";
import { getCSSOMStringFromCSS } from "./cssom/cssom";

renamer();

/**
 * Loads all stylesheets, renames their CSS AST using `pagedjsRenamer`,
 * and renders the original and transformed CSS, along with their CSSOM representations,
 * into the document as formatted sections.
 *
 * This is the main entry point that triggers stylesheet transformation and display.
 *
 * @async
 * @function renamer
 * @returns {Promise<void>} A promise that resolves when all stylesheets have been processed and displayed.
 */
async function renamer() {
  let stylesheets = await loadAllStylesheets();
  const renamedAsts = [];

  stylesheets.forEach((stylesheet) => {
    console.log(stylesheet);
    let section = document.createElement("section");
    section.classList.add("styles");
    section.insertAdjacentHTML("beforeend", `<h2>${stylesheet.filename}</h2>`);

    section.insertAdjacentHTML(
      "beforeend",
      `<div><h3>source</h3><pre>${format(stylesheet.rules, { tab_size: 2 })}</pre></div>`,
    );
    section.insertAdjacentHTML(
      "beforeend",
      `<div><h3>CSSOM from source</h3><pre>${format(stylesheet.cssom, { tab_size: 2 })}</pre></div>`,
    );

    section.insertAdjacentHTML(
      "beforeend",
      `<div><h3>transformed</h3>
<pre>${format(csstree.generate(pagedjsRenamer(stylesheet.ast)), { tab_size: 2 })}</pre></div>`,
    );

    section.insertAdjacentHTML(
      "beforeend",
      `<div><h3>CSSOM from transformed CSS</h3><pre>${format(getCSSOMStringFromCSS(csstree.generate(pagedjsRenamer(stylesheet.ast))), { tab_size: 2 })}</pre></div>`,
    );

    document.body.insertAdjacentElement("beforeend", section);
  });
}
