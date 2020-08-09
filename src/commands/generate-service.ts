import { config } from "../config";
import ensureDirsExists from "../ensureDirsExists";
import writeTemplateFile from "../writeTemplateFile";
import parseName from "../parse-name";

export function generateService(name: string, ts: boolean = true): boolean {
    const { rootDir } = config();
    const fileExt: string = ts ? 'ts' : 'js';
    const { capName, camelName } = parseName(name);
    const path: string = `${rootDir}/services`;

    if (!ensureDirsExists(path)) {
        return false;
    }

    writeTemplateFile(`./src/templates/${fileExt}/service.${fileExt}`, camelName, capName, `${path}/${camelName}.service.${fileExt}`);

    return true
}