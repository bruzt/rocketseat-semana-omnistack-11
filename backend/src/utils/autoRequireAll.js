const path = require('path');
const fs = require('fs');

function autoRequireAll(sourcePath, dirPath) {

    const requires = {};

    var normalizedPath = path.join(sourcePath, dirPath);

    fs.readdirSync(normalizedPath).forEach( (file) => {

        const filePath = `${normalizedPath}/` + file;

        if(fs.lstatSync(filePath).isFile()){ // verify if it is a file, not a directory

            const fileName = file.split('.')[0] // remove .js
            
            requires[fileName] = require(filePath);
        }
    });

    return requires;
}

module.exports = autoRequireAll;