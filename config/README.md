# Configuration Files

This directory contains configuration files for the GitHub Organization Toolkit.

## Files

- **`config.example.yaml`** - Template configuration with all options documented
- **`config.yaml`** - Your organization-specific configuration (gitignored, you create this)
- **`labels.json`** - Standard label definitions for syncing across repositories

## Quick Setup

```bash
# 1. Copy the example configuration
cp config/config.example.yaml config/config.yaml

# 2. Edit with your organization details
nano config/config.yaml

# 3. Update the organization name (minimum requirement)
# Change: organization: "YourOrgName"
# To:     organization: "your-actual-org"

# 4. Validate your configuration
python3 scripts/python/config_loader.py
# or
npm run build && node dist/index.js validate-config
```

## Configuration File: config.yaml

This is **your** configuration file. It's gitignored to protect your organization-specific settings.

**Never commit this file to version control!**

### Minimum Required Configuration

```yaml
organization: "YourOrgName"
```

### Common Configuration

```yaml
organization: "YourOrgName"
cache_ttl: 300
labels_source: "config/labels.json"
stale_issue_days: 60
weekly_report_day: "Monday"
```

See `config.example.yaml` for all available options with detailed comments.

## Labels File: labels.json

This file defines standard labels that can be synced across all repositories using the `sync-labels.sh` script.

**Format:**
```json
{
  "labels": [
    {
      "name": "bug",
      "color": "d73a4a",
      "description": "Something isn't working"
    }
  ]
}
```

**Customization:**
You can edit this file to add your organization-specific labels or modify the standard ones.

## Documentation

For detailed configuration documentation, see:
- [Configuration Guide](../docs/usage/configuration.md)
- [Examples](../examples/)

## Validation

Validate your configuration before using:

```bash
# Python
python3 scripts/python/config_loader.py

# TypeScript
npm run build
node dist/index.js validate-config
```

## Troubleshooting

**Error: Configuration file not found**
```bash
cp config/config.example.yaml config/config.yaml
```

**Error: Please change 'organization' from the default**
- Edit `config/config.yaml` and set your actual organization name

**Error: Invalid YAML**
- Check indentation (use 2 spaces, not tabs)
- Ensure colons are followed by spaces
- Quote strings with special characters

## Security Note

⚠️ **Important:** The `config.yaml` file is gitignored to prevent accidentally committing organization-specific or sensitive configuration.

For sensitive data like API tokens, use `.env` file instead (also gitignored).
