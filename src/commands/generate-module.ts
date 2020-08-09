import { config } from "../config";
import ensureDirsExists from "../ensureDirsExists";
import writeTemplateFile from "../writeTemplateFile";
import parseName from "../parse-name";
import { mkdirSync } from "fs";

export function generateModule(name: string, moduleName: string, ts: boolean = true): boolean {
    const { rootDir } = config();
    const fileExt: string = ts ? 'ts' : 'js';
    const { capName, camelName } = parseName(name);
    const path: string = `${rootDir}/modules/${camelName}/`;

    if (!ensureDirsExists(path)) {
        return false;
    }

    ensureDirsExists(`${path}/components`);
    ensureDirsExists(`${path}/services`);

    writeTemplateFile(`./src/templates/${fileExt}/module.${fileExt}`, camelName, capName, `${path}/${camelName}.module.${fileExt}`);

    return true
}