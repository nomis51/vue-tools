import { existsSync, mkdirSync } from "fs";

export default function ensureDirsExists(path: string): boolean {
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