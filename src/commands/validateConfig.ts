import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import { loadYamlConfig, printConfigSummary, validateConfigFiles } from '../yamlConfig';

export const validateConfigCommand = new Command('validate-config')
  .description('Validate the YAML configuration file')
  .option('-c, --config <path>', 'Path to config file', 'config/config.yaml')
  .option('-e, --example', 'Validate the example config instead')
  .action(async (options) => {
    const configPath = options.example ? 'config/config.example.yaml' : options.config;
    
    console.log(chalk.blue(`Validating configuration: ${configPath}`));
    console.log(chalk.blue('-'.repeat(60)));

    try {
      // Load and validate config
      const config = loadYamlConfig(configPath);
      
      // Validate referenced files
      const fileErrors = validateConfigFiles(config);
      
      if (fileErrors.length > 0) {
        console.error(chalk.red('\n❌ Configuration file validation failed:'));
        fileErrors.forEach((error, i) => {
          console.error(chalk.red(`  ${i + 1}. ${error}`));
        });
        process.exit(1);
      }
      
      // Print summary
      console.log('');
      printConfigSummary(config);
      
    } catch (error) {
      if (error instanceof Error) {
        console.error(chalk.red(`\n❌ Error: ${error.message}`));
      } else {
        console.error(chalk.red(`\n❌ Unexpected error: ${error}`));
      }
      process.exit(1);
    }
  });
