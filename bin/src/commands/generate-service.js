"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateService = void 0;
const config_1 = require("../config");
const ensureDirsExists_1 = __importDefault(require("../ensureDirsExists"));
const writeTemplateFile_1 = __importDefault(require("../writeTemplateFile"));
const parse_name_1 = __importDefault(require("../parse-name"));
const fs_1 = require("fs");
function generateService(name, ts = true, module = "") {
    const { rootDir } = config_1.config();
    const fileExt = ts ? 'ts' : 'js';
    const { capName, camelName } = parse_name_1.default(name);
    const path = `${rootDir}${(module ? `/modules/${module}` : '')}/services`;
    if (!ensureDirsExists_1.default(path)) {
        return false;
    }
    if (module) {
        const importStr = `import ${capName}Service from './services/${camelName}/${camelName}.service.${fileExt}'`;
        const modulePath = `${rootDir}/modules/${module}/${module}.module.${fileExt}`;
        let content = fs_1.readFileSync(modulePath, { encoding: 'utf8' });
        const replacements = [
            {
                newValue: importStr
            }, {
                oldValue: /services:( )*{(\n)*/gi,
                newValue: `services: {\n\t\t${capName}Service,\n`
            }
        ];
        for (let replacement of replacements) {
            if (!replacement.oldValue) {
                content = `${importStr}\n${content}`;
            }
            else {
                content = content.replace(replacement.oldValue, replacement.newValue);
            }
        }
        fs_1.writeFileSync(modulePath, content, { encoding: 'utf8' });
    }
    writeTemplateFile_1.default(`./src/templates/${fileExt}/service.${fileExt}`, camelName, capName, `${path}/${camelName}.service.${fileExt}`);
    return true;
}
exports.generateService = generateService;
//# sourceMappingURL=generate-service.js.map