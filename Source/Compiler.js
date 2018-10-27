function compile(file, destinationTemplatePath){
    const destinationTemplate = require(destinationTemplatePath);
    file.forEach(function(line){
        if (Object.keys(destinationTemplate.intents).includes(line.intent)){
            let destinationFormatting = destinationTemplate.intents[line.intent]
            destinationFormatting = destinationFormatting.match(/{.+?}/g)
            formattingArray = []
            destinationFormatting.forEach(function(formatting){
                formattingArray.push(formatting.replace(/[{}]/g, ""));
            })
            
            formattedLine = destinationTemplate.intents[line.intent].replace(/[{}]/g, "");
            formattingArray.forEach(function(replacedValue){
                formattedLine = formattedLine.replace(replacedValue, line[replacedValue])
            })
            console.log(formattedLine)
            
        }
    });

}

// const sourceFile = require("./Parser");
// exampleSource = new sourceFile("./Examples/example-addition.ts");
// exampleSource = exampleSource.parseAllLines();
// compile(exampleSource, "../Examples/template-python.json");
// console.log(exampleSource.parseAllLines());

// const sourceFile = require("./Parser");
// exampleSource = new sourceFile("./Examples/example-addition.ts");
// exampleSource = exampleSource.parseAllLines();
// compile(exampleSource, "../Examples/template-python.json");

const TemplateEngine = require("./TemplateEngine");
let testTemplate = new TemplateEngine("../Examples/template-python.json")

const sourceFile = require("./Parser");
exampleSource = new sourceFile("./Examples/example-addition.ts");
exampleSource = exampleSource.parseAllLines();

console.log(testTemplate.replaceKeywords(exampleSource))
// var myString = "This is {name}'s {adjective} {type} in JavaScript! Yes, a {type}!",
//     replaceArray = ['name', 'adjective', 'type'],
//     replaceWith = ['John', 'simple', 'string'];

// for(var i = 0; i < replaceArray.length; i++) {
//     myString = myString.replace(new RegExp('{' + replaceArray[i] + '}', 'gi'), replaceWith[i]);
// }




// var myString = "This is {name}'s {adjective} {TYPE} in JavaScript! Yes, a { type }!";

// var regex = /{(.*?)}/g;
// myString.replace(regex, (m, c) => ({
//     "name": "John",
//     "adjective": "simple",
//     "type": "string"
// })[c.trim().toLowerCase()]);