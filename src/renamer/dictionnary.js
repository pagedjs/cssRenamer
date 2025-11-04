import { renameAtRule, renameProperty, renameValue } from "..";

// function to rename all the needed part for pagedjs.

let properties = [
  ["chaussette", "--paged-chaussette"],
  ["bleed", "--paged-bleed"],
  ["marks", "--paged-marks"],
];

let atRules = [
  ["page", "paged-page"],
  ["footnotes", ".paged-footnotes"],
];

let values = [["bottom", "var(--paged-bottom)", "float"]];

export function pagedjsRenamer(ast) {
  for (item of properties) {
    renameProperty({ property: item[0], replacement: item[1], ast });
  }

  for (item of atRules) {
    renameAtRule({ name: item[0], replacement: item[1], ast });
  }

  for (item of values) {
    renameValue({
      value: item[0],
      replacement: item[1],
      property: item[2],
      ast,
    });
  }

  return ast;
}
