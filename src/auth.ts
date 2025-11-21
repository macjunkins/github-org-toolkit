import { Octokit } from 'octokit';
import { config } from './config';

export const octokit = new Octokit({
  auth: config.GITHUB_TOKEN,
});

export async function getAuthenticatedUser() {
  const { data: user } = await octokit.rest.users.getAuthenticated();
  return user;
}
