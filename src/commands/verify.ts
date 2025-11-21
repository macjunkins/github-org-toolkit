import { Command } from 'commander';
import { getAuthenticatedUser } from '../auth';
import chalk from 'chalk';

export const verifyConnectionCommand = new Command('verify-connection')
  .description('Verify connectivity to GitHub API and validate credentials')
  .action(async () => {
    try {
      console.log(chalk.blue('Verifying connection to GitHub...'));
      const user = await getAuthenticatedUser();
      console.log(chalk.green(`✅ Successfully connected as: ${chalk.bold(user.login)}`));
      console.log(`Name: ${user.name || 'N/A'}`);
      console.log(`URL: ${user.html_url}`);
    } catch (error: any) {
      console.error(chalk.red('❌ Failed to connect to GitHub.'));
      if (error.status === 401) {
        console.error('Error: Unauthorized. Please check your GITHUB_TOKEN.');
      } else {
        console.error(`Error: ${error.message}`);
      }
      process.exit(1);
    }
  });
