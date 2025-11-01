# Contributing Guide

**No fluff. Here's how to contribute.**

---

## Core Rules

1. **Issue first, PR second.** No PRs without an issue.
2. **Fork the repo.** Don't work directly on dev.
3. **Branch naming: `issue-<number>-brief-description`**
4. **One issue = One PR.** Keep changes focused.
5. **Target branch: Always `dev`** (gets merged to `main` periodically)

---

## Branch Strategy

This project uses **Git Flow:**

- **`main`** - Production-ready, stable releases only
- **`dev`** - Integration branch, all PRs target here
- **`issue-*`** - Feature branches, created from `dev`

**Contributors target `dev`, maintainers merge `dev` → `main` for releases.**

---

## Workflow

### 1. Find or Create an Issue

**Before writing code:**

- Check [existing issues](https://github.com/macjunkins/github-org-toolkit/issues)
- If your idea isn't there, create an issue first
- Wait for discussion/approval (especially for big changes)

**Creating an issue:**
```bash
# Use the toolkit itself!
/create-issue

# Or manually via GitHub CLI
gh issue create --title "feat: Add stale issue cleanup script" --body "Description here"
```

**Get the issue number.** You'll need it for your branch name.

---

### 2. Fork the Repository

**On GitHub:**
1. Go to https://github.com/macjunkins/github-org-toolkit
2. Click "Fork" button (top-right)
3. This creates `https://github.com/YOUR_USERNAME/github-org-toolkit`

**Clone YOUR fork:**
```bash
git clone https://github.com/YOUR_USERNAME/github-org-toolkit.git
cd github-org-toolkit
```

**Add upstream remote (so you can pull updates):**
```bash
git remote add upstream https://github.com/macjunkins/github-org-toolkit.git

# Verify remotes
git remote -v
# origin    https://github.com/YOUR_USERNAME/github-org-toolkit.git (fetch)
# origin    https://github.com/YOUR_USERNAME/github-org-toolkit.git (push)
# upstream  https://github.com/macjunkins/github-org-toolkit.git (fetch)
# upstream  https://github.com/macjunkins/github-org-toolkit.git (push)
```

---

### 3. Create a Feature Branch

**ALWAYS start from latest `dev`:**
```bash
# Checkout dev branch
git checkout dev

# Pull latest changes from upstream dev
git pull upstream dev

# Push to your fork's dev (keep it in sync)
git push origin dev

# Create and switch to feature branch FROM dev
git checkout -b issue-23-repo-ownership-audit
```

**Branch naming convention:**
```
issue-<number>-brief-description
```

**Examples:**
- `issue-23-repo-ownership-audit`
- `issue-45-add-triage-summary-command`
- `issue-12-fix-cache-expiration`

---

### 4. Make Your Changes

**For slash commands:**
- Add to `.claude/commands/generic/` (generic workflow) or `.claude/commands/org-automation/` (org-specific)
- Follow existing command format (see examples in `generic/`)
- Include usage examples and error handling

**For scripts:**
- Add to `scripts/bash/` or `scripts/python/`
- Include `--help` flag
- Include `--dry-run` mode for destructive operations
- Add error handling and input validation

**For documentation:**
- Update relevant docs in `docs/usage/`
- Keep it concise and example-driven

**Test your changes:**
```bash
# For commands - test in Claude Code
/your-new-command

# For scripts - run with sample data
./scripts/python/your-script.py --help
./scripts/bash/your-script.sh --dry-run
```

---

### 5. Commit Your Changes

**Commit message format:**
```
<type>: <short description>

<detailed explanation>

Closes #<issue-number>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `refactor:` - Code restructuring
- `test:` - Test additions
- `chore:` - Maintenance

**Example:**
```bash
git add .
git commit -m "$(cat <<'EOF'
feat: Add repo ownership audit script

Implements Python script to identify repositories not owned by the
organization. Outputs CSV report with repo name, owner, visibility,
and transfer recommendations.

Features:
- GraphQL queries for efficiency
- CSV output format
- Filters for personal vs org ownership
- Handles private repo detection

Closes #23
EOF
)"
```

**Important:** Always include `Closes #<number>` in the commit message.

---

### 6. Push to Your Fork

**Push your feature branch to YOUR fork (origin):**
```bash
# Push feature branch to your fork
git push origin issue-23-repo-ownership-audit
```

**NOT to upstream!** You don't have push access to the original repo.

---

### 7. Create Pull Request

**Pull Request targets:**
- **From:** `YOUR_USERNAME/github-org-toolkit` branch `issue-23-repo-ownership-audit`
- **To:** `macjunkins/github-org-toolkit` branch **`dev`** ⚠️ IMPORTANT: Target `dev`, NOT `main`

**Use the toolkit:**
```bash
# Specify dev as base branch
/create-pr dev
```

**Or manually via GitHub CLI:**
```bash
# This creates PR from your fork's branch to upstream dev
gh pr create \
  --repo macjunkins/github-org-toolkit \
  --base dev \
  --head YOUR_USERNAME:issue-23-repo-ownership-audit \
  --title "feat: Add repo ownership audit script" \
  --body "Closes #23"
```

**Or via GitHub web UI:**
1. Go to YOUR fork on GitHub
2. Click "Contribute" → "Open pull request"
3. **⚠️ IMPORTANT:** Change base to `macjunkins/github-org-toolkit:dev`
4. Ensure compare is `YOUR_USERNAME/github-org-toolkit:issue-23-repo-ownership-audit`
5. Fill in title and description
6. Click "Create pull request"

**PR Requirements:**

✅ **Must have:**
- Title follows format: `<type>: <description>`
- References the issue: `Closes #<number>`
- Description explains what and why
- **Base branch is `dev`** (not `main`)
- All checks passing (if CI is set up)

❌ **Will be rejected if:**
- No related issue exists
- Targets `main` instead of `dev`
- Closes multiple unrelated issues (split into separate PRs)
- Breaking changes without discussion
- No description or context
- Failing tests

---

### 8. Respond to Review Feedback

**If changes are requested:**

```bash
# Make sure you're on your feature branch
git checkout issue-23-repo-ownership-audit

# Make changes
# ... edit files ...

# Commit changes
git add .
git commit -m "fix: Address review feedback - improve error handling"

# Push to your fork (PR updates automatically)
git push origin issue-23-repo-ownership-audit
```

The PR updates automatically when you push to your fork's branch.

**Use the toolkit to help:**
```bash
/review-pr <number>  # Get Claude's analysis and fix issues
```

---

### 9. After Merge

**Once your PR is merged into upstream dev:**

```bash
# Switch to your local dev
git checkout dev

# Pull merged changes from upstream dev
git pull upstream dev

# Push to your fork's dev (keep it in sync)
git push origin dev

# Delete your local feature branch (no longer needed)
git branch -d issue-23-repo-ownership-audit

# Delete remote branch on your fork (optional, GitHub auto-deletes)
git push origin --delete issue-23-repo-ownership-audit
```

**Verify the issue closed:**
```bash
gh issue view 23 --json state --repo macjunkins/github-org-toolkit
# Should show: "state": "CLOSED"
```

---

## Git Flow Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│ macjunkins/github-org-toolkit (UPSTREAM - original repo)        │
│                                                                  │
│  main ◄────── (stable releases only, maintainers merge here)   │
│    ▲                                                             │
│    │ (maintainer merges dev → main periodically)                │
│    │                                                             │
│  dev ─────────────────────────────────────────────►             │
│         (PRs target here, integration happens here)             │
└──────────────────────────────────────────────────────────────────┘
                          ▲
                          │ Pull Request
                          │ (from your fork's feature branch to upstream dev)
                          │
┌──────────────────────────────────────────────────────────────────┐
│ YOUR_USERNAME/github-org-toolkit (ORIGIN - your fork)           │
│                                                                  │
│  main ───────────────────────────►  (track upstream main)       │
│                                                                  │
│  dev ────────────────────────────►  (track upstream dev)        │
│    │                                                             │
│    └──► issue-23-repo-ownership-audit                           │
│              (you work here, push here)                          │
└──────────────────────────────────────────────────────────────────┘
                          ▲
                          │ git push origin
                          │
┌──────────────────────────────────────────────────────────────────┐
│ Your Local Machine                                               │
│                                                                  │
│  main (tracking origin/main)                                    │
│                                                                  │
│  dev (tracking origin/dev)                                      │
│    │                                                             │
│    └──► issue-23-repo-ownership-audit                           │
│              (branch from dev, commit here)                      │
└──────────────────────────────────────────────────────────────────┘
```

**Summary:**
- **upstream/main** = stable releases (you never touch this)
- **upstream/dev** = integration branch (you target PRs here)
- **origin/dev** = your fork's dev (keep in sync with upstream/dev)
- **feature branch** = created from dev, PR targets upstream/dev

---

## Project Structure

**Know where things go:**

```
.claude/commands/generic/       → Generic GitHub workflow commands
.claude/commands/org-automation/ → Org-specific automation commands
.claude/github-queries/         → Reusable GraphQL query templates
scripts/bash/                   → Shell scripts for automation
scripts/python/                 → Python scripts for data processing
config/                         → Configuration templates
examples/                       → Example configurations
docs/planning/                  → Design documents (generally read-only)
docs/usage/                     → Usage guides and tutorials
```

---

## Coding Standards

### Slash Commands

**Template:**
```markdown
# Command Name

Brief description of what this command does.

## Instructions

Follow this workflow strictly:

### 1. Step Name
[Clear instructions]

### 2. Next Step
[Clear instructions]

## Tool Preferences
- **Primary:** Use `gh` CLI
- **Fallback:** MCP tools only if needed

## Usage Examples
[Include at least 2 examples]
```

**Requirements:**
- Clear step-by-step workflow
- Error handling section
- Usage examples
- Tool preference documentation

---

### Bash Scripts

**Requirements:**
- Shebang: `#!/bin/bash`
- Help flag: `--help`
- Dry-run mode for destructive operations: `--dry-run`
- Exit codes: `0` (success), `1` (error)
- Error messages to stderr: `echo "Error" >&2`

**Template:**
```bash
#!/bin/bash
set -euo pipefail  # Exit on error, undefined vars, pipe failures

# Script description
# Usage: ./script.sh [options]

# Help text
show_help() {
  cat << EOF
Usage: ${0##*/} [OPTIONS]

Description of what this does.

OPTIONS:
  --help        Show this help
  --dry-run     Show what would happen without executing
  --file FILE   Input file path
EOF
}

# Parse arguments
DRY_RUN=false
while [[ $# -gt 0 ]]; do
  case $1 in
    --help) show_help; exit 0 ;;
    --dry-run) DRY_RUN=true; shift ;;
    *) echo "Unknown option: $1" >&2; exit 1 ;;
  esac
done

# Main logic here
```

---

### Python Scripts

**Requirements:**
- Python 3.8+ compatible
- Type hints where appropriate
- Argparse for CLI arguments
- Docstrings for functions
- Exit codes: `0` (success), `1` (error)

**Template:**
```python
#!/usr/bin/env python3
"""
Script description.

Usage:
    python script.py --org OrgName --output report.csv
"""

import argparse
import sys
from typing import List, Dict

def main() -> int:
    """Main entry point."""
    parser = argparse.ArgumentParser(description="Script description")
    parser.add_argument("--org", required=True, help="Organization name")
    parser.add_argument("--output", required=True, help="Output file path")
    parser.add_argument("--dry-run", action="store_true", help="Dry run mode")

    args = parser.parse_args()

    try:
        # Main logic here
        return 0
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        return 1

if __name__ == "__main__":
    sys.exit(main())
```

---

## Documentation Standards

**When adding new features:**

1. Update README.md feature table
2. Add usage example to appropriate `docs/usage/` file
3. Include inline code comments for complex logic
4. Update CHANGELOG.md (if it exists)

**Documentation style:**
- Short sentences
- Example-driven
- No fluff
- Assume the reader is technical

---

## What Gets Accepted

✅ **Yes:**
- New slash commands with clear use cases
- Automation scripts that solve real problems
- Bug fixes with test cases
- Documentation improvements
- Performance optimizations with benchmarks

❌ **No:**
- PRs without related issues
- PRs targeting `main` instead of `dev`
- Code without documentation
- Breaking changes without discussion
- Features that only work for one specific org (should be configurable)
- Untested code
- Overly complex solutions when simple ones exist

---

## Questions?

- **Issue too big?** Break it into smaller issues first.
- **Not sure if idea is good?** Create an issue and discuss before coding.
- **Stuck on implementation?** Comment on the issue and ask.
- **CI failing?** Fix the issue before asking for review.
- **Accidentally targeted `main`?** Edit the PR to change base to `dev`.

---

## Quick Reference

```bash
# ONE-TIME SETUP
# 1. Fork repo on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/github-org-toolkit.git
cd github-org-toolkit
git remote add upstream https://github.com/macjunkins/github-org-toolkit.git

# FOR EACH NEW FEATURE
# 1. Create issue, get issue number (e.g., #23)

# 2. Sync your fork's dev with upstream
git checkout dev
git pull upstream dev
git push origin dev

# 3. Create feature branch FROM dev
git checkout -b issue-23-description

# 4. Make changes, test locally

# 5. Commit
git add .
git commit -m "type: description

Details

Closes #23"

# 6. Push to YOUR fork
git push origin issue-23-description

# 7. Create PR (targets upstream dev, NOT main)
/create-pr dev
# OR
gh pr create --repo macjunkins/github-org-toolkit --base dev --head YOUR_USERNAME:issue-23-description

# 8. Respond to feedback (repeat as needed)
# ... make changes ...
git add .
git commit -m "fix: Address review feedback"
git push origin issue-23-description

# 9. After merge into dev - clean up
git checkout dev
git pull upstream dev
git push origin dev
git branch -d issue-23-description
```

---

**That's it. No CLA, no paperwork. Just good code solving real problems.**

**Remember: PRs target `dev`, not `main`. Maintainers handle `dev` → `main` merges for releases.**
