module.exports = class SourceFile {
    constructor(filepath) {
        const fs = require('fs');
        this.file = fs.readFileSync(filepath, 'utf8').split(/\r?\n/);
    }


    parse(line) {
        let lineProperties = {};

        let classifiers = {
            "declaration": ["let", "var", "const"].includes(line.split(" ")[0]),
            "addition": line.includes("+"),
            "subtraction": line.includes("-")
        };

        if (classifiers.declaration) {
            lineProperties.intent = "declaration";
            lineProperties.variableName = line.split(":")[0].split(" ")[1];
            lineProperties.value = line.split(":")[1].split("=")[1];
            lineProperties.valueType = line.split(":")[1].split("=")[0];

        } else if (classifiers.addition) {
            lineProperties.intent = "addition";
            lineProperties.variableName = line.split("=")[0];
            lineProperties.firstValue = line.split("=")[1].split("+")[0];
            lineProperties.secondValue = line.split("=")[1].split("+")[1];

        } else {
            lineProperties.intent = "other";
        }

        for (let key in lineProperties) { // Trims every non-undefined value.
            if (lineProperties[key] != undefined) {
                lineProperties[key] = lineProperties[key].trim();
            }
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