import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { z } from 'zod';

/**
 * Schema for YAML configuration file
 */
const yamlConfigSchema = z.object({
  organization: z.string().min(1, "organization is required").refine(
    (val) => val !== 'YourOrgName',
    "Please change 'organization' from the default 'YourOrgName' to your actual GitHub organization name"
  ),
  github_api_url: z.string().url().optional(),
  cache_ttl: z.number().int().min(0).default(300),
  cache_dir: z.string().default('/tmp/github-cache/'),
  labels_source: z.string().default('config/labels.json'),
  tier1_repos: z.string().optional(),
  tier2_repos: z.string().optional(),
  tier3_repos: z.string().optional(),
  stale_issue_days: z.number().int().min(1).default(60),
  stale_pr_days: z.number().int().min(1).default(30),
  stale_labels: z.string().optional(),
  stale_exempt_labels: z.string().optional(),
  weekly_report_day: z.enum([
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
    'Friday', 'Saturday', 'Sunday'
  ]).default('Monday'),
  weekly_report_hour: z.number().int().min(0).max(23).default(9),
  weekly_report_discussion: z.number().int().optional(),
  // Allow additional custom fields
}).passthrough();

export type YamlConfig = z.infer<typeof yamlConfigSchema>;

/**
 * Load and validate YAML configuration file
 */
export function loadYamlConfig(configPath: string = 'config/config.yaml'): YamlConfig {
  if (!fs.existsSync(configPath)) {
    throw new Error(
      `Configuration file not found: ${configPath}\n` +
      `Copy config/config.example.yaml to config/config.yaml and customize it.`
    );
  }

  let fileContent: string;
  try {
    fileContent = fs.readFileSync(configPath, 'utf8');
  } catch (error) {
    throw new Error(`Failed to read configuration file: ${configPath}\n${error}`);
  }

  let rawConfig: any;
  try {
    rawConfig = yaml.load(fileContent);
  } catch (error) {
    throw new Error(`Invalid YAML in configuration file ${configPath}:\n${error}`);
  }

  const parsed = yamlConfigSchema.safeParse(rawConfig);

  if (!parsed.success) {
    console.error("❌ Invalid configuration:");
    parsed.error.errors.forEach((err) => {
      console.error(`  - ${err.path.join('.')}: ${err.message}`);
    });
    throw new Error('Configuration validation failed');
  }

  return parsed.data;
}

/**
 * Print configuration summary
 */
export function printConfigSummary(config: YamlConfig): void {
  console.log('✅ Configuration loaded successfully');
  console.log(`   Organization: ${config.organization}`);
  console.log(`   Cache TTL: ${config.cache_ttl} seconds`);
  console.log(`   Stale issue threshold: ${config.stale_issue_days} days`);
  console.log(`   Weekly report: ${config.weekly_report_day}s at ${config.weekly_report_hour}:00`);
}

/**
 * Validate that required files exist
 */
export function validateConfigFiles(config: YamlConfig): string[] {
  const errors: string[] = [];

  // Check labels file
  if (config.labels_source && !fs.existsSync(config.labels_source)) {
    errors.push(`Labels file not found: ${config.labels_source}`);
  }

  // Check tier repo files (these are optional)
  const tierFiles = [
    { key: 'tier1_repos', path: config.tier1_repos },
    { key: 'tier2_repos', path: config.tier2_repos },
    { key: 'tier3_repos', path: config.tier3_repos },
  ];

  for (const { key, path: filePath } of tierFiles) {
    if (filePath && !fs.existsSync(filePath)) {
      // These are warnings, not errors (optional files)
      console.warn(`⚠️  Warning: ${key} file not found: ${filePath}`);
    }
  }

  return errors;
}
