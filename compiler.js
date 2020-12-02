const fs = require("fs");
const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
});
const slugify = require("slugify");
const minify = require('html-minifier').minify;

const hljs = require('highlight.js');
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();

const includes = "./includes/";
const content = "./content/";
const output = "./output/";
const mainTitle = "jsramverk.se";

const compiler = {
    createHeader: function (next) {
        fs.readFile(`${includes}header.html`, 'utf8', (err, data) => {
            if (err) {
                console.error(err.message);
            }

            fs.readFile(`${output}style.min.css`, 'utf8', (err, cssData) => {
                if (err) {
                    console.error(err.message);
                }

                next(data.replace("{{inline-style}}", cssData));
            });
        });
    },

    createIndex: function (header) {
        fs.readFile(`${includes}index.html`, 'utf8', (err, data) => {
            if (err) {
                console.error(err.message);
            }

            let outputContent = header.replace("{{title}}", mainTitle) + data;

            compiler.addFooterAndWriteToFile(outputContent, "index.html");
        });
    },

    createAssignments: function (header) {
        fs.readdir(content, (err, files) => {
            if (err) {
                console.error(err.message);
            }

            files.forEach(file => {
                fs.readFile(`${content}${file}`, 'utf8', (err, data) => {
                    if (err) {
                        console.error(err.message);
                    }

                    let parsed = md.render(data);

                    let h1Pattern = /<h1>[a-zA-Z0-9äöåÄÖÅ -_,]*<\/h1>/gi;
                    let h1 = parsed.match(h1Pattern)[0].replace(/<\/?h1>/g, '');

                    let headerPattern = /<h[1-4]>[a-zA-Z0-9äöåÄÖÅ -_,]*<\/h[1-4]>/gi;
                    let headers = parsed.match(headerPattern).map((header) => {
                        let headerNumber = header.match(/\d/i)[0];
                        let headerText = header.replace(/<\/?h\d>/g, '');
                        return {
                            number: headerNumber,
                            text: headerText,
                        };
                    });

                    let authorPattern = /<p class="author">(.*?)<\/p>/i;
                    let match = parsed.match(authorPattern);

                    if (match) {
                        let author = match[1];
                        let updated = new Date(
                            fs.statSync(`${content}${file}`).mtime)
                            .toJSON()
                            .substring(0, 10
                            );
                        let authorIntro = `<p class="author">Skriven av:` +
                            ` ${author}. Uppdaterad: ${updated}</p>`;

                        parsed = parsed.replace(authorPattern, authorIntro);
                    }

                    parsed = compiler.codeHighlighting(parsed);
                    parsed = compiler.makeSections(parsed);

                    let breadcrumb = compiler.createBreadCrumbs(h1);
                    let main = compiler.createMain(headers, parsed);
                    let filename = file.replace("md", "html");

                    let customHeader = header.replace(
                        "{{title}}",
                        mainTitle + " - " + h1
                    );

                    let result = customHeader + breadcrumb + main;

                    compiler.addFooterAndWriteToFile(result, filename);
                });
            });
        });
    },

    codeHighlighting: function (parsed) {
        let codePattern = /<pre><code class=\"(.*?)\">(.*?)<\/code><\/pre>/sgi;
        let matches = parsed.match(codePattern);

        if (matches) {
            matches.forEach(function(match) {
                let classPattern = /<code class=\"language-(.*?)\">/i;
                let language = classPattern.exec(match)[1];

                let codePattern = /<code class=\"[a-zA-Z\-]*\">(.*?)<\/code>/si;
                let code = codePattern.exec(match)[1];

                code = entities.decode(code);

                let highlightedCode = hljs.highlight(language, code).value;

                let replaceCodeSnippet = `<pre><code class="language-${language} hljs">${highlightedCode}</code></pre>`;

                parsed = parsed.replace(match, replaceCodeSnippet);
            });
        }

        return parsed;
    },

    makeSections: function (parsed) {
        let sectionPattern = /<h\d>(.*?)<\/h\d>/gi;
        let matches = parsed.match(sectionPattern);

        matches.forEach(function (stringMatch, index) {
            let replaceString = "";
            let title = stringMatch.replace(/<\/?h\d>/g, '');
            let slug = slugify(
                title.toLowerCase(),
                {
                    remove: /[*+~.()'"!:@]/g,
                    lower: true
                }
            );
            let level = stringMatch[2];

            if (level <= 3) {
                if (index) {
                    replaceString += "</section>";
                }

                replaceString += `<section id="${slug}">`;
                replaceString += `<h${level}><a href="#${slug}">${title}</a></h${level}>`;

                parsed = parsed.replace(stringMatch, replaceString);
            }

            if (level == 4) {
                replaceString += `<h${level} id="${slug}">`+
                    `<a href="#${slug}">${title}</a></h${level}>`;

                parsed = parsed.replace(stringMatch, replaceString);
            }
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
        return `<p class='breadcrump'><a href='/'>jsramverk.se</a> / ${current}</p>`;
    },

    createTOC: function (headers) {
        let output = "<nav class='toc' id='toc'><ul>";

        headers.forEach((header) => {
            if (header.number < 4) {
                let slug = slugify(
                    header.text.toLowerCase(),
                    {
                        remove: /[*+~.()'"!:@]/g,
                        lower: true
                    }
                );

                output += `<li class='${header.number > 2 ? "small" : ""}'><a href='#${slug}'>${header.text}</a></li>`;
            }
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

            outputContent = minify(outputContent, {
                removeAttributeQuotes: true,
                removeComments: true,
                collapseBooleanAttributes: true,
                collapseWhitespace: true
            });

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
