"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function ensureDirsExists(path) {
    const dirs = path.split('/').filter(v => !!v);
    let currentDir = "";
    for (const dir of dirs) {
        currentDir += `/${dir}`;
        try {
            if (!fs_1.existsSync(currentDir)) {
                fs_1.mkdirSync(currentDir);
            }
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    return true;
}
exports.default = ensureDirsExists;
//# sourceMappingURL=ensureDirsExists.js.map