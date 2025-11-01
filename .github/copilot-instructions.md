# GitHub Organization Toolkit - AI Coding Instructions

## Project Overview

This is an AI-augmented toolkit for efficiently managing GitHub organizations, combining Claude Code slash commands, automation scripts, and GitHub CLI for comprehensive organization management. The project is designed to reduce manual GitHub UI navigation by 60-80% and provide AI-powered pattern recognition for organizational insights.

## Architecture: Slash Commands vs Scripts Philosophy

**Critical Design Pattern:** This project uses a two-tier approach:
- **Slash Commands** (`.claude/commands/`): AI-assisted workflows requiring interpretation, summarization, or decision-making
- **Scripts** (`scripts/`): Deterministic operations, automation, and scheduled tasks

When adding features, determine which tier applies:
- Need AI reasoning/natural language output? → Slash command
- Repeatable/scheduled operation? → Script

## Directory Structure and Conventions

```
.claude/commands/generic/       # Universal GitHub workflow commands (works on any repo)
.claude/commands/org-automation/ # Organization-specific automation commands
.claude/github-queries/         # Reusable GraphQL query templates
scripts/bash/                   # Shell scripts for automation
scripts/python/                # Python scripts for data processing
config/                        # Configuration templates (users copy config.example.yaml)
examples/                      # Organization-specific example configurations
```

**Key Pattern:** Generic commands in `generic/` work universally, org-specific commands in `org-automation/` solve particular organizational challenges.

## Tool Preferences and Integration Patterns

**GitHub CLI First:** Always prefer `gh` CLI over MCP GitHub tools for API operations. The `gh` CLI is 80-85% more token-efficient and automatically handles authentication. Only use MCP tools as fallback.

Example pattern from existing commands:
```bash
# Primary approach
gh issue view {{arg1}} --json title,body,labels,milestone,state

# Fallback only if gh fails
# Use MCP GitHub tools
```

**Claude Code Integration:** Commands can invoke RAPID-AI framework agents using the Task tool:
```markdown
Use the Task tool to invoke the Explore agent with thoroughness level "medium".
Task: Find all issues with the 'triage' label across the organization.
```

## Command Structure Pattern

All slash commands in `.claude/commands/` follow this structure:
1. **Clear workflow steps** (numbered sections)
2. **Tool preferences** section (always specify gh CLI preference)
3. **Error handling** scenarios
4. **Usage examples** (minimum 2)
5. **What this command does vs does NOT do** section

Example from `gh-work.md`:
```markdown
### 1. Investigate
### 2. Analyze  
### 3. Plan
### 4. Present & Get Approval
### 5. Execute

## Tool Preferences
- **Primary:** Use `gh` CLI for all GitHub operations
- **Fallback:** Only use MCP GitHub tools if `gh` CLI cannot accomplish the task
```

## Configuration and User Customization

**Template Pattern:** Users copy `config/config.example.yaml` to `config/config.yaml` (gitignored) and customize for their organization:
```yaml
organization: "YourOrgName"
cache_ttl: 300
tier1_repos: "examples/your-org/tier1-repos.txt"
```

**Organization Examples:** Specific configs live in `examples/org-name/` directories, allowing users to reference real-world setups.

## Error Handling and User Safety

**Critical Safety Pattern:** Commands must ask for approval before destructive operations:
- Creating/closing GitHub issues
- Committing code or creating PRs
- Batch operations on multiple repositories
- Any operation that modifies GitHub state

Example approval pattern:
```markdown
**Ask explicitly:** "Should I create this pull request?"
**STOP and wait for approval.** User can request changes...
**IMPORTANT:** Do NOT proceed without explicit approval
```

## Caching and Performance

**GitHub API Efficiency:** Implement caching for API responses to avoid rate limits:
- Default TTL: 300 seconds (5 minutes)
- Cache location: `/tmp/github-cache/`
- GraphQL queries over REST API when possible

## Script Standards

**Bash Scripts Requirements:**
- Include `--help` and `--dry-run` flags
- Use `set -euo pipefail` for error handling
- Error messages to stderr: `echo "Error" >&2`

**Python Scripts Requirements:**
- Python 3.8+ compatibility
- Argparse for CLI arguments
- Type hints and docstrings
- Exit codes: 0 (success), 1 (error)

## Development Workflow Integration

**Branch Strategy:** This project uses Git Flow:
- `main`: Production-ready releases
- `dev`: Integration branch (target for PRs)
- `issue-*`: Feature branches created from `dev`

**Contribution Pattern:** All work starts with GitHub issues. Branch naming: `issue-<number>-brief-description`

## Real-World Context

**Primary Use Case:** Built for managing the AcreetionOS-Linux organization archival project (99 repos → 20-24 repos). Commands and scripts are designed around this scale of GitHub organization management.

**Generic Design:** While built for a specific need, everything is designed to work for any GitHub organization through configuration.

## Key Files to Reference

- `HANDOFF.md`: Complete project context and next steps
- `docs/planning/github-automation-ideas.md`: Comprehensive automation strategy
- `.claude/commands/generic/gh-work.md`: Example of complete command structure
- `CONTRIBUTING.md`: Git flow and contribution standards

## Implementation Priorities

1. **Org-automation commands** (blocking AcreetionOS project)
2. **Critical scripts** (`repo-ownership-audit.py`, `archive-repos-batch.sh`)
3. **GraphQL queries** for efficient API operations
4. **Configuration templates** for user customization

Focus on solving real GitHub organization management pain points with a mix of AI assistance and deterministic automation.