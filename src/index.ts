#!/usr/bin/env node
import { Command } from 'commander';
import { verifyConnectionCommand } from './commands/verify';
import { validateConfigCommand } from './commands/validateConfig';
import chalk from 'chalk';

const program = new Command();

program
  .name('github-org-toolkit')
  .description('A powerful, AI-augmented toolkit for managing GitHub organizations efficiently.')
  .version('0.1.0');

program.addCommand(verifyConnectionCommand);
program.addCommand(validateConfigCommand);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
