import { config } from "../config";
import ensureDirsExists from "../ensureDirsExists";
import writeTemplateFile, { Replacement } from "../writeTemplateFile";
import parseName from "../parse-name";
import { readFileSync, writeFileSync } from "fs";

export function generateComponent(name: string, ts: boolean = true, noExamples: boolean = false, module: string = ""): boolean {
    const { rootDir } = config();
    const fileExt: string = ts ? 'ts' : 'js';
    const { capName, camelName } = parseName(name);
    const path: string = `${rootDir}${(module ? `/modules/${module}` : '')}/components/${camelName}/`;

    if (!ensureDirsExists(path)) {
        return false;
    }

    if (module) {
        const importStr: string = `import ${capName}Component from './components/${camelName}/${camelName}.component.vue'`;
        const modulePath: string = `${rootDir}/modules/${module}/${module}.module.${fileExt}`;
        let content: string = readFileSync(modulePath, { encoding: 'utf8' });

        const replacements: Replacement[] = [
            {
                newValue: importStr
            }, {
                oldValue: /components:( )*{(\n)*/gi,
                newValue: `components: {\n\t\t${capName}Component,\n`
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

    writeTemplateFile(`./src/templates/${fileExt}/${(!noExamples ? '' : (ts ? 'no-examples-' : ''))}component.${fileExt}`, camelName, capName, `${path}/${camelName}.component.${fileExt}`);
    writeTemplateFile(`./src/templates/${fileExt}/component.vue`, camelName, capName, `${path}/${camelName}.component.vue`);
    writeTemplateFile(`./src/templates/${fileExt}/component.scss`, camelName, capName, `${path}/${camelName}.component.scss`);

    return true
}