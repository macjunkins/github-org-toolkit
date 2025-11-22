import { Octokit } from 'octokit';
import { getEnvConfig } from './config';

let _octokit: Octokit | null = null;

/**
 * Get Octokit instance (lazy-loaded)
 */
export function getOctokit(): Octokit {
  if (!_octokit) {
    const config = getEnvConfig();
    _octokit = new Octokit({
      auth: config.GITHUB_TOKEN,
    });
  }
  return _octokit;
}

export async function getAuthenticatedUser() {
  const octokit = getOctokit();
  const { data: user } = await octokit.rest.users.getAuthenticated();
  return user;
}
