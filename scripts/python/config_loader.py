#!/usr/bin/env python3
"""
Configuration Loader and Validator for GitHub Organization Toolkit

This module provides functions to load and validate YAML configuration files
with clear error messages and sensible defaults.

Usage:
    from config_loader import load_config, validate_config
    
    config = load_config('config/config.yaml')
    errors = validate_config(config)
    if errors:
        for error in errors:
            print(f"Error: {error}")
        sys.exit(1)
"""

import os
import sys
import yaml
from typing import Dict, List, Optional, Any
from pathlib import Path


DEFAULT_CONFIG = {
    'cache_ttl': 300,
    'cache_dir': '/tmp/github-cache/',
    'labels_source': 'config/labels.json',
    'stale_issue_days': 60,
    'stale_pr_days': 30,
    'weekly_report_day': 'Monday',
    'weekly_report_hour': 9,
}

REQUIRED_FIELDS = ['organization']

VALID_DAYS_OF_WEEK = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
    'Friday', 'Saturday', 'Sunday'
]


def load_config(config_path: str = 'config/config.yaml') -> Dict[str, Any]:
    """
    Load configuration from YAML file with defaults.
    
    Args:
        config_path: Path to YAML config file
        
    Returns:
        Dictionary containing configuration
        
    Raises:
        FileNotFoundError: If config file doesn't exist
        yaml.YAMLError: If config file is invalid YAML
    """
    if not os.path.exists(config_path):
        raise FileNotFoundError(
            f"Configuration file not found: {config_path}\n"
            f"Copy config/config.example.yaml to config/config.yaml and customize it."
        )
    
    try:
        with open(config_path, 'r') as f:
            config = yaml.safe_load(f) or {}
    except yaml.YAMLError as e:
        raise yaml.YAMLError(
            f"Invalid YAML in configuration file {config_path}:\n{e}"
        )
    
    # Merge with defaults
    merged_config = DEFAULT_CONFIG.copy()
    merged_config.update(config)
    
    return merged_config


def validate_config(config: Dict[str, Any]) -> List[str]:
    """
    Validate configuration and return list of error messages.
    
    Args:
        config: Configuration dictionary
        
    Returns:
        List of error messages (empty if valid)
    """
    errors = []
    
    # Check required fields
    for field in REQUIRED_FIELDS:
        if field not in config or not config[field]:
            errors.append(
                f"Required field '{field}' is missing or empty. "
                f"Please set it in your config file."
            )
    
    # Validate organization name format
    if 'organization' in config and config['organization']:
        org = config['organization']
        if org == 'YourOrgName':
            errors.append(
                "Please change 'organization' from the default 'YourOrgName' "
                "to your actual GitHub organization name."
            )
        if ' ' in org:
            errors.append(
                f"Organization name '{org}' contains spaces. "
                f"Use the GitHub organization handle (no spaces)."
            )
    
    # Validate cache_ttl
    if 'cache_ttl' in config:
        try:
            ttl = int(config['cache_ttl'])
            if ttl < 0:
                errors.append("cache_ttl must be a positive number")
        except (ValueError, TypeError):
            errors.append(f"cache_ttl must be a number, got: {config['cache_ttl']}")
    
    # Validate stale_issue_days
    if 'stale_issue_days' in config:
        try:
            days = int(config['stale_issue_days'])
            if days < 1:
                errors.append("stale_issue_days must be at least 1")
        except (ValueError, TypeError):
            errors.append(
                f"stale_issue_days must be a number, got: {config['stale_issue_days']}"
            )
    
    # Validate weekly_report_day
    if 'weekly_report_day' in config:
        day = config['weekly_report_day']
        if day not in VALID_DAYS_OF_WEEK:
            errors.append(
                f"weekly_report_day must be a day of the week "
                f"(Monday-Sunday), got: {day}"
            )
    
    # Validate weekly_report_hour
    if 'weekly_report_hour' in config:
        try:
            hour = int(config['weekly_report_hour'])
            if hour < 0 or hour > 23:
                errors.append("weekly_report_hour must be between 0 and 23")
        except (ValueError, TypeError):
            errors.append(
                f"weekly_report_hour must be a number, got: {config['weekly_report_hour']}"
            )
    
    # Validate weekly_report_discussion (can be int or string)
    if 'weekly_report_discussion' in config:
        disc = config['weekly_report_discussion']
        if not isinstance(disc, (int, str)):
            errors.append(
                f"weekly_report_discussion must be a number or string, got: {type(disc).__name__}"
            )
    
    # Validate file paths exist (if specified)
    # Only labels_source is required; tier files are optional
    if 'labels_source' in config and config['labels_source']:
        path = config['labels_source']
        if not os.path.exists(path):
            errors.append(
                f"Labels file not found: {path}"
            )
    
    # Warn for optional tier files if they're specified but don't exist
    tier_fields = ['tier1_repos', 'tier2_repos', 'tier3_repos']
    for field in tier_fields:
        if field in config and config[field]:
            path = config[field]
            if not os.path.exists(path):
                # These are optional, so just warn
                import sys
                print(f"⚠️  Warning: {field} file not found: {path}", file=sys.stderr)
    
    return errors


def print_config_summary(config: Dict[str, Any]) -> None:
    """Print a summary of the loaded configuration."""
    print("✅ Configuration loaded successfully")
    print(f"   Organization: {config.get('organization', 'N/A')}")
    print(f"   Cache TTL: {config.get('cache_ttl', 'N/A')} seconds")
    print(f"   Stale issue threshold: {config.get('stale_issue_days', 'N/A')} days")
    print(f"   Weekly report: {config.get('weekly_report_day', 'N/A')}s at {config.get('weekly_report_hour', 'N/A')}:00")


def main():
    """Command-line interface for testing config validation."""
    import argparse
    
    parser = argparse.ArgumentParser(
        description='Validate GitHub Organization Toolkit configuration'
    )
    parser.add_argument(
        '--config',
        default='config/config.yaml',
        help='Path to config file (default: config/config.yaml)'
    )
    parser.add_argument(
        '--example',
        action='store_true',
        help='Validate the example config instead'
    )
    
    args = parser.parse_args()
    
    config_path = 'config/config.example.yaml' if args.example else args.config
    
    print(f"Validating configuration: {config_path}")
    print("-" * 60)
    
    try:
        config = load_config(config_path)
        errors = validate_config(config)
        
        if errors:
            print("❌ Configuration validation failed:\n")
            for i, error in enumerate(errors, 1):
                print(f"  {i}. {error}")
            print("\nPlease fix these errors and try again.")
            return 1
        else:
            print_config_summary(config)
            return 0
            
    except FileNotFoundError as e:
        print(f"❌ Error: {e}")
        return 1
    except yaml.YAMLError as e:
        print(f"❌ Error: {e}")
        return 1
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return 1


if __name__ == '__main__':
    sys.exit(main())
