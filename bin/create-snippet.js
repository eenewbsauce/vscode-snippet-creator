#! /usr/bin/env node

const fs = require("fs");
const path = require("path");

const [fileName = "template.js"] = process.argv.slice(2);

const linesWithContent = line => line !== "";
const cleanCommentSegment = (segment, delimiter) =>
  segment
    .split(delimiter)[1]
    .trim()
    .replace(/"/g, "");

const file = fs.readFileSync(path.join(__dirname, "..", fileName)).toString();

const snippetGroups = file.split("/**").filter(linesWithContent);

const snippets = {};

snippetGroups.forEach((element, i) => {
  const parts = element.split("*/");
  const comment = parts[0].split("\n").filter(linesWithContent);
  const description = cleanCommentSegment(comment[0], "description:");
  const prefix = cleanCommentSegment(comment[1], "prefix:");
  const body = parts[1].split("\n").map(line => line.replace("\t", "    "));

  snippets[description] = {
    prefix,
    body,
    description
  };
});

console.log(JSON.stringify(snippets, null, 4));
