# GitHub Organization Toolkit

> **A powerful, AI-augmented toolkit for managing GitHub organizations efficiently.**

Combining Claude Code slash commands, automation scripts, and the GitHub CLI for a comprehensive organization management solution.

---

## Overview

Managing a GitHub organization with 50+ repositories is painful:
- Manual navigation through the GitHub web UI doesn't scale
- Finding blocking issues across multiple projects is tedious
- Keeping track of stale issues and PRs is time-consuming
- Generating reports and status updates is repetitive

**This toolkit solves these problems** by combining:
- ✨ **AI-assisted workflows** via Claude Code slash commands
- ⚙️ **Deterministic automation** via Bash/Python scripts
- 🚀 **Token-efficient operations** using GitHub CLI (`gh`)
- 🎯 **Real-time insights** with cached GraphQL queries

**Expected Impact:**
- 60-80% reduction in manual GitHub UI navigation
- AI-powered pattern recognition (blocking issues, critical paths)
- Consistent processes across your organization
- Real-time visibility into project health

---

## Quick Start

### Prerequisites

- **Claude Code** - AI coding assistant (for slash commands)
- **GitHub CLI (`gh`)** - [Install here](https://cli.github.com/)
- **Python 3.8+** - For Python scripts (optional)
- **Bash** - For shell scripts (macOS/Linux)

### Installation

**Option 1: Clone and use directly**
```bash
git clone https://github.com/macjunkins/github-org-toolkit.git
cd github-org-toolkit

# Copy example config
cp config/config.example.yaml config/config.yaml

# Edit config with your organization details
nano config/config.yaml

# Authenticate GitHub CLI
gh auth login
```

**Option 2: Copy commands to your project**
```bash
# Copy generic GitHub workflow commands
cp -r github-org-toolkit/.claude/commands/generic/* /path/to/your/project/.claude/commands/

# Copy org automation commands
cp -r github-org-toolkit/.claude/commands/org-automation/* /path/to/your/project/.claude/commands/
```

**Option 3: Use scripts standalone**
```bash
# Run scripts directly (no Claude Code needed)
./scripts/python/repo-ownership-audit.py --org YourOrgName --output report.csv
./scripts/bash/archive-repos-batch.sh --file tier1-repos.txt --dry-run
```

---

## Features

### 🎯 Generic GitHub Workflow Commands

These slash commands work in **any** GitHub repository:

| Command | Description |
|---------|-------------|
| `/gh-work <issue>` | Start work on an issue (investigate → plan → execute) |
| `/gh-finish <issue>` | Complete work and close issue (commit → push → close) |
| `/gh-update-issue <issue>` | Update issue with progress when pausing |
| `/create-issue` | Create new GitHub issue with AI investigation |
| `/gh-review-issue <issue>` | Review and update existing issue |
| `/gh-create-milestone` | Create milestone (formerly "epic") |
| `/gh-next-issue <milestone>` | Create next sequential issue in milestone |
| `/create-pr` | Create pull request from current branch |
| `/review-pr <number>` | Review PR (analyze Copilot + Claude review) |

**See [Generic Commands Documentation](docs/usage/slash-commands.md) for details.**

---

### 📊 Organization Automation Commands

AI-powered commands for managing GitHub organizations:

| Command | Description |
|---------|-------------|
| `/triage-summary` | Show all issues needing decisions across the org |
| `/project-status <number>` | Summarize project board state with insights |
| `/archival-status` | Track repository archival project progress |
| `/milestone-summary <name>` | Progress report for specific milestone |
| `/discussion-summary <number>` | AI summary of discussion threads |
| `/find-blocking-issues` | Identify issues blocking other work |
| `/weekly-report` | Auto-generate weekly activity summary |

**See [Org Automation Documentation](docs/usage/org-automation.md) for details.**

---

### 🤖 Automation Scripts

Deterministic scripts for batch operations and scheduled tasks:

#### Bash Scripts
- **`sync-labels.sh`** - Ensure consistent labels across all repos
- **`archive-repos-batch.sh`** - Archive multiple repos with dry-run mode
- **`build-validation.sh`** - Run build validation (CI integration)
- **`stale-cleanup.sh`** - Automatically close/label stale issues (cron)

#### Python Scripts
- **`repo-ownership-audit.py`** - Identify repos not owned by the org
- **`dependency-graph.py`** - Visualize issue dependencies (generates SVG)
- **`metrics-dashboard.py`** - Generate org-wide metrics (HTML dashboard)
- **`weekly-report-generator.py`** - Detailed weekly report (cron)

**See [Scripts Documentation](docs/usage/scripts.md) for usage examples.**

---

## Philosophy: Slash Commands vs Scripts

### When to Use Slash Commands

**Best for:** Interactive workflows requiring AI assistance to interpret, summarize, or make decisions.

**Characteristics:**
- Requires context understanding (summarizing discussions, extracting decisions)
- Needs natural language output (reports, summaries)
- Benefits from AI reasoning (prioritization, recommendations)
- Used frequently in Claude Code workflow

**Examples:** Summarizing triage items, generating reports, analyzing issue dependencies

---

### When to Use Scripts

**Best for:** Deterministic operations, automation, scheduled tasks, or complex data processing.

**Characteristics:**
- Repeatable operations (sync labels, archive repos)
- Scheduled automation (nightly reports, stale issue cleanup)
- Complex data transformation (metrics, graphs)
- External integrations (webhooks, CI/CD)
- Called from cron or CI pipelines

**Examples:** Batch archiving repos, syncing labels across repos, generating metrics

---

## Architecture

### Directory Structure

```
github-org-toolkit/
├── .claude/
│   ├── commands/
│   │   ├── generic/           # Generic GitHub workflow commands
│   │   └── org-automation/    # Organization-specific automation
│   └── github-queries/        # Reusable GraphQL queries
├── scripts/
│   ├── bash/                  # Shell scripts for automation
│   └── python/                # Python scripts for data processing
├── config/
│   ├── config.example.yaml    # Template configuration
│   └── labels.json            # Standard label definitions
├── examples/
│   └── acreetion-os/          # Example: AcreetionOS organization config
├── docs/
│   ├── planning/              # Design documents
│   └── usage/                 # Usage guides
└── README.md                  # This file
```

---

### Configuration

Copy `config/config.example.yaml` to `config/config.yaml` and customize:

```yaml
organization: "YourOrgName"
cache_ttl: 300                 # 5 minutes
labels_source: "config/labels.json"

# Repository lists for batch operations
tier1_repos: "examples/your-org/tier1-repos.txt"
tier2_repos: "examples/your-org/tier2-repos.txt"

# Automation settings
stale_issue_days: 60
weekly_report_day: "Monday"
```

---

## Usage Examples

### Example 1: Daily Triage

```bash
# Start your day with triage summary
/triage-summary

# Output:
## Triage Summary (5 issues)

### 🚨 Blocking Issues (1)
- #23: Audit and transfer personal repos
  - DECISION: Which personal accounts to audit?
  - DECISION: Make private repos public during transfer?

### Milestone 1: Pre-Archival (4 issues)
- #6: Validate custom work
  - DECISION: Does archlinux-keyring contain custom keys?
...
```

---

### Example 2: Batch Archive Repositories

```bash
# Dry-run first (safe, shows what WOULD happen)
./scripts/bash/archive-repos-batch.sh --file tier1-repos.txt --dry-run

# Review the output, then execute
./scripts/bash/archive-repos-batch.sh --file tier1-repos.txt --execute

# Updates ARCHIVAL_LOG.md and posts to discussion thread
```

---

### Example 3: Find Blocking Issues

```bash
/find-blocking-issues

# Output:
## Blocking Issues Analysis

### Critical Path (3 issues)
1. #23: Audit personal repos 🚨 **BLOCKS 5 issues**
   - Status: In Progress (no updates in 2 days)
   - Recommendation: **URGENT - Top priority**

2. #8: Validate TIER 1 archival **BLOCKS 8 issues**
   - Status: Waiting on #7 to complete
   - Recommendation: Prepare validation environment now
```

---

### Example 4: Generate Weekly Report

```bash
# Manual run
/weekly-report

# Or schedule via cron (every Monday at 9am)
0 9 * * MON python scripts/weekly-report-generator.py --post-discussion
```

---

## Advanced Usage

### Caching Strategy

Avoid GitHub API rate limits by caching query results:

```bash
# Cache location: /tmp/github-cache/
# Default TTL: 300 seconds (5 minutes)

# Configure in config.yaml:
cache_ttl: 600  # 10 minutes for slower-moving data
```

### GraphQL Queries

Reusable queries stored in `.claude/github-queries/`:

```graphql
# triage-issues.graphql
query TriageIssues($org: String!) {
  organization(login: $org) {
    repositories(first: 100) {
      nodes {
        name
        issues(first: 100, labels: ["triage"], states: OPEN) {
          nodes {
            number
            title
            body
          }
        }
      }
    }
  }
}
```

Use with `gh api`:
```bash
gh api graphql -f query="$(cat .claude/github-queries/triage-issues.graphql)" \
  -F org="YourOrgName"
```

---

## Integration with RAPID-AI Framework

If you use the [RAPID-AI framework](https://github.com/macjunkins/.claude-config), slash commands can invoke specialized agents:

```markdown
# .claude/commands/org-automation/triage-summary.md

Use the Task tool to invoke the Explore agent with thoroughness level "medium".

Task: Find all issues with the 'triage' label across the organization.
Group results by milestone and output a markdown summary table.
```

---

## Contributing

Contributions welcome! This toolkit is designed to be:
- **Generic** enough to work for any organization
- **Specific** enough to solve real problems
- **Extensible** via custom commands and scripts

**To contribute:**
1. Fork the repository
2. Create a feature branch
3. Add your command/script with documentation
4. Submit a pull request

**See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.**

---

## Roadmap

### Phase 1: Essential Commands ✅ (Complete)
- [x] Generic GitHub workflow commands
- [x] Directory structure
- [x] Planning documentation

### Phase 2: Org Automation 🚧 (In Progress)
- [ ] `/triage-summary` command
- [ ] `/project-status` command
- [ ] `/archival-status` command
- [ ] `repo-ownership-audit.py` script
- [ ] `archive-repos-batch.sh` script

### Phase 3: Advanced Analysis 📅 (Planned)
- [ ] `/find-blocking-issues` command
- [ ] `/discussion-summary` command
- [ ] `dependency-graph.py` script
- [ ] `build-validation.sh` script

### Phase 4: Scheduled Automation 📅 (Planned)
- [ ] `stale-cleanup.sh` (cron)
- [ ] `weekly-report-generator.py` (cron)
- [ ] `sync-labels.sh` (cron)
- [ ] `metrics-dashboard.py` (cron)

---

## FAQ

**Q: Do I need Claude Code to use this toolkit?**
A: No! The scripts can run standalone. Slash commands require Claude Code.

**Q: Why prefer `gh` CLI over GitHub API directly?**
A: The `gh` CLI is 80-85% more token-efficient than MCP GitHub tools when using Claude Code, and it automatically handles authentication.

**Q: Can I use this with GitHub Enterprise?**
A: Yes! Configure `gh` to point to your enterprise instance:
```bash
gh auth login --hostname github.yourcompany.com
```

**Q: What about GitHub Actions?**
A: This toolkit complements GitHub Actions. Use Actions for CI/CD, use this toolkit for interactive workflows and organization management.

**Q: Is this only for archiving repositories?**
A: No! Archiving is just one use case. The toolkit works for any organization management tasks: issue triage, milestone tracking, reporting, etc.

---

## Examples

See the `examples/` directory for real-world configurations:

- **`examples/acreetion-os/`** - AcreetionOS-Linux organization (99 repos → 20-24 repos archival project)

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

## Credits

**Created by:** John Junkins ([@macjunkins](https://github.com/macjunkins))

**Inspired by:**
- The pain of managing 99+ repositories manually
- The power of AI-assisted workflows (Claude Code)
- The efficiency of the GitHub CLI (`gh`)

**Built with:**
- [Claude Code](https://claude.ai/code) - AI coding assistant
- [GitHub CLI](https://cli.github.com/) - GitHub on the command line
- [RAPID-AI Framework](https://github.com/macjunkins/.claude-config) - Structured AI agent workflows

---

## Support

- **Issues:** [GitHub Issues](https://github.com/macjunkins/github-org-toolkit/issues)
- **Discussions:** [GitHub Discussions](https://github.com/macjunkins/github-org-toolkit/discussions)
- **Documentation:** [docs/](docs/)

---

**Ready to take control of your GitHub organization? Let's automate the boring stuff and focus on what matters.** 🚀
