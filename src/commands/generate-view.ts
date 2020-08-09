import { config } from "../config";
import ensureDirsExists from "../ensureDirsExists";
import writeTemplateFile from "../writeTemplateFile";
import parseName from "../parse-name";

export function generateView(name: string, ts: boolean = true, noExamples: boolean = false): boolean {
    const { rootDir } = config();
    const fileExt: string = ts ? 'ts' : 'js';
    const { capName, camelName } = parseName(name);
    const path: string = `${rootDir}/views/${camelName}/`;

    if (!ensureDirsExists(path)) {
        return false;
    }

    writeTemplateFile(`./src/templates/${fileExt}/${(!noExamples ? '' : (ts ? 'no-examples-' : ''))}view.${fileExt}`, camelName, capName, `${path}/${camelName}.${fileExt}`);
    writeTemplateFile(`./src/templates/${fileExt}/view.vue`, camelName, capName, `${path}/${camelName}.vue`);
    writeTemplateFile(`./src/templates/${fileExt}/view.scss`, camelName, capName, `${path}/${camelName}.scss`);

    return true
}