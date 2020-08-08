import { generateComponent } from "./commands/generate-component";

export interface Command {
    name: String,
    regex: RegExp,
    nbArgs: Number,
    fn: any
}

export const commands: Command[] = [
    {
        name: "generate component",
        regex: /(generate|g) (component|c) (-[d])*/gi,
        nbArgs: 1,
        fn: generateComponent
    }
];