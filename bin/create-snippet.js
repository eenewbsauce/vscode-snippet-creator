#! /usr/bin/env node

const fs = require("fs");
const path = require("path");

const [
  fileName,
  description = "Sample Snippet",
  prefix = "ss"
] = process.argv.slice(2);

if (!fileName) {
  console.error("You must provide a path/name of template file");
  console.error("eg: createSnippet foo.js description prefix");
  process.exit();
}

const file = fs.readFileSync(path.join(__dirname, "..", fileName)).toString();

const body = file.split("\n").map(line => line.replace("\t", "    "));

const snippet = {
  [description]: {
    prefix,
    body,
    description
  }
};

console.log(JSON.stringify(snippet, null, 4));
