import { writeFileSync, readFileSync } from "fs";

export default function writeTemplateFile(templateFilePath: string, camelName: string, capName: string, destFilePath: string): void {
    let content: string = readFileSync(templateFilePath, { encoding: 'utf8' });

    content = content.replace(/\$name/g, camelName);
    content = content.replace(/\$Name/g, capName);

    writeFileSync(destFilePath, content, { encoding: 'utf8' });
}