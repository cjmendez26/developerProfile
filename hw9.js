const fs = require("fs");
const util = require("util");

// Promisify file manipulators
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * Preset color schemes
 */
const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "green",
    headerColor: "black",
    photoBorderColor: "black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};

/** @returns {Promise<String>} A promise of the HTML template string loaded from file.  */
const html = async () => await readFile("./src/template.html", "UTF-8");

/**
 * Fills in the HTML template string
 * @param {*} data
 * @param {string} toFill
 * @returns {string} filled HTML template as string
 */
const fill = async (data, toFill) => {
  if (typeof toFill === "undefined") toFill = await html();

  for (const k in data) {
    if (typeof data[k] === "object") toFill = fill(data[k], toFill);
    else toFill = toFill.replace(new RegExp(`_${k}_`, "gmi"), data[k]);
  }

  return toFill;
};

module.exports = { fill, colors, util: { readFile, writeFile } };

