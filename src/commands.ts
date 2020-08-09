import { generateComponent } from "./commands/generate-component";
import { generateService } from './commands/generate-service'
import { init } from "./commands/init";
import { generateView } from "./commands/generate-view";
import { genereateStore } from "./commands/generate-store";

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
    }, {
        name: "generate service",
        regex: /(generate service)|(g s)/gi,
        getParams: (obj: any) => ({
            name: obj.name,
            ts: !obj.js,
        }),
        fn: generateService
    }, {
        name: "generate view",
        regex: /(generate view)|(g v)/gi,
        getParams: (obj: any) => ({
            name: obj.name,
            ts: !obj.js,
            noExamples: !!obj.empty
        }),
        fn: generateView
    }, {
        name: "generate store",
        regex: /(generate store)|(g x)/gi,
        getParams: (obj: any) => ({
            name: obj.name,
            ts: !obj.js
        }),
        fn: genereateStore
    },
];