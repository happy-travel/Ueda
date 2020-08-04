var fs = require('fs');

/* eslint-disable no-console */

function deleteFolderRecursive(path) {
    if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
        fs.readdirSync(path).forEach((file) => {
            var curPath = path + '/' + file;

            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });

        console.log(`Deleting directory "${path}"...`);
        fs.rmdirSync(path);
    }
}

console.log('Removing matsumoto...');

deleteFolderRecursive('./node_modules/matsumoto');

console.log('Successfully removed!');
