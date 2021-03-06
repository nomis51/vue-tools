#!/usr/bin/env node
'use strict'

import { commands } from './src/commands';
import { command, help, showHelpOnFail, showHelp } from 'yargs';
import { existsSync } from 'fs';
import { config } from './src/config'

const argv = showHelpOnFail(true)
.command([
    'init',
], 'Configure Vue Tools for the current project')
    .command([
        'generate component [name] [moduleName]',
        'g c',
    ], 'Generate a new component')
    .command([
        'generate view [name] [moduleName]',
        'g v'
    ], 'Generate a new view')
    .command([
        'generate service [name] [moduleName]',
        'g s'
    ], 'Generate a new service')
    .command([
        'generate module [name]',
        'g m'
    ], 'Generate a new module')
    .command([
        'generate store [name] [moduleName]',
        'g x'
    ], 'Generate a new Vuex store')
    .options({
        j: {
            alias: "js",
            demandOption: false,
            describe: "Use JavaScript templates instead of TypeScript templates",
            type: "boolean"
        },
        e: {
            alias: 'empty',
            demandOption: false,
            describe: "Don't add Watchers, Computed Values, Props annd Emitters examples in TypeScript components",
            type: "boolean"
        },
        m: {
            alias: 'module',
            demandOption: false,
            describe: "The module where the item needs to be generated",
            type:"string"
        },
    })
    .demandCommand()
    .argv;

console.log('ARGS HERE: ', argv);

function checkConfig(): boolean {
    if (!existsSync('vuetools.json')) {
        console.warn('Warn: Vue Tools configuration file not found.')
        console.warn('Warn: Run "vt init" at the root folder of your project before running any command')
        return false;
    }

    return config() !== undefined;
}

function parse(): boolean {
    if (argv._.length != 1 || argv.$0 === 'vt' || argv.$0.length === 0) {
        showHelp();
        return false;
    }

    const commandName: string = argv._[0] + (argv.store ? ` ${argv.store}` : '');

    //   console.log('Command Name: ', commandName)

    if (commandName !== 'init' && !checkConfig()) {
        return false;
    }

    for (const command of commands) {
        if (!command.regex.test(commandName)) {
            continue;
        }

        const args = { ...argv };
        delete args._;
        delete args.$0;
        delete args.store;

        return command.fn(...Object.values(command.getParams(args)));
    }
}

if (!parse()) {
    console.error('Command failed')
}
