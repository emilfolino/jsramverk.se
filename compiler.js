const path = require("path");
const fs = require("fs");

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
    fs.readFile(`${includes}index.html`, 'utf8', (err, data) => {
        if (err) {
            console.error(err.message);
        }

        let outputContent = header + data;

        addFooterAndWriteToFile(outputContent, "index.html");
    });
}

const addFooterAndWriteToFile = function (content, filename) {
    fs.readFile(`${includes}footer.html`, 'utf8', (err, data) => {
        if (err) {
            console.error(err.message);
        }

        content += data;

        fs.writeFile(`${output}${filename}`, content, (err) => {
            if (err) {
                console.error(err.message);
            }

            console.log(`${filename} has been saved.`);
        });
    })
};

createHeader(createIndex);
