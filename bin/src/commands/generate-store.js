"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genereateStore = void 0;
const config_1 = require("../config");
const ensureDirsExists_1 = __importDefault(require("../ensureDirsExists"));
const writeTemplateFile_1 = __importDefault(require("../writeTemplateFile"));
const parse_name_1 = __importDefault(require("../parse-name"));
const fs_1 = require("fs");
function genereateStore(name, ts = true) {
    const { rootDir } = config_1.config();
    const fileExt = ts ? 'ts' : 'js';
    const { capName, camelName } = parse_name_1.default(name);
    const path = `${rootDir}/store`;
    if (!ensureDirsExists_1.default(path)) {
        return false;
    }
    if (!ensureDirsExists_1.default(`${path}/modules`)) {
        fs_1.mkdirSync(`${path}/modules`);
    }
    const importStr = `import ${capName} from './modules/${camelName}';`;
    const replacements = [
        {
            oldValue: /Vue.use\(Vuex\)(;)*(\n)*/gi,
            newValue: `Vue.use(Vuex);\n\n${importStr}\n`
        }, {
            oldValue: /modules:( )*{(\n)*/gi,
            newValue: `modules: {\n\t\t${capName},\n`
        }
    ];
    let content = !fs_1.existsSync(`${path}/index.${fileExt}`) ? fs_1.readFileSync(`./src/templates/${fileExt}/module-store.${fileExt}`, { encoding: 'utf8' }) : fs_1.readFileSync(`${path}/index.${fileExt}`, { encoding: 'utf8' });
    for (let replacement of replacements) {
        content = content.replace(replacement.oldValue, replacement.newValue);
    }
    fs_1.writeFileSync(`${path}/index.${fileExt}`, content, { encoding: 'utf8' });
    writeTemplateFile_1.default(`./src/templates/${fileExt}/store.${fileExt}`, camelName, capName, `${path}/modules/${camelName}.${fileExt}`);
    return true;
}
exports.genereateStore = genereateStore;
//# sourceMappingURL=generate-store.js.map