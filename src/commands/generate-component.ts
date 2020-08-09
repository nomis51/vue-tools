import { config } from "../config";
import ensureDirsExists from "../ensureDirsExists";
import writeTemplateFile from "../writeTemplateFile";
import parseName from "../parse-name";

export function generateComponent(name: string, ts: boolean = true, noExamples: boolean = false): boolean {
    const { rootDir } = config();
    const fileExt: string = ts ? 'ts' : 'js';
    const { capName, camelName } = parseName(name);
    const path: string = `${rootDir}/components/${camelName}/`;

    if (!ensureDirsExists(path)) {
        return false;
    }

    console.log('Need exmaples: ', !noExamples)

    writeTemplateFile(`./src/templates/${fileExt}/${(!noExamples ? '' : (ts ? 'no-examples-' : ''))}component.${fileExt}`, camelName, capName, `${path}/${camelName}.component.${fileExt}`);
    writeTemplateFile(`./src/templates/${fileExt}/component.vue`, camelName, capName, `${path}/${camelName}.component.vue`);
    writeTemplateFile(`./src/templates/${fileExt}/component.scss`, camelName, capName, `${path}/${camelName}.component.scss`);

    return true
}