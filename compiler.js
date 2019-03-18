const fs = require("fs");

const markdown = require("markdown").markdown;
const slugify = require("slugify");

const includes = "./includes/";
const content = "./content/";
const output = "./output/";

const createHeader = function (next, additionalJS=[]) {
    fs.readFile(`${includes}header.html`, 'utf8', (err, data) => {
        if (err) {
            console.error(err.message);
        }

        let jsScripts = "";

        additionalJS.forEach(function(js) {
            jsScripts += `<script defer src='${js}'></script>\n`;
        });

        data = data.replace("{{jsScripts}}", jsScripts);

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
};

const createAssignments = function (header) {
    fs.readdir(content, (err, files) => {
        files.forEach(file => {
            fs.readFile(`${content}${file}`, 'utf8', (err, data) => {
                if (err) {
                    console.error(err.message);
                }

                let parsed = markdown.parse(data);

                let allElements = parsed.map((element, index) => {
                    switch (element[0]) {
                        case "header":
                            return handleHeader(element, index);
                        case "para":
                            return `<p>${element[1]}</p>`;
                        default:
                            break;
                    }
                });

                let h1 = parsed.filter((element) => {
                    return Array.isArray(element) &&
                        element[0] === 'header' &&
                        element[1].level === 1;
                })[0][2];

                let headers = parsed.filter((element) => {
                    return Array.isArray(element) &&
                        element[0] === 'header';
                });

                let breadcrumb = createBreadCrumbs(h1);
                let main = createMain(headers, allElements.join("\n"));
                let result = header + breadcrumb + main;
                let filename = file.replace("md", "html");

                addFooterAndWriteToFile(result, filename);
            });
        });
    });
};

const handleHeader = function (element, index) {
    let slug = slugify(element[2]);
    let level = element[1].level;
    let returnedString = "";

    if (index) {
        returnedString = "</section>";
    }

    returnedString += `<section  id="${slug}">`;
    returnedString += `<h${level}><a href="#${slug}">${element[2]}</a></h${level}>`;

    return returnedString;
};

const createMain = function (headers, article) {
    let pattern = /<h2>(.*?)<\/h2>/i;

    article.replace(pattern, "<h2><a href='#'>$1</a></h2>");

    return "<div class='week-container'>" +
        createTOC(headers) +
        createArticle(article) +
        "</section>" +
        "</div>";
};

const createBreadCrumbs = function (current) {
    return `<p class='breadcrump'><a href='/'>jsramverk.me</a> / ${current}</p>`;
};

const createTOC = function (headers) {
    let output = "<nav class='toc'><ul>";

    headers.forEach((header) => {
        let slug = slugify(header[2]);

        output += `<li><a href='#${slug}'>${header[2]}</a></li>`;
    });
    output += "</ul></nav>";

    return output;
};

const createArticle = function (content) {
    return `<article class='week'>${content}</article>`;
};

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
    });
};

createHeader(createIndex);
createHeader(createAssignments, ["scroll.min.js"]);
