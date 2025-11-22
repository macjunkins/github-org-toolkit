#!/usr/bin/env python3
"""
Example script demonstrating how to use the config loader.

This script shows how to:
1. Load configuration from YAML file
2. Validate configuration
3. Use configuration values
4. Handle configuration errors
"""

import sys
import os

# Add scripts directory to path for importing config_loader
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'python'))

from config_loader import load_config, validate_config, print_config_summary


def main():
    """Example of using the config loader in a script."""
    
    # 1. Load configuration
    try:
        config = load_config('config/config.yaml')
    except FileNotFoundError as e:
        print(f"Error: {e}")
        print("\nHint: Copy config/config.example.yaml to config/config.yaml")
        return 1
    except Exception as e:
        print(f"Error loading config: {e}")
        return 1
    
    # 2. Validate configuration
    errors = validate_config(config)
    if errors:
        print("Configuration validation failed:")
        for error in errors:
            print(f"  - {error}")
        return 1
    
    # 3. Print summary
    print_config_summary(config)
    print()
    
    # 4. Use configuration values
    print("Using configuration values:")
    print(f"  - Working with organization: {config['organization']}")
    print(f"  - Cache TTL: {config['cache_ttl']} seconds")
    print(f"  - Stale threshold: {config['stale_issue_days']} days")
    
    # Example: Check if tier files are configured
    if 'tier1_repos' in config:
        print(f"  - Tier 1 repos file: {config['tier1_repos']}")
        if os.path.exists(config['tier1_repos']):
            with open(config['tier1_repos']) as f:
                repos = [line.strip() for line in f if line.strip() and not line.startswith('#')]
            print(f"    Found {len(repos)} tier 1 repositories")
    
    return 0


if __name__ == '__main__':
    sys.exit(main())
