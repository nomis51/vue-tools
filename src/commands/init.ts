import { writeFileSync } from "fs";
import { Config } from "../config";

export function init() {
    const config: Config = {
        rootDir: process.cwd()
    }

    try {
        writeFileSync('vuetools.json', JSON.stringify(config, null, 2), { encoding: 'utf8' });
    } catch (e) {
        console.error(e)
        return false;
    }

    return true;
}