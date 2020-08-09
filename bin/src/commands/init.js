"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const fs_1 = require("fs");
function init() {
    const config = {
        rootDir: process.cwd()
    };
    try {
        fs_1.writeFileSync('vuetools.json', JSON.stringify(config, null, 2), { encoding: 'utf8' });
    }
    catch (e) {
        console.error(e);
        return false;
    }
    return true;
}
exports.init = init;
//# sourceMappingURL=init.js.map