module.exports = class Template {
    constructor(filepath) {
        this.templateFile = require(filepath);
    }

    replaceKeywords(syntaxTree) {
        let replacements = this.templateFile.replacements;
        var syntaxTreeReplaced = syntaxTree;
        Object.keys(replacements).forEach(function (key) {
            // console.log(syntaxTree)
            // console.log(key, replacements[key]);
            syntaxTree.forEach((properties) => {
                Object.keys(properties).forEach((property) => {
                    if (key.includes(properties[property])) {
                        syntaxTreeReplaced[property] = replacements[key];
                    }
                })
            })
        })
        return syntaxTreeReplaced;
    }

};