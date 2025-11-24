# Example Configurations

This directory contains real-world example configurations for different organizations using the GitHub Organization Toolkit.

## Available Examples

### AcreetionOS (`acreetion-os/`)

Example configuration for the AcreetionOS-Linux organization archival project.

**Use Case:** Reducing repository count from 99 to 20-24 core repositories

**Files:**
- `config.yaml` - Full organization configuration
- `tier1-repos.txt` - Critical repositories to maintain
- `tier2-repos.txt` - Less critical but maintained repositories

**To use:**
```bash
# Copy to your config directory
cp examples/acreetion-os/config.yaml config/config.yaml

# Edit with your organization details
nano config/config.yaml
```

## Creating Your Own Example

To contribute your organization's configuration as an example:

1. Create a new directory: `examples/your-org-name/`
2. Add your sanitized config files (remove sensitive data)
3. Include a brief README explaining your use case
4. Submit a PR

**Note:** Always review your config files before sharing to ensure no sensitive information (tokens, private repo names, etc.) is included.

## Template Structure

```
examples/your-org-name/
├── config.yaml              # Main configuration
├── tier1-repos.txt         # Critical repositories
├── tier2-repos.txt         # Secondary repositories
└── README.md               # Brief description of your setup
```
