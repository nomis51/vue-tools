"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const fs_1 = require("fs");
function config() {
    const data = fs_1.readFileSync('vuetools.json', { encoding: 'utf8' });
    if (data) {
        return JSON.parse(data);
    }
}
exports.config = config;
//# sourceMappingURL=config.js.map