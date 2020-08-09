import { config } from "../config";
import ensureDirsExists from "../ensureDirsExists";
import writeTemplateFile, { Replacement } from "../writeTemplateFile";
import parseName from "../parse-name";
import { mkdirSync, existsSync, writeFileSync, readFileSync } from "fs";

export function genereateStore(name: string, ts: boolean = true): boolean {
    const { rootDir } = config();
    const fileExt: string = ts ? 'ts' : 'js';
    const { capName, camelName } = parseName(name);
    const path: string = `${rootDir}/store`;

    if (!ensureDirsExists(path)) {
        return false;
    }

    if (!ensureDirsExists(`${path}/modules`)) {
        mkdirSync(`${path}/modules`);
    }

    const importStr: string = `import ${capName} from './modules/${camelName}';`;
    const replacements: Replacement[] = [
        {
            oldValue: /Vue.use\(Vuex\)(;)*(\n)*/gi,
            newValue: `Vue.use(Vuex);\n\n${importStr}\n`
        }, {
            oldValue: /modules:( )*{(\n)*/gi,
            newValue: `modules: {\n\t\t${capName},\n`
        }
    ];

    let content: string = !existsSync(`${path}/index.${fileExt}`) ? readFileSync(`./src/templates/${fileExt}/module-store.${fileExt}`, { encoding: 'utf8' }) : readFileSync(`${path}/index.${fileExt}`, { encoding: 'utf8' });

    for (let replacement of replacements) {
        content = content.replace(replacement.oldValue, replacement.newValue);
    }

    writeFileSync(`${path}/index.${fileExt}`, content, { encoding: 'utf8' })

    writeTemplateFile(`./src/templates/${fileExt}/store.${fileExt}`, camelName, capName, `${path}/modules/${camelName}.${fileExt}`);

    return true
}