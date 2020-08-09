#!/usr/bin/env node
'use strict'

import { commands } from './src/commands';
import { command, help } from 'yargs';
import { existsSync } from 'fs';
import { config } from './src/config'

const argv = command([
    'init',
], 'Configurate Vue Tools for the current project')
    .command([
        'generate component [name]',
        'g c',
    ], 'Generate a new component')
    .command([
        'generate view [name]',
        'g v'
    ], 'Generate a new view')
    .command([
        'generate service [name]',
        'g s'
    ], 'Generate a new service')
    .command([
        'generate store [name]',
        'g t'
    ], 'Generate a new Vuex store')
    .options({
        d: {
            alias: "directory",
            demandOption: false,
            describe: "Where the item needs to be generated",
            type: "string"
        }
    })
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
    if (argv._.length != 1) {
        help();
        return;
    }

    const commandName: string = argv._[0] + (argv.store ? ` ${argv.store}` : '');

    if (commandName !== 'init' && !checkConfig()) {
        return;
    }

    for (const command of commands) {
        console.log(command, commandName)
        if (!command.regex.test(commandName)) {
            continue;
        }

        const args = { ...argv };
        delete args._;
        delete args.$0;
        delete args.store;

        return command.fn(...Object.values(args));
    }
}

if (!parse()) {
    console.error('Command failed')
}
