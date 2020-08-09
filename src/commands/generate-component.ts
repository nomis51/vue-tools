import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs"
import { config } from "../config";

function ensureDirsExists(path: string): boolean {
    const dirs: string[] = path.split('/').filter(v => !!v);
    let currentDir: string = "";

    for (const dir of dirs) {
        currentDir += `/${dir}`;

        try {
            if (!existsSync(currentDir)) {
                mkdirSync(currentDir);
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    return true;
}

function writeTemplateFile(templateFilePath: string, name: string, destFilePath: string): void {
    let content: string = readFileSync(templateFilePath, { encoding: 'utf8' });

    let camelName: string = name.replace(/([A-Z])/g, '-$1').toLowerCase();

    if (camelName.charAt(0) === '-') {
        camelName = camelName.substring(1);
    }

    camelName = camelName.replace(/--/g, '-');

    let capName: string = name.charAt(0).toUpperCase() + name.slice(1);

    if (capName.indexOf('-') !== -1) {
        let index: number = -1;

        while ((index = capName.indexOf('-')) !== -1) {
            if (index + 1 === capName.length) {
                capName = capName.substring(0, capName.length - 1);
            } else {
                capName = capName.substring(0, index) + capName.substring(index + 1, index + 2).toUpperCase() + capName.substring(index + 2)
            }
        }
    }

    console.log('Camel name: ', camelName);
    console.log('Cap name: ', capName);

    content = content.replace(/\$name/g, camelName);
    content = content.replace(/\$Name/g, capName);

    writeFileSync(destFilePath, content, { encoding: 'utf8' });
}

export function generateComponent(name: string, ts: boolean = true): boolean {
    const { rootDir } = config();
    const path: string = `${rootDir}/components/${name}/`;

    if (!ensureDirsExists(path)) {
        return false;
    }

    const fileExt: string = ts ? 'ts' : 'js';

    writeTemplateFile(`./src/templates/${fileExt}/component.${fileExt}`, name, `${path}/${name}.component.${fileExt}`);
    writeTemplateFile(`./src/templates/${fileExt}/component.vue`, name, `${path}/${name}.component.vue`);
    writeTemplateFile(`./src/templates/${fileExt}/component.scss`, name, `${path}/${name}.component.scss`);

    return true
}