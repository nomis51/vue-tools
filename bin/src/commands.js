"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const generate_component_1 = require("./commands/generate-component");
const generate_service_1 = require("./commands/generate-service");
const init_1 = require("./commands/init");
const generate_view_1 = require("./commands/generate-view");
const generate_store_1 = require("./commands/generate-store");
const generate_module_1 = require("./commands/generate-module");
exports.commands = [
    {
        name: "generate component",
        regex: /(generate component)|(g c)/gi,
        getParams: (obj) => ({
            name: obj.name,
            ts: !obj.js,
            noExamples: !!obj.empty,
            module: obj.module
        }),
        fn: generate_component_1.generateComponent
    }, {
        name: 'init',
        regex: /init/gi,
        getParams: (obj) => ({}),
        fn: init_1.init
    }, {
        name: "generate service",
        regex: /(generate service)|(g s)/gi,
        getParams: (obj) => ({
            name: obj.name,
            ts: !obj.js,
            module: obj.module
        }),
        fn: generate_service_1.generateService
    }, {
        name: "generate view",
        regex: /(generate view)|(g v)/gi,
        getParams: (obj) => ({
            name: obj.name,
            ts: !obj.js,
            noExamples: !!obj.empty,
            module: obj.module
        }),
        fn: generate_view_1.generateView
    }, {
        name: "generate store",
        regex: /(generate store)|(g x)/gi,
        getParams: (obj) => ({
            name: obj.name,
            ts: !obj.js
        }),
        fn: generate_store_1.genereateStore
    }, {
        name: "generate module",
        regex: /(generate module)|(g m)/gi,
        getParams: (obj) => ({
            name: obj.name,
            ts: !obj.js
        }),
        fn: generate_module_1.generateModule
    },
];
//# sourceMappingURL=commands.js.map