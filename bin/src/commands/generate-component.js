"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateComponent = void 0;
const config_1 = require("../config");
const ensureDirsExists_1 = __importDefault(require("../ensureDirsExists"));
const writeTemplateFile_1 = __importDefault(require("../writeTemplateFile"));
const parse_name_1 = __importDefault(require("../parse-name"));
const fs_1 = require("fs");
function generateComponent(name, ts = true, noExamples = false, module = "") {
    const { rootDir } = config_1.config();
    const fileExt = ts ? 'ts' : 'js';
    const { capName, camelName } = parse_name_1.default(name);
    const path = `${rootDir}${(module ? `/modules/${module}` : '')}/components/${camelName}/`;
    if (!ensureDirsExists_1.default(path)) {
        return false;
    }
    if (module) {
        const importStr = `import ${capName}Component from './components/${camelName}/${camelName}.component.vue'`;
        const modulePath = `${rootDir}/modules/${module}/${module}.module.${fileExt}`;
        let content = fs_1.readFileSync(modulePath, { encoding: 'utf8' });
        const replacements = [
            {
                newValue: importStr
            }, {
                oldValue: /components:( )*{(\n)*/gi,
                newValue: `components: {\n\t\t${capName}Component,\n`
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
    writeTemplateFile_1.default(`./src/templates/${fileExt}/${(!noExamples ? '' : (ts ? 'no-examples-' : ''))}component.${fileExt}`, camelName, capName, `${path}/${camelName}.component.${fileExt}`);
    writeTemplateFile_1.default(`./src/templates/${fileExt}/component.vue`, camelName, capName, `${path}/${camelName}.component.vue`);
    writeTemplateFile_1.default(`./src/templates/${fileExt}/component.scss`, camelName, capName, `${path}/${camelName}.component.scss`);
    return true;
}
exports.generateComponent = generateComponent;
//# sourceMappingURL=generate-component.js.map