import { CssTransformer } from "./modules/CssTransformer.js";
import loadAllStylesheets from "./utils/loadStylesheets";
import { format } from "@projectwallace/format-css";
import * as csstree from "css-tree";
import { getCSSOMStringFromCSS } from "./cssom/cssom.js";

// Make sure all rule files are loaded somewhere in your project
import "./modules/rules/index.js";

export function pagedjsRenamer(ast) {
  return CssTransformer.apply(ast);
}

async function renamer() {
  const stylesheets = await loadAllStylesheets();

  console.log(stylesheets);

  stylesheets.forEach((stylesheet) => {
    const section = document.createElement("section");
    section.classList.add("styles");

    const transformedAst = pagedjsRenamer(stylesheet.ast);
    const transformedCSS = csstree.generate(transformedAst);
    const transformedCSSOM = getCSSOMStringFromCSS(transformedCSS);

    console.log(stylesheet.ast);
    section.innerHTML = `
      <h2>${stylesheet.filename}</h2>

      <div>
        <h3>Source</h3>
        <pre>${format(stylesheet.rules || "", { tab_size: 2 })}</pre>
      </div>

      <div>
        <h3>CSSOM from source</h3>
        <pre>${format(stylesheet.cssom || "", { tab_size: 2 })}</pre>
      </div>

      <div>
        <h3>Transformed</h3>
        <pre>${format(transformedCSS, { tab_size: 2 })}</pre>
      </div>

      <div>
        <h3>CSSOM from transformed CSS</h3>
        <pre>${format(transformedCSSOM, { tab_size: 2 })}</pre>
      </div>
    `;

    document.body.appendChild(section);
  });
}

renamer();
