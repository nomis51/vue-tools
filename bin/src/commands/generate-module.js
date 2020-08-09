"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateModule = void 0;
const config_1 = require("../config");
const ensureDirsExists_1 = __importDefault(require("../ensureDirsExists"));
const writeTemplateFile_1 = __importDefault(require("../writeTemplateFile"));
const parse_name_1 = __importDefault(require("../parse-name"));
function generateModule(name, moduleName, ts = true) {
    const { rootDir } = config_1.config();
    const fileExt = ts ? 'ts' : 'js';
    const { capName, camelName } = parse_name_1.default(name);
    const path = `${rootDir}/modules/${camelName}/`;
    if (!ensureDirsExists_1.default(path)) {
        return false;
    }
    ensureDirsExists_1.default(`${path}/components`);
    ensureDirsExists_1.default(`${path}/services`);
    ensureDirsExists_1.default(`${path}/views`);
    writeTemplateFile_1.default(`./src/templates/${fileExt}/module.${fileExt}`, camelName, capName, `${path}/${camelName}.module.${fileExt}`);
    return true;
}
exports.generateModule = generateModule;
//# sourceMappingURL=generate-module.js.map