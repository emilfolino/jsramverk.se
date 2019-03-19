const compiler = require("./compiler.js");

compiler.createHeader(compiler.createIndex);
compiler.createHeader(
    compiler.createAssignments,
    ["atom-one-dark.css"],
    [
        "scroll.min.js",
        "highlight.pack.js"
    ]
);
