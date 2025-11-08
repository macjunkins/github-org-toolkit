# GitHub Organization Toolkit

> **A powerful, AI-augmented toolkit for managing GitHub organizations efficiently.**

Combining Claude Code slash commands, automation scripts, and the GitHub CLI for a comprehensive organization management solution.

📊 **[View Project Board](https://github.com/users/macjunkins/projects/18)** | 📋 **[View Milestones](https://github.com/macjunkins/github-org-toolkit/milestones)** | 📖 **[Product Roadmap](docs/planning/product-roadmap.md)** | 🐛 **[Report Issues](https://github.com/macjunkins/github-org-toolkit/issues)**

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

### Example 3: Generate Weekly Report

```bash
# Manual run
/weekly-report

# Or schedule via cron (every Monday at 9am)
0 9 * * MON python scripts/weekly-report-generator.py --post-discussion
```

---

## Advanced Usage

### Performance & Caching

Avoid GitHub API rate limits with cached GraphQL queries:

```bash
# Cache location: /tmp/github-cache/
# Default TTL: 300 seconds (5 minutes)

# Configure in config.yaml:
cache_ttl: 600  # 10 minutes for slower-moving data
```

Reusable GraphQL queries in `.claude/github-queries/`:

```bash
# Use with gh api:
gh api graphql -f query="$(cat .claude/github-queries/triage-issues.graphql)" \
  -F org="YourOrgName"
```

See `.claude/github-queries/` for available templates (triage, milestones, project status).

---

## Contributing

Contributions welcome! This toolkit is designed to be generic, practical, and extensible.

**How to contribute:**
1. Check the [project board](https://github.com/users/macjunkins/projects/18) for open issues
2. Look for [`help wanted`](https://github.com/macjunkins/github-org-toolkit/labels/help%20wanted) or [`good first issue`](https://github.com/macjunkins/github-org-toolkit/labels/good%20first%20issue) labels
3. Comment to claim an issue, then follow [CONTRIBUTING.md](CONTRIBUTING.md)

**Current focus:** [Phase 2: Org Automation](https://github.com/macjunkins/github-org-toolkit/milestone/1) - 10 open issues

---

## Roadmap

**📊 [View Project Board](https://github.com/users/macjunkins/projects/18)** | **📋 [View Milestones](https://github.com/macjunkins/github-org-toolkit/milestones)** | **📖 [Full Product Roadmap](docs/planning/product-roadmap.md)**

### Phase 1: Essential Commands ✅ Complete
- 9 generic GitHub workflow commands (`/gh-work`, `/gh-finish`, `/create-issue`, etc.)
- Project directory structure and planning documentation

### Phase 2: Org Automation 🚧 In Progress (Dec 2025)
- **Commands:** `/triage-summary`, `/project-status`, `/milestone-summary`, `/archival-status`
- **Scripts:** Repo ownership audit, batch archival, label sync
- **Infrastructure:** Configuration system, documentation, GraphQL query library
- **[View Milestone](https://github.com/macjunkins/github-org-toolkit/milestone/1)** - 10 open issues

### Phase 3: Advanced Analysis 📅 Planned (Q1 2026)
- Blocking issue detection, dependency graphs, discussion summaries
- Weekly reports, build validation, metrics dashboard
- **[View Milestone](https://github.com/macjunkins/github-org-toolkit/milestone/2)** - 6 planned issues

### Phase 4: Scheduled Automation 📅 Planned (Q2 2026)
- Automated stale cleanup, scheduled reports, continuous metrics
- CI/CD integration with GitHub Actions
- **[View Milestone](https://github.com/macjunkins/github-org-toolkit/milestone/3)** - 6 planned issues

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

---

## Support

- **Issues:** [GitHub Issues](https://github.com/macjunkins/github-org-toolkit/issues)
- **Discussions:** [GitHub Discussions](https://github.com/macjunkins/github-org-toolkit/discussions)
- **Documentation:** [docs/](docs/)

---

**Ready to take control of your GitHub organization? Let's automate the boring stuff and focus on what matters.** 🚀
