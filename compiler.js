const fs = require("fs");
const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
});
const slugify = require("slugify");

const includes = "./includes/";
const content = "./content/";
const output = "./output/";

const compiler = {
    createHeader: function (next, additionalCSS=[], additionalJS=[]) {
        fs.readFile(`${includes}header.html`, 'utf8', (err, data) => {
            if (err) {
                console.error(err.message);
            }

            let jsScripts = "";

            additionalJS.forEach(function(js) {
                jsScripts += `<script defer src='${js}'></script>\n`;
            });

            data = data.replace("{{jsScripts}}", jsScripts);

            let cssFiles = "";

            additionalCSS.forEach(function(css) {
                cssFiles += `<link rel="stylesheet" href="${css}"` +
                    `media="none" onload="if(media!='all')media='all'">\n`;
            });

            data = data.replace("{{cssFiles}}", cssFiles);

            fs.readFile(`${output}inline.min.css`, 'utf8', (err, cssData) => {
                next(data.replace("{{inline-style}}", cssData));
            });
        });
    },

    createIndex: function (header) {
        fs.readFile(`${includes}index.html`, 'utf8', (err, data) => {
            if (err) {
                console.error(err.message);
            }

            let outputContent = header + data;

            compiler.addFooterAndWriteToFile(outputContent, "index.html");
        });
    },

    createAssignments: function (header) {
        fs.readdir(content, (err, files) => {
            files.forEach(file => {
                fs.readFile(`${content}${file}`, 'utf8', (err, data) => {
                    if (err) {
                        console.error(err.message);
                    }

                    let parsed = md.render(data);

                    let h1Pattern = /<h1>[a-zA-Z0-9äöåÄÖÅ]*<\/h1>/gi;
                    let h1 = parsed.match(h1Pattern)[0].replace(/<\/?h1>/g, '');

                    let headerPattern = /<h\d>[a-zA-Z0-9äöåÄÖÅ ]*<\/h\d>/gi;
                    let headers = parsed.match(headerPattern).map((header) => {
                        return header.replace(/<\/?h\d>/g, '');
                    });


                    parsed = compiler.makeSections(parsed);

                    let breadcrumb = compiler.createBreadCrumbs(h1);
                    let main = compiler.createMain(headers, parsed);
                    let result = header + breadcrumb + main;
                    let filename = file.replace("md", "html");

                    compiler.addFooterAndWriteToFile(result, filename);
                });
            });
        });
    },

    makeSections: function (parsed) {
        let sectionPattern = /<h\d>(.*?)<\/h\d>/gi;
        let matches = parsed.match(sectionPattern);

        matches.forEach(function (stringMatch, index) {
            let replaceString = "";
            let title = stringMatch.replace(/<\/?h\d>/g, '');
            let slug = slugify(title.toLowerCase());
            let level = stringMatch[2];

            if (index) {
                replaceString += "</section>";
            }

            replaceString += `<section  id="${slug}">`;
            replaceString += `<h${level}><a href="#${slug}">${title}</a></h${level}>`;

            parsed = parsed.replace(stringMatch, replaceString);
        });

        return parsed;
    },

    createMain: function (headers, article) {
        let pattern = /<h2>(.*?)<\/h2>/i;

        article.replace(pattern, "<h2><a href='#'>$1</a></h2>");

        return "<div class='week-container'>" +
            compiler.createTOC(headers) +
            compiler.createArticle(article) +
            "</section>" +
            "</div>";
    },

    createBreadCrumbs: function (current) {
        return `<p class='breadcrump'><a href='/'>jsramverk.me</a> / ${current}</p>`;
    },

    createTOC: function (headers) {
        let output = "<nav class='toc'><ul>";

        headers.forEach((header) => {
            let slug = slugify(header.toLowerCase());

            output += `<li><a href='#${slug}'>${header}</a></li>`;
        });
        output += "</ul></nav>";

        return output;
    },

    createArticle: function (content) {
        return `<article class='week'>${content}</article>`;
    },

    addFooterAndWriteToFile: function (outputContent, filename) {
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
    }
};

module.exports = compiler;
