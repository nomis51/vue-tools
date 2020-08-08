#!/usr/bin/env node
'use strict'

import * as yargs from 'yargs'

import { commands } from './src/commands';

const options = yargs
    .usage("Usage: -n <name>")
    .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
    .argv;

function parse(input: string): void {
    const splits: string[] = input.split(" ");

    for (const command of commands) {
        for (const item of splits) {
            if (command.regex.test(item)) {
                const args = item.match(`(!?${command.regex})`);

                if (args.length < command.nbArgs) {
                    return console.warn(`The command "${command.name}" require ${command.nbArgs} argument${(command.nbArgs > 1 ? 's' : '')}`);
                }


            }
        }
    }
}

