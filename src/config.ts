import { readFileSync } from "fs";

export interface Config {
    rootDir: String
}

export function config(): Config | undefined {
    const data: string = readFileSync('vuetools.json', { encoding: 'utf8' });

    if (data) {
        return <Config>JSON.parse(data)
    }
}