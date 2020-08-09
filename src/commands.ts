import { generateComponent } from "./commands/generate-component";

type Fn = (...args: any[]) => boolean;

interface Command {
    name: String,
    regex: RegExp,
    fn: Fn
}

export const commands: Command[] = [
    {
        name: "generate component",
        regex: /(generate component)|(g c)/gi,
        fn: generateComponent
    }
];