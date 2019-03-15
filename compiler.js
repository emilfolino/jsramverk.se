const path = require("path");
const fs = require("fs");

const markdown = require("markdown").markdown;

const includes = "./includes/";
const content = "./content/";
const output = "./output/";

const createHeader = function (next) {
    fs.readFile(`${includes}header.html`, 'utf8', (err, data) => {
        if (err) {
            console.error(err.message);
        }

        fs.readFile(`${output}inline.min.css`, 'utf8', (err, cssData) => {
            next(data.replace("{{inline-style}}", cssData));
        });
    });
};

const createIndex = function (header) {
    fs.readFile(`${includes}index.html`, 'utf8', (err, data) => {
        if (err) {
            console.error(err.message);
        }

        let outputContent = header + data;

        addFooterAndWriteToFile(outputContent, "index.html");
    });
}

const createAssignments = function (header) {
    fs.readdir(content, (err, files) => {
        files.forEach(file => {
            fs.readFile(`${content}${file}`, 'utf8', (err, data) => {
                if (err) {
                    console.error(err.message);
                }

                let parsed = markdown.parse(data);

                let h1 = parsed.filter((element) => {
                    return Array.isArray(element) &&
                        element[0] === 'header' &&
                        element[1].level === 1;
                })[0][2];

                let headers = parsed.filter((element) => {
                    return Array.isArray(element) &&
                        element[0] === 'header' &&
                        element[1].level > 1;
                });

                let breadcrump = createBreadCrumbs(h1);
                let toc = createTOC(headers);
                let article = createArticle(markdown.toHTML(data));
                let result = header + breadcrump + toc + article;
                let filename = file.replace("md", "html");

                addFooterAndWriteToFile(result, filename);
            });
        });
    });
};

const createBreadCrumbs = function (current) {
    return `<p class='breadcrump'><a href='/'>jsramverk.me</a> / ${current}</p>`;
};

const createTOC = function (headers) {
    let output = "<ul class='toc'>";
    headers.forEach((header) => {
        output += `<li><a href='#'>${header[2]}</a></li>`;
    });
    output += "</ul>";

    return output;
};

const createArticle = function (content) {
    return `<article class='week'>${content}</article>`;
}

const addFooterAndWriteToFile = function (outputContent, filename) {
    fs.readFile(`${includes}footer.html`, 'utf8', (err, data) => {
        if (err) {
            console.error(err.message);
        }

        outputContent += data;

        fs.writeFile(`${output}${filename}`, outputContent, (err) => {
            if (err) {
                console.error(err.message);
            }

            console.log(`${filename} has been saved.`);
        });
    })
};

createHeader(createIndex);
createHeader(createAssignments);
