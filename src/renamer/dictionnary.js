import { renameAtRule, renameProperty, renameValue } from "..";

// function to rename all the needed part for pagedjs.

let properties = [
  ["chaussette", "--paged-chaussette"],
  ["bleed", "--paged-bleed"],
  ["marks", "--paged-marks"],
];

let atRules = [["page", "paged-page"]];

export function pagedjsRenamer(ast) {
  for (item of properties) {
    renameProperty({ property: item[0], replacement: item[1], ast });
  }

  for (item of atRules) {
    renameAtRule({ name: item[0], replacement: item[1], ast });
  }

  //   renameProperty({
  //   property: "chaussette",
  //   replacement: "--paged-chaussette",
  //   ast,
  // });
  // renameValue({ value: "socks", replacement: "var(--paged-socks)", ast });
  //
  // //
  // renameProperty({
  //   property: "bleed",
  //   replacement: "--bleed",
  //   ast,
  // });
  //
  // //marks
  // renameProperty({
  //   property: "marks",
  //   replacement: "--marks",
  //   ast,
  // });

  return ast;
}
