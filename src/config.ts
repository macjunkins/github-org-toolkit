import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  GITHUB_TOKEN: z.string().min(1, "GITHUB_TOKEN is required"),
  ORG_NAME: z.string().optional(),
});

export type Config = z.infer<typeof configSchema>;

let _config: Config | null = null;

/**
 * Get environment-based configuration (lazy-loaded)
 * This is used for GitHub API authentication
 */
export function getEnvConfig(): Config {
  if (!_config) {
    const parsed = configSchema.safeParse(process.env);

    if (!parsed.success) {
      console.error("❌ Invalid configuration:");
      parsed.error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      throw new Error('Configuration validation failed');
    }

    _config = parsed.data;
  }

  return _config;
}

// For backward compatibility
export const config = new Proxy({} as Config, {
  get(target, prop) {
    return getEnvConfig()[prop as keyof Config];
  }
});
