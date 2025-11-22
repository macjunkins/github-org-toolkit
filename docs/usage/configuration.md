# Configuration Guide

This guide explains how to configure the GitHub Organization Toolkit for your organization.

## Quick Start

1. **Copy the example configuration:**
   ```bash
   cp config/config.example.yaml config/config.yaml
   ```

2. **Edit the configuration:**
   ```bash
   nano config/config.yaml  # or use your preferred editor
   ```

3. **Update the organization name:**
   ```yaml
   organization: "YourOrgName"  # Replace with your GitHub org
   ```

4. **Validate your configuration:**
   ```bash
   # Using Python
   python3 scripts/python/config_loader.py
   
   # Using TypeScript/Node
   npm run build
   node dist/index.js validate-config
   ```

## Configuration File Location

The toolkit looks for configuration in this order:

1. `config/config.yaml` - Your organization-specific config (gitignored)
2. `config/config.example.yaml` - Template with all options documented

**Important:** Never commit `config/config.yaml` to version control! It's already in `.gitignore`.

## Configuration Options

### Organization Settings

```yaml
# REQUIRED: Your GitHub organization name
organization: "YourOrgName"

# OPTIONAL: GitHub Enterprise URL (defaults to github.com)
github_api_url: "https://github.yourcompany.com/api/v3"
```

### Caching Settings

Control API call caching to avoid rate limits:

```yaml
# Cache time-to-live in seconds (default: 300 = 5 minutes)
cache_ttl: 300

# Cache directory (default: /tmp/github-cache/)
cache_dir: "/tmp/github-cache/"
```

**Tips:**
- Lower TTL = fresher data, more API calls
- Higher TTL = less API calls, potentially stale data
- For active development: 300 seconds (5 minutes)
- For production/cron: 600-900 seconds (10-15 minutes)

### Label Management

```yaml
# Path to standard label definitions
labels_source: "config/labels.json"
```

The `labels.json` file contains standard label definitions that can be synced across all repositories using the `sync-labels.sh` script.

### Repository Management

Organize repositories into tiers for batch operations:

```yaml
# Critical/active repositories
tier1_repos: "examples/your-org/tier1-repos.txt"

# Less critical repositories
tier2_repos: "examples/your-org/tier2-repos.txt"

# Archived/deprecated repositories
tier3_repos: "examples/your-org/tier3-repos.txt"
```

**Repository list file format:**
```text
# One repository name per line
# Comments start with #
repo-name-1
repo-name-2
repo-name-3
```

### Issue & PR Automation

```yaml
# Days before an issue is considered stale
stale_issue_days: 60

# Days before a PR is considered stale
stale_pr_days: 30

# Labels to apply to stale items
stale_labels: "stale,needs-attention"

# Labels that exempt items from being marked stale
stale_exempt_labels: "pinned,security,dependencies"
```

### Reporting & Notifications

```yaml
# Day of week for weekly reports (Monday-Sunday)
weekly_report_day: "Monday"

# Hour of day (0-23, 24-hour format)
weekly_report_hour: 9

# GitHub discussion number for posting reports
weekly_report_discussion: 123
```

### Custom Workflow Settings

Add your own configuration options for custom workflows:

```yaml
# Example: Archival project
archival_target_repo_count: 24
archival_log_file: "ARCHIVAL_LOG.md"
archival_discussion: 456

# Example: Milestone tracking
default_milestone: "v1.0"
milestone_auto_close: true

# Example: Project board
default_project_board: 1
auto_assign_project: true
```

## Validation

### Python Validation

```bash
# Validate your config
python3 scripts/python/config_loader.py

# Validate the example config
python3 scripts/python/config_loader.py --example

# Specify a different config file
python3 scripts/python/config_loader.py --config examples/acreetion-os/config.yaml
```

### TypeScript Validation

```bash
# Build the project first
npm run build

# Validate your config
node dist/index.js validate-config

# Validate the example config
node dist/index.js validate-config --example

# Specify a different config file
node dist/index.js validate-config -c examples/acreetion-os/config.yaml
```

## Error Messages

The validation system provides clear error messages:

### Missing Required Fields

```
❌ Configuration validation failed:
  1. Required field 'organization' is missing or empty.
     Please set it in your config file.
```

**Fix:** Add the organization field to your config:
```yaml
organization: "YourOrgName"
```

### Invalid Default Value

```
❌ Configuration validation failed:
  1. Please change 'organization' from the default 'YourOrgName'
     to your actual GitHub organization name.
```

**Fix:** Replace the placeholder with your actual organization:
```yaml
organization: "acme-corp"  # Your real org name
```

### Invalid Data Types

```
❌ Configuration validation failed:
  1. cache_ttl must be a number, got: "300"
```

**Fix:** Use numbers without quotes:
```yaml
cache_ttl: 300  # Correct
# cache_ttl: "300"  # Wrong
```

### Invalid Day of Week

```
❌ Configuration validation failed:
  1. weekly_report_day must be a day of the week (Monday-Sunday),
     got: "monday"
```

**Fix:** Use proper capitalization:
```yaml
weekly_report_day: "Monday"  # Correct
# weekly_report_day: "monday"  # Wrong
```

## Using Configuration in Scripts

### Python Scripts

```python
from config_loader import load_config, validate_config

# Load configuration
config = load_config('config/config.yaml')

# Validate it
errors = validate_config(config)
if errors:
    for error in errors:
        print(f"Error: {error}")
    sys.exit(1)

# Use configuration
org_name = config['organization']
cache_ttl = config['cache_ttl']
```

### TypeScript/Node Scripts

```typescript
import { loadYamlConfig } from './yamlConfig';

// Load and validate configuration
const config = loadYamlConfig('config/config.yaml');

// Use configuration
const orgName = config.organization;
const cacheTtl = config.cache_ttl;
```

## Examples

See the `examples/` directory for real-world configurations:

- **[examples/acreetion-os/](../examples/acreetion-os/)** - AcreetionOS-Linux archival project
  - Demonstrates repository tier organization
  - Archival-specific settings
  - Stale issue automation

## Environment Variables vs YAML Config

The toolkit supports two configuration approaches:

### 1. Environment Variables (.env)

Used for sensitive data like API tokens:

```bash
# .env file (gitignored)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxx
ORG_NAME=YourOrgName
```

**Use for:**
- GitHub API tokens
- Sensitive credentials
- CI/CD environments

### 2. YAML Configuration (config.yaml)

Used for organization settings and workflow preferences:

```yaml
# config/config.yaml (gitignored)
organization: "YourOrgName"
cache_ttl: 300
stale_issue_days: 60
```

**Use for:**
- Organization name
- Workflow settings
- Feature flags
- Paths to resource files

**Best Practice:** Use `.env` for authentication, `config.yaml` for everything else.

## Troubleshooting

### Configuration file not found

```
❌ Error: Configuration file not found: config/config.yaml
Copy config/config.example.yaml to config/config.yaml and customize it.
```

**Solution:**
```bash
cp config/config.example.yaml config/config.yaml
```

### Invalid YAML syntax

```
❌ Error: Invalid YAML in configuration file config/config.yaml:
YAMLException: bad indentation of a mapping entry
```

**Solution:** Check your YAML syntax. Common issues:
- Inconsistent indentation (use 2 spaces, not tabs)
- Missing colons after keys
- Unquoted strings with special characters

Use a YAML validator or your editor's YAML support.

### File path not found

```
⚠️  Warning: tier1_repos file not found: examples/your-org/tier1-repos.txt
```

**Solution:** Either:
1. Create the file: `touch examples/your-org/tier1-repos.txt`
2. Update the path in your config
3. Remove the optional setting if you don't need it

## Next Steps

- [Slash Commands Documentation](slash-commands.md)
- [Scripts Documentation](scripts.md)
- [Examples](../examples/)
- [Contributing Guide](../../CONTRIBUTING.md)
