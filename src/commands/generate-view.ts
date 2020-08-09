import { config } from "../config";
import ensureDirsExists from "../ensureDirsExists";
import writeTemplateFile, { Replacement } from "../writeTemplateFile";
import parseName from "../parse-name";
import { readFileSync, writeFileSync } from "fs";

export function generateView(name: string, ts: boolean = true, noExamples: boolean = false, module: string = ""): boolean {
    const { rootDir } = config();
    const fileExt: string = ts ? 'ts' : 'js';
    const { capName, camelName } = parseName(name);
    const path: string = `${rootDir}${(module ? `/modules/${module}` : '')}/views/${camelName}/`;

    if (!ensureDirsExists(path)) {
        return false;
    }

    if (module) {
        const importStr: string = `import ${capName} from './views/${camelName}/${camelName}.vue'`;
        const modulePath: string = `${rootDir}/modules/${module}/${module}.module.${fileExt}`;
        let content: string = readFileSync(modulePath, { encoding: 'utf8' });

        const replacements: Replacement[] = [
            {
                newValue: importStr
            }, {
                oldValue: /components:( )*{(\n)*/gi,
                newValue: `components: {\n\t\t${capName},\n`
            }
        ]

        for (let replacement of replacements) {
            if (!replacement.oldValue) {
                content = `${importStr}\n${content}`;
            } else {
                content = content.replace(replacement.oldValue, replacement.newValue);
            }
        }

        writeFileSync(modulePath, content, { encoding: 'utf8' })
    }

    writeTemplateFile(`./src/templates/${fileExt}/${(!noExamples ? '' : (ts ? 'no-examples-' : ''))}view.${fileExt}`, camelName, capName, `${path}/${camelName}.${fileExt}`);
    writeTemplateFile(`./src/templates/${fileExt}/view.vue`, camelName, capName, `${path}/${camelName}.vue`);
    writeTemplateFile(`./src/templates/${fileExt}/view.scss`, camelName, capName, `${path}/${camelName}.scss`);

    return true
}