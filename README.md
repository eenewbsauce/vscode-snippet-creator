# VS Code Snippet Creator

## Installation

`npm install`

## Setup

- Open [template.js](./template.js)
- Add as many snippets as you'd like

eg:

```
/**
 * description: "Unit Test Server"
 * prefix: "uts"
 */
describe("$1 ::", () => {
  afterEach(() => {});

  beforeEach(() => {});

  test("Should $2", () => {});
});
```

## Run

```
createSnippet
```

Snippets are written to stdout

## Add to VS Code

- Open javascript.json
- Paste your new snippets

Enjoy : )
