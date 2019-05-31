#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();

const [shouldCommitArg] = process.argv.slice(2);
const shouldCommit = Boolean(shouldCommitArg);
const fileName = "template.js";

const linesWithContent = line => line !== "";
const cleanCommentSegment = (segment, delimiter) =>
  segment
    .split(delimiter)[1]
    .trim()
    .replace(/"/g, "");

const checkForDuplicatePrefixes = snippets => {
  const prefixes = Object.values(snippets).map(s => s.prefix);
  const uniquePrefixes = new Set(prefixes);

  if (prefixes.length !== uniquePrefixes.size) {
    console.log("Snippets not created");
    console.log("You have duplicate prefixes in your snippets.");
    process.exit();
  }
};

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

checkForDuplicatePrefixes(snippets);

if (shouldCommit) {
  fs.writeFileSync(
    path.join(
      homedir,
      "/Library/Application Support/Code/User/snippets/javascript.json"
    ),
    JSON.stringify(snippets, null, 4)
  );
} else {
  console.log(JSON.stringify(snippets, null, 4));
}

console.log("Snippets created!");
