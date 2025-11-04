import * as csstree from "css-tree";
import { getCSSOMStringFromCSS } from "../cssom/cssom";

export default async function loadAllStylesheets() {
  const links = [...document.querySelectorAll(`link[href*=".css"]`)];

  console.log(links);
  const stylesheets = [];

  const alldata = await Promise.all(
    links.map(async (link) => {
      //if link is not for pagedjs support
      if (link.dataset.pagedjsIgnore) {
        return;
      }

      const filename = new URL(link.href);
      const rules = await getCSStext(link.href);
      let cssom = getCSSOMStringFromCSS(rules);
      const ast = csstree.parse(rules, { positions: true });
      stylesheets.push({ filename, rules, ast, cssom });
    }),
  );

  console.log(stylesheets);

  return stylesheets;
}

export async function getCSStext(link) {
  try {
    const res = await fetch(link);
    const css = await res.text();
    return css;
  } catch (err) {
    console.warn(`Could not fetch ${link}:`, err);
    return null;
  }
}
