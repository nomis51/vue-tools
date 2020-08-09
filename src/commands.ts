import { generateComponent } from "./commands/generate-component";
import { init } from "./commands/init";

type Fn = (...args: any[]) => boolean;
type GetParams = (obj: any) => any;

interface Command {
    name: String,
    regex: RegExp,
    getParams: GetParams,
    fn: Fn
}


export const commands: Command[] = [
    {
        name: "generate component",
        regex: /(generate component)|(g c)/gi,
        getParams: (obj: any) => ({
            name: obj.name,
            ts: !obj.js,
            noExamples: !!obj.empty
        }),
        fn: generateComponent
    }, {
        name: 'init',
        regex: /init/gi,
        getParams: (obj: any) => ({}),
        fn: init
    }
];