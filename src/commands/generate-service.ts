import { config } from "../config";
import ensureDirsExists from "../ensureDirsExists";
import writeTemplateFile, { Replacement } from "../writeTemplateFile";
import parseName from "../parse-name";
import { readFileSync, writeFileSync } from "fs";

export function generateService(name: string, ts: boolean = true, module: string = ""): boolean {
    const { rootDir } = config();
    const fileExt: string = ts ? 'ts' : 'js';
    const { capName, camelName } = parseName(name);
    const path: string = `${rootDir}${(module ? `/modules/${module}` : '')}/services`;

    if (!ensureDirsExists(path)) {
        return false;
    }

    if (module) {
        const importStr: string = `import ${capName}Service from './services/${camelName}/${camelName}.service.${fileExt}'`;
        const modulePath: string = `${rootDir}/modules/${module}/${module}.module.${fileExt}`;
        let content: string = readFileSync(modulePath, { encoding: 'utf8' });

        const replacements: Replacement[] = [
            {
                newValue: importStr
            }, {
                oldValue: /services:( )*{(\n)*/gi,
                newValue: `services: {\n\t\t${capName}Service,\n`
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

    writeTemplateFile(`./src/templates/${fileExt}/service.${fileExt}`, camelName, capName, `${path}/${camelName}.service.${fileExt}`);

    return true
}