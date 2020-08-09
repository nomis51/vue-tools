"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function writeTemplateFile(templateFilePath, camelName, capName, destFilePath, replacements = []) {
    let content = fs_1.readFileSync(templateFilePath, { encoding: 'utf8' });
    content = content.replace(/\$name/g, camelName);
    content = content.replace(/\$Name/g, capName);
    for (let replacement of replacements) {
        content = content.replace(replacement.oldValue, replacement.newValue);
    }
    fs_1.writeFileSync(destFilePath, content, { encoding: 'utf8' });
}
exports.default = writeTemplateFile;
//# sourceMappingURL=writeTemplateFile.js.map