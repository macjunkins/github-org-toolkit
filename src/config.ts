import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  GITHUB_TOKEN: z.string().min(1, "GITHUB_TOKEN is required"),
  ORG_NAME: z.string().optional(),
});

export type Config = z.infer<typeof configSchema>;

export const config = (() => {
  const parsed = configSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid configuration:");
    parsed.error.errors.forEach((err) => {
      console.error(`  - ${err.path.join('.')}: ${err.message}`);
    });
    process.exit(1);
  }

  return parsed.data;
})();
