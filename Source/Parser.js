module.exports = class SourceFile {
    constructor(filepath) {
        const fs = require('fs');
        this.file = fs.readFileSync(filepath, 'utf8').split(/\r?\n/);
    }


    parse(line) {
        let lineProperties = {};
        let firstWord = line.split(" ")[0];

        if (["let", "var", "const"].includes(firstWord)) {
            lineProperties.intent = "declaration";
            lineProperties.variableName = line.split(":")[0].split(" ")[1];
            lineProperties.value = line.split(":")[1].split("=")[1];
            lineProperties.valueType = line.split(":")[1].split("=")[0].trim();

            for (let key in lineProperties) { // Trims every non-undefined value.
                let value = lineProperties[key];
                if (value != undefined) {
                    lineProperties[key] = value.trim();
                }

            }
        } else {
            lineProperties.intent = "other";
        }
        return lineProperties;
    }


    parseLines(lineIndexes) {
        let syntaxTree = [];
        lineIndexes.forEach(line => {
            syntaxTree.push(this.parse(this.file[line]));
        });
        return syntaxTree;
    }


    parseAllLines() {
        let syntaxTree = [];
        this.file.forEach(line => {
            syntaxTree.push(this.parse(line));
        });
        return syntaxTree;
    }
};