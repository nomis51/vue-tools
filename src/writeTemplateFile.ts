import { writeFileSync, readFileSync } from "fs";

export interface Replacement {
    oldValue: RegExp,
    newValue: string
}

export default function writeTemplateFile(templateFilePath: string, camelName: string, capName: string, destFilePath: string, replacements: Replacement[] = []): void {
    let content: string = readFileSync(templateFilePath, { encoding: 'utf8' });

    content = content.replace(/\$name/g, camelName);
    content = content.replace(/\$Name/g, capName);

    for (let replacement of replacements) {
        content = content.replace(replacement.oldValue, replacement.newValue);
    }

    writeFileSync(destFilePath, content, { encoding: 'utf8' });
}