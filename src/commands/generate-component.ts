import { config } from "../config";
import ensureDirsExists from "../ensureDirsExists";
import writeTemplateFile from "../writeTemplateFile";
import parseName from "../parse-name";

export function generateComponent(name: string, ts: boolean = true, noExamples: boolean = false, module: string = ""): boolean {
    const { rootDir } = config();
    const fileExt: string = ts ? 'ts' : 'js';
    const { capName, camelName } = parseName(name);
    const path: string = `${rootDir}${(module ? `/modules/${module}` : '')}/components/${camelName}/`;

    if (!ensureDirsExists(path)) {
        return false;
    }

    writeTemplateFile(`./src/templates/${fileExt}/${(!noExamples ? '' : (ts ? 'no-examples-' : ''))}component.${fileExt}`, camelName, capName, `${path}/${camelName}.component.${fileExt}`);
    writeTemplateFile(`./src/templates/${fileExt}/component.vue`, camelName, capName, `${path}/${camelName}.component.vue`);
    writeTemplateFile(`./src/templates/${fileExt}/component.scss`, camelName, capName, `${path}/${camelName}.component.scss`);

    return true
}