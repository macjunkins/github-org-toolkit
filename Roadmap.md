# Product Requirements Document (PRD)
## GitHub Organization Toolkit

**Version:** 1.0
**Last Updated:** 2025-11-01
**Status:** Draft
**Owner:** John Junkins (@macjunkins)

---

## Executive Summary

### Product Vision
A comprehensive toolkit that combines AI-assisted workflows, deterministic automation, and token-efficient operations to help maintainers manage GitHub organizations with 50+ repositories efficiently.

### Problem Statement
Managing large GitHub organizations is painful:
- **Manual navigation** through the GitHub web UI doesn't scale
- **Finding critical issues** across multiple projects is tedious
- **Status tracking** for stale issues and PRs is time-consuming
- **Report generation** and status updates are repetitive
- **Context switching** between repos kills productivity

### Solution
Combine three powerful approaches:
1. **AI-assisted workflows** via Claude Code slash commands (interactive, context-aware)
2. **Deterministic automation** via Bash/Python scripts (repeatable, schedulable)
3. **Token-efficient operations** using GitHub CLI (`gh`) and GraphQL caching

### Success Metrics
- **60-80% reduction** in manual GitHub UI navigation
- **Sub-5-minute** response time for triage summaries
- **90%+ cache hit rate** for frequently accessed data
- **10+ active contributors** within 6 months
- **5+ organizations** adopting the toolkit within 1 year

### Target Users
1. **Primary:** Organization maintainers managing 50+ repositories
2. **Secondary:** Development teams needing consistent GitHub workflows
3. **Tertiary:** Individual developers wanting AI-assisted issue management

---

## Product Phases & Roadmap

### Phase 1: Essential Commands ✅ (COMPLETED)
**Status:** Complete
**Duration:** Initial development
**Milestone:** `v1.0-phase-1-essentials`

Generic GitHub workflow commands that work in any repository:
- `/gh-work` - Start work on an issue
- `/gh-finish` - Complete work and close issue
- `/gh-update-issue` - Update issue with progress
- `/create-issue` - Create new issue with AI investigation
- `/gh-review-issue` - Review and update existing issue
- `/gh-create-milestone` - Create milestone
- `/gh-next-issue` - Create next sequential issue in milestone
- `/create-pr` - Create pull request
- `/review-pr` - Review PR with AI analysis

### Phase 2: Org Automation 🚧 (IN PROGRESS)
**Target:** Q4 2025
**Duration:** 3-4 weeks
**Milestone:** `v1.1-phase-2-org-automation`

AI-powered commands and scripts for organization management:
- Triage and status commands
- Project tracking tools
- Repository management scripts
- Ownership and compliance auditing

### Phase 3: Advanced Analysis 📅 (PLANNED)
**Target:** Q1 2026
**Duration:** 4-5 weeks
**Milestone:** `v1.2-phase-3-analysis`

Deep insights and dependency analysis:
- Blocking issue detection
- Dependency graph visualization
- Build validation automation
- Discussion summarization

### Phase 4: Scheduled Automation 📅 (PLANNED)
**Target:** Q2 2026
**Duration:** 3-4 weeks
**Milestone:** `v1.3-phase-4-scheduled`

Continuous automation and maintenance:
- Stale issue cleanup (cron)
- Weekly report generation (cron)
- Label synchronization (cron)
- Metrics dashboard (cron)

---

## Technical Architecture

### System Components

```
github-org-toolkit/
├── .claude/
│   ├── commands/
│   │   ├── generic/           # Phase 1: Works in any repo
│   │   └── org-automation/    # Phase 2+: Org-specific
│   └── github-queries/        # Reusable GraphQL queries
├── scripts/
│   ├── bash/                  # Shell automation
│   └── python/                # Data processing & analysis
├── config/
│   ├── config.yaml            # User configuration
│   └── labels.json            # Standard label definitions
└── examples/                  # Real-world configurations
```

### Technology Stack

**Core Technologies:**
- **Claude Code** - AI coding assistant (slash command runner)
- **GitHub CLI (`gh`)** - Token-efficient GitHub operations
- **GraphQL API** - Efficient multi-repo queries
- **Bash** - Shell automation scripts
- **Python 3.8+** - Data processing and analysis

**Key Design Decisions:**
1. **Prefer `gh` CLI over GitHub REST API** - 80-85% more token-efficient
2. **Cache GraphQL results** (5-minute TTL) - Avoid rate limits
3. **Slash commands for AI workflows** - Interactive, context-aware
4. **Scripts for deterministic tasks** - Repeatable, schedulable
5. **No external dependencies** - Use stdlib where possible

### Data Flow

```
User → Slash Command → Claude Code → GitHub CLI → GitHub API
                    ↓
              GraphQL Query → Cache Layer → Results
                    ↓
              AI Processing → Summary/Insights → User
```

---

## Phase 2: Org Automation - Detailed Requirements

### Milestone: `v1.1-phase-2-org-automation`

**Goal:** Provide AI-powered organization management tools
**Duration:** 3-4 weeks
**Dependencies:** Phase 1 complete

---

## User Stories - Phase 2

### Epic: Daily Triage & Status Tracking

#### Story 2.1: Triage Summary Command
**As an** organization maintainer
**I want** to see all issues needing decisions across my org
**So that** I can start my day with clear priorities

**Slash Command:** `/triage-summary`

**Acceptance Criteria:**
- [ ] Query all repositories for issues with `triage` label
- [ ] Extract decision points marked with 🔍 or "DECISION:" prefix
- [ ] Group issues by milestone or priority
- [ ] Show blocking issues at the top
- [ ] Include issue number, title, and key decisions
- [ ] Complete in under 5 seconds (cache-assisted)

**Technical Notes:**
- Use GraphQL query to fetch all org repos and their triage issues
- Cache results for 5 minutes
- Parse issue bodies for decision markers
- AI summarizes and prioritizes

**Labels:** `enhancement`, `phase-2`, `slash-command`, `priority-high`

---

#### Story 2.2: Project Status Command
**As an** organization maintainer
**I want** to see the current state of a project board
**So that** I can identify risks and blockers quickly

**Slash Command:** `/project-status <project-number>`

**Acceptance Criteria:**
- [ ] Fetch project board data via GraphQL
- [ ] Calculate completion percentage
- [ ] Group issues by status (Todo/In Progress/Done)
- [ ] Identify issues with no activity in 7+ days
- [ ] Provide AI-generated recommendations
- [ ] Highlight issues blocking other work

**Technical Notes:**
- Use Projects V2 API (GraphQL)
- Calculate velocity based on recent completions
- AI analyzes trends and suggests actions

**Labels:** `enhancement`, `phase-2`, `slash-command`, `priority-high`

---

#### Story 2.3: Milestone Summary Command
**As an** organization maintainer
**I want** to see progress toward a specific milestone
**So that** I can ensure we hit our deadlines

**Slash Command:** `/milestone-summary <milestone-name>`

**Acceptance Criteria:**
- [ ] Find milestone across all org repositories
- [ ] Show completed vs. total issues
- [ ] Calculate days remaining until due date
- [ ] Identify blocked issues
- [ ] Show issues without updates in 7+ days
- [ ] Estimate completion date based on velocity

**Technical Notes:**
- Search all repos for matching milestone
- Calculate velocity from last 2 weeks
- AI provides deadline risk assessment

**Labels:** `enhancement`, `phase-2`, `slash-command`, `priority-medium`

---

#### Story 2.4: Archival Status Command
**As an** organization maintainer running an archival project
**I want** to see custom archival progress tracking
**So that** I can monitor the multi-week archival effort

**Slash Command:** `/archival-status`

**Acceptance Criteria:**
- [ ] Show current repo count vs. target
- [ ] Display progress per archival tier
- [ ] List blocking issues
- [ ] Show timeline progress (week-by-week)
- [ ] Calculate risk level based on blockers
- [ ] Provide next action recommendations

**Technical Notes:**
- Custom command specific to repository archival projects
- Reads from config file for tier definitions
- Checks ARCHIVAL_LOG.md for completed archives

**Labels:** `enhancement`, `phase-2`, `slash-command`, `priority-medium`, `archival-specific`

---

### Epic: Repository Management Scripts

#### Story 2.5: Repository Ownership Audit Script
**As an** organization maintainer
**I want** to identify all repos not owned by my organization
**So that** I can transfer them and maintain accurate counts

**Script:** `scripts/python/repo-ownership-audit.py`

**Acceptance Criteria:**
- [ ] Query all repositories in the organization
- [ ] Identify owner for each repo (org vs. personal)
- [ ] Check visibility (public vs. private)
- [ ] Get last commit date
- [ ] Flag repos needing transfer
- [ ] Output CSV report with findings
- [ ] Include `--org` flag to specify organization
- [ ] Include `--output` flag for report filename

**Technical Notes:**
- Use GitHub GraphQL API for efficiency
- Check repo ownership via owner.login field
- Include personal repos with org access

**Labels:** `enhancement`, `phase-2`, `script`, `priority-high`

---

#### Story 2.6: Batch Archive Repositories Script
**As an** organization maintainer
**I want** to archive multiple repositories safely from a list
**So that** I can execute archival plans with dry-run testing

**Script:** `scripts/bash/archive-repos-batch.sh`

**Acceptance Criteria:**
- [ ] Read repository list from text file
- [ ] Support `--dry-run` mode (shows what would happen)
- [ ] Support `--execute` mode (performs archival)
- [ ] Verify each repo exists before archiving
- [ ] Check for open issues/PRs and warn
- [ ] Archive using `gh repo archive`
- [ ] Update ARCHIVAL_LOG.md with results
- [ ] Post summary to discussion thread (if configured)
- [ ] Provide detailed success/failure report

**Technical Notes:**
- Use `gh repo archive` for safe archival
- Include rollback instructions in case of errors
- Log all actions with timestamps

**Labels:** `enhancement`, `phase-2`, `script`, `priority-high`

---

#### Story 2.7: Label Sync Script
**As an** organization maintainer
**I want** to ensure consistent labels across all repositories
**So that** issue tracking is standardized

**Script:** `scripts/bash/sync-labels.sh`

**Acceptance Criteria:**
- [ ] Read label definitions from `config/labels.json`
- [ ] Query all repositories in organization
- [ ] Create missing labels
- [ ] Update label colors and descriptions
- [ ] Report repos with extra (non-standard) labels
- [ ] Output CSV consistency report
- [ ] Support `--dry-run` mode
- [ ] Support `--repo` flag for single-repo mode

**Technical Notes:**
- Use `gh label create` and `gh label edit`
- Standard labels: bug, enhancement, documentation, etc.
- Don't delete extra labels (only report them)

**Labels:** `enhancement`, `phase-2`, `script`, `priority-medium`

---

### Epic: Configuration & Documentation

#### Story 2.8: Configuration System
**As a** user setting up the toolkit
**I want** a clear configuration system
**So that** I can customize the toolkit for my organization

**Files:**
- `config/config.example.yaml` - Template
- `config/config.yaml` - User config (gitignored)
- `config/labels.json` - Standard label definitions

**Acceptance Criteria:**
- [ ] Create YAML config template with comments
- [ ] Document all configuration options
- [ ] Include examples for common setups
- [ ] Validate config on script startup
- [ ] Provide clear error messages for invalid config
- [ ] Add `.gitignore` entry for `config/config.yaml`

**Configuration Options:**
```yaml
organization: "YourOrgName"
cache_ttl: 300  # 5 minutes
labels_source: "config/labels.json"
tier1_repos: "examples/your-org/tier1-repos.txt"
tier2_repos: "examples/your-org/tier2-repos.txt"
stale_issue_days: 60
weekly_report_day: "Monday"
```

**Labels:** `enhancement`, `phase-2`, `documentation`, `priority-high`

---

#### Story 2.9: Organization Automation Documentation
**As a** new user or contributor
**I want** comprehensive documentation for org automation features
**So that** I can use them effectively

**File:** `docs/usage/org-automation.md`

**Acceptance Criteria:**
- [ ] Document all Phase 2 slash commands with examples
- [ ] Document all Phase 2 scripts with usage
- [ ] Include configuration instructions
- [ ] Provide real-world examples
- [ ] Add troubleshooting section
- [ ] Include screenshots or example output

**Labels:** `documentation`, `phase-2`, `priority-high`

---

#### Story 2.10: GraphQL Query Library
**As a** developer extending the toolkit
**I want** reusable GraphQL query templates
**So that** I can efficiently query GitHub without rewriting queries

**Directory:** `.claude/github-queries/`

**Acceptance Criteria:**
- [ ] Create `triage-issues.graphql` query
- [ ] Create `milestone-progress.graphql` query
- [ ] Create `project-status.graphql` query
- [ ] Create `repo-list.graphql` query
- [ ] Document query variables
- [ ] Provide usage examples with `gh api`

**Technical Notes:**
- Store queries in `.graphql` files
- Use with: `gh api graphql -f query="$(cat .claude/github-queries/triage-issues.graphql)"`
- Include variable documentation in comments

**Labels:** `enhancement`, `phase-2`, `developer-experience`, `priority-medium`

---

## Phase 3: Advanced Analysis - Detailed Requirements

### Milestone: `v1.2-phase-3-analysis`

**Goal:** Provide deep insights and dependency analysis
**Duration:** 4-5 weeks
**Dependencies:** Phase 2 complete

---

## User Stories - Phase 3

### Epic: Blocking Issues & Dependencies

#### Story 3.1: Find Blocking Issues Command
**As an** organization maintainer
**I want** to identify all issues blocking other work
**So that** I can prioritize critical path items

**Slash Command:** `/find-blocking-issues`

**Acceptance Criteria:**
- [ ] Parse issue bodies for "BLOCKED BY" keywords
- [ ] Build dependency graph
- [ ] Identify critical path (most blockers)
- [ ] Show issues with no updates
- [ ] Provide prioritization recommendations
- [ ] Display blocking chain depth

**Technical Notes:**
- Search issue bodies for: "BLOCKED BY #123", "Depends on #456"
- Use graph traversal to find critical path
- AI ranks by business impact + blocking count

**Labels:** `enhancement`, `phase-3`, `slash-command`, `priority-high`

---

#### Story 3.2: Dependency Graph Visualization Script
**As an** organization maintainer
**I want** to visualize issue dependencies as a graph
**So that** I can understand complex project relationships

**Script:** `scripts/python/dependency-graph.py`

**Acceptance Criteria:**
- [ ] Parse all issues for dependency keywords
- [ ] Build dependency graph using NetworkX
- [ ] Detect circular dependencies
- [ ] Generate SVG/PNG diagram
- [ ] Highlight critical path in red
- [ ] Output text report of critical path
- [ ] Support `--project` flag for filtering

**Technical Notes:**
- Use NetworkX for graph analysis
- Use Graphviz for visualization
- Color code by priority/status

**Labels:** `enhancement`, `phase-3`, `script`, `visualization`, `priority-medium`

---

### Epic: Discussion & Communication

#### Story 3.3: Discussion Summary Command
**As an** organization maintainer
**I want** AI-powered summaries of long discussion threads
**So that** I can catch up quickly without reading 50+ comments

**Slash Command:** `/discussion-summary <discussion-number>`

**Acceptance Criteria:**
- [ ] Fetch discussion with all comments
- [ ] Identify key points and themes
- [ ] Extract decisions made
- [ ] List open questions
- [ ] Identify action items with owners
- [ ] Summarize consensus vs. debate topics

**Technical Notes:**
- Use GraphQL to fetch discussion + comments
- AI processes full thread for summarization
- Identify patterns like "consensus" or "disagreement"

**Labels:** `enhancement`, `phase-3`, `slash-command`, `priority-medium`

---

### Epic: Build & Validation

#### Story 3.4: Build Validation Script
**As an** organization maintainer running archival or dependency changes
**I want** automated build validation
**So that** I can verify no builds break after changes

**Script:** `scripts/bash/build-validation.sh`

**Acceptance Criteria:**
- [ ] Clone specified repository
- [ ] Run build commands (configurable)
- [ ] Capture build logs
- [ ] Report success/failure
- [ ] Comment on linked issue with results
- [ ] Update issue checklist if passing
- [ ] Create new issue if failing
- [ ] Support multiple build targets (KDE/XFCE/etc.)

**Technical Notes:**
- Configurable build commands per project type
- Integrate with CI/CD if available
- Store build artifacts for debugging

**Labels:** `enhancement`, `phase-3`, `script`, `ci-integration`, `priority-medium`

---

### Epic: Reporting & Analytics

#### Story 3.5: Weekly Report Command
**As an** organization maintainer
**I want** an auto-generated weekly activity summary
**So that** I can share progress with stakeholders

**Slash Command:** `/weekly-report`

**Acceptance Criteria:**
- [ ] Collect last 7 days of activity
- [ ] Count issues created/closed
- [ ] Count PRs merged
- [ ] Summarize discussion activity
- [ ] Show milestone progress
- [ ] Identify hot topics (most active issues)
- [ ] Provide next week priorities
- [ ] Format as markdown for easy sharing

**Technical Notes:**
- Query activity via GraphQL
- AI synthesizes into narrative format
- Cache data for 1 hour (reports don't change often)

**Labels:** `enhancement`, `phase-3`, `slash-command`, `reporting`, `priority-low`

---

#### Story 3.6: Metrics Dashboard Script
**As an** organization maintainer
**I want** an interactive metrics dashboard
**So that** I can track org health over time

**Script:** `scripts/python/metrics-dashboard.py`

**Acceptance Criteria:**
- [ ] Collect org-wide metrics
- [ ] Issues created/closed per week
- [ ] Average time to close issues
- [ ] PR merge rate
- [ ] Discussion activity
- [ ] Repo activity (commits per repo)
- [ ] Generate charts (matplotlib/plotly)
- [ ] Output interactive HTML dashboard
- [ ] Support `--timeframe` flag (30/60/90 days)

**Technical Notes:**
- Use plotly for interactive charts
- Store historical data in JSON for trends
- Refresh dashboard on schedule (cron)

**Labels:** `enhancement`, `phase-3`, `script`, `visualization`, `reporting`, `priority-low`

---

## Phase 4: Scheduled Automation - Detailed Requirements

### Milestone: `v1.3-phase-4-scheduled`

**Goal:** Continuous automation and maintenance
**Duration:** 3-4 weeks
**Dependencies:** Phase 3 complete

---

## User Stories - Phase 4

### Epic: Automated Maintenance

#### Story 4.1: Stale Issue Cleanup Script
**As an** organization maintainer
**I want** automatic cleanup of stale issues
**So that** issue lists stay relevant without manual work

**Script:** `scripts/bash/stale-cleanup.sh`

**Acceptance Criteria:**
- [ ] Find issues with no activity in 60+ days
- [ ] Add `stale` label with warning comment
- [ ] Close issues stale for 7+ days after labeling
- [ ] Skip issues with `keep-open` label
- [ ] Skip issues in active milestones
- [ ] Log all actions to file
- [ ] Support `--dry-run` mode
- [ ] Configurable staleness threshold

**Cron Schedule:** `0 2 * * *` (nightly at 2am)

**Technical Notes:**
- Use `gh issue list --search "updated:<60days ago"`
- Gentle approach: warn before closing
- Allow manual override with labels

**Labels:** `enhancement`, `phase-4`, `script`, `automation`, `priority-medium`

---

#### Story 4.2: Weekly Report Generator Script
**As an** organization maintainer
**I want** automated weekly reports posted to discussions
**So that** the team stays informed without manual effort

**Script:** `scripts/python/weekly-report-generator.py`

**Acceptance Criteria:**
- [ ] Generate detailed weekly activity report
- [ ] Include metrics and charts
- [ ] Post to specified discussion thread
- [ ] Email to maintainers (if configured)
- [ ] Archive reports in `reports/` directory
- [ ] Support `--post-discussion` flag
- [ ] Support `--email` flag
- [ ] Generate JSON metrics for dashboards

**Cron Schedule:** `0 9 * * MON` (Monday at 9am)

**Technical Notes:**
- Similar to Story 3.5 but automated
- Store historical reports for trend analysis
- Include links to key issues/PRs

**Labels:** `enhancement`, `phase-4`, `script`, `automation`, `reporting`, `priority-low`

---

#### Story 4.3: Label Sync Automation
**As an** organization maintainer
**I want** automatic label synchronization across repos
**So that** labels stay consistent as repos are added

**Script:** `scripts/bash/sync-labels-cron.sh`

**Acceptance Criteria:**
- [ ] Wrapper around `sync-labels.sh` for cron
- [ ] Run automatically on schedule
- [ ] Generate report of changes
- [ ] Post summary to discussion (if changes made)
- [ ] Email report to maintainers
- [ ] Log all actions

**Cron Schedule:** `0 1 1 * *` (1st of month at 1am)

**Technical Notes:**
- Monthly sync is sufficient
- Only notify on changes (not every run)
- Use Story 2.7 script as base

**Labels:** `enhancement`, `phase-4`, `script`, `automation`, `priority-low`

---

#### Story 4.4: Metrics Collection Automation
**As an** organization maintainer
**I want** automated metrics collection
**So that** dashboards show current data without manual refresh

**Script:** `scripts/python/metrics-collector-cron.py`

**Acceptance Criteria:**
- [ ] Collect org-wide metrics
- [ ] Store in time-series format (JSON)
- [ ] Update metrics dashboard HTML
- [ ] Detect anomalies (sudden spikes/drops)
- [ ] Alert on anomalies (email/discussion)
- [ ] Keep 90 days of historical data
- [ ] Prune older data automatically

**Cron Schedule:** `0 */6 * * *` (every 6 hours)

**Technical Notes:**
- Regular collection enables trend analysis
- Use Story 3.6 dashboard as display
- Store data in `data/metrics/YYYY-MM-DD.json`

**Labels:** `enhancement`, `phase-4`, `script`, `automation`, `reporting`, `priority-low`

---

### Epic: CI/CD Integration

#### Story 4.5: GitHub Actions Workflows
**As a** contributor
**I want** CI/CD workflows for testing and validation
**So that** contributions are validated automatically

**Files:**
- `.github/workflows/test-scripts.yml`
- `.github/workflows/validate-commands.yml`
- `.github/workflows/lint.yml`

**Acceptance Criteria:**
- [ ] Test all Python scripts with pytest
- [ ] Lint Bash scripts with shellcheck
- [ ] Validate slash command syntax
- [ ] Check for broken links in docs
- [ ] Run on PRs and pushes to main
- [ ] Require passing checks for merge

**Technical Notes:**
- Use GitHub Actions for CI
- Include linting and testing
- Fast feedback on PRs

**Labels:** `enhancement`, `phase-4`, `ci-cd`, `priority-medium`

---

#### Story 4.6: Cron Setup Documentation
**As a** user wanting automated workflows
**I want** clear instructions for setting up cron jobs
**So that** scheduled automation works reliably

**File:** `docs/usage/cron-setup.md`

**Acceptance Criteria:**
- [ ] Document cron syntax and scheduling
- [ ] Provide example crontab entries
- [ ] Explain logging and error handling
- [ ] Include troubleshooting guide
- [ ] Document email notifications setup
- [ ] Provide systemd timer alternatives (Linux)

**Labels:** `documentation`, `phase-4`, `priority-medium`

---

## Non-Functional Requirements

### Performance
- **Triage summaries:** Complete in <5 seconds (cache-assisted)
- **Project status:** Complete in <10 seconds
- **Script execution:** Provide progress indicators for long-running tasks
- **Cache hit rate:** Achieve 90%+ for frequently accessed data
- **API rate limits:** Stay under 5000 requests/hour per user

### Security
- **No secrets in code:** Use environment variables or secure config
- **Read-only by default:** Scripts should request minimal permissions
- **Audit trail:** Log all destructive operations
- **Dry-run mode:** All destructive scripts must support dry-run
- **User confirmation:** Require explicit approval for bulk operations

### Usability
- **Clear error messages:** Include actionable resolution steps
- **Progress indicators:** Show progress for operations >2 seconds
- **Documentation:** Every command/script has usage examples
- **Consistent format:** Standardize markdown output across commands
- **Help text:** All scripts support `--help` flag

### Maintainability
- **Modular design:** Each command/script is independent
- **Reusable queries:** GraphQL queries stored separately
- **Configuration:** Externalize all org-specific values
- **Logging:** Structured logs for debugging
- **Versioning:** Semantic versioning for releases

---

## GitHub Issue Creation Guide

### Creating Milestones

Use this guide to create the four project milestones on GitHub:

```bash
# Phase 2: Org Automation
gh milestone create "v1.1-phase-2-org-automation" \
  --description "AI-powered commands and scripts for organization management" \
  --due-date "2025-12-31"

# Phase 3: Advanced Analysis
gh milestone create "v1.2-phase-3-analysis" \
  --description "Deep insights and dependency analysis" \
  --due-date "2026-03-31"

# Phase 4: Scheduled Automation
gh milestone create "v1.3-phase-4-scheduled" \
  --description "Continuous automation and maintenance" \
  --due-date "2026-06-30"
```

### Creating Issues from User Stories

Each user story in this PRD should become a GitHub issue. Use this template:

```bash
gh issue create \
  --title "[Story 2.1] Triage Summary Command" \
  --label "enhancement,phase-2,slash-command,priority-high" \
  --milestone "v1.1-phase-2-org-automation" \
  --body "$(cat <<'EOF'
## User Story
**As an** organization maintainer
**I want** to see all issues needing decisions across my org
**So that** I can start my day with clear priorities

## Slash Command
`/triage-summary`

## Acceptance Criteria
- [ ] Query all repositories for issues with `triage` label
- [ ] Extract decision points marked with 🔍 or "DECISION:" prefix
- [ ] Group issues by milestone or priority
- [ ] Show blocking issues at the top
- [ ] Include issue number, title, and key decisions
- [ ] Complete in under 5 seconds (cache-assisted)

## Technical Notes
- Use GraphQL query to fetch all org repos and their triage issues
- Cache results for 5 minutes
- Parse issue bodies for decision markers
- AI summarizes and prioritizes

## Definition of Done
- [ ] Command implementation complete
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Example output added to docs
- [ ] Code reviewed and merged

## Related
- Epic: Daily Triage & Status Tracking
- Milestone: v1.1-phase-2-org-automation
- Roadmap: Roadmap.md (Story 2.1)
EOF
)"
```

### Recommended Label Structure

Create these labels in your repository:

```bash
# Phase labels
gh label create "phase-2" --color "0e8a16" --description "Phase 2: Org Automation"
gh label create "phase-3" --color "1d76db" --description "Phase 3: Advanced Analysis"
gh label create "phase-4" --color "5319e7" --description "Phase 4: Scheduled Automation"

# Type labels
gh label create "slash-command" --color "d4c5f9" --description "Slash command feature"
gh label create "script" --color "c2e0c6" --description "Automation script"
gh label create "documentation" --color "0075ca" --description "Documentation update"
gh label create "ci-cd" --color "d93f0b" --description "CI/CD pipeline"

# Priority labels
gh label create "priority-high" --color "d73a4a" --description "High priority"
gh label create "priority-medium" --color "fbca04" --description "Medium priority"
gh label create "priority-low" --color "0e8a16" --description "Low priority"

# Feature labels
gh label create "automation" --color "c5def5" --description "Automated workflow"
gh label create "reporting" --color "bfdadc" --description "Reporting feature"
gh label create "visualization" --color "f9d0c4" --description "Data visualization"
gh label create "developer-experience" --color "e4e669" --description "DX improvement"
```

### Bulk Issue Creation Script

To create all Phase 2 issues at once, save this script as `scripts/create-phase2-issues.sh`:

```bash
#!/bin/bash
# Create all Phase 2 issues from PRD

MILESTONE="v1.1-phase-2-org-automation"

# Story 2.1: Triage Summary
gh issue create --title "[Story 2.1] Triage Summary Command" \
  --label "enhancement,phase-2,slash-command,priority-high" \
  --milestone "$MILESTONE" \
  --body-file issues/story-2.1-triage-summary.md

# Story 2.2: Project Status
gh issue create --title "[Story 2.2] Project Status Command" \
  --label "enhancement,phase-2,slash-command,priority-high" \
  --milestone "$MILESTONE" \
  --body-file issues/story-2.2-project-status.md

# ... (repeat for all stories)
```

---

## Contribution Guidelines

### For Contributors

**How to pick up a story:**
1. Find an unassigned issue in a current milestone
2. Comment: "I'd like to work on this"
3. Wait for maintainer assignment
4. Create a feature branch: `feature/story-2.1-triage-summary`
5. Implement following acceptance criteria
6. Submit PR referencing the issue: "Closes #123"

**Pull Request Requirements:**
- [ ] All acceptance criteria met
- [ ] Tests added (if applicable)
- [ ] Documentation updated
- [ ] Example output provided
- [ ] Code reviewed by maintainer

**Communication:**
- Use GitHub Discussions for questions
- Tag issues with `help-wanted` or `good-first-issue`
- Join discussions early if implementation approach is unclear

### For Maintainers

**Issue Triage Process:**
1. New issues get `triage` label
2. Validate against PRD scope
3. Assign to milestone and add priority label
4. Assign to contributor or mark `help-wanted`
5. Remove `triage` label once assigned

**PR Review Checklist:**
- [ ] Acceptance criteria fully met
- [ ] Code follows project style
- [ ] Documentation complete
- [ ] No security issues
- [ ] Performance acceptable
- [ ] Tests pass (when CI is available)

---

## Success Criteria

### Phase 2 Complete When:
- [ ] All 10 user stories implemented
- [ ] Documentation complete (`docs/usage/org-automation.md`)
- [ ] Configuration system working
- [ ] At least 3 real-world examples in `examples/`
- [ ] 5+ contributors involved
- [ ] 1+ external organization testing

### Phase 3 Complete When:
- [ ] All 6 user stories implemented
- [ ] Dependency graph visualization working
- [ ] Build validation tested on 3+ repo types
- [ ] Reporting commands used in 2+ orgs

### Phase 4 Complete When:
- [ ] All 6 user stories implemented
- [ ] Cron jobs running reliably
- [ ] CI/CD workflows passing
- [ ] Metrics dashboard deployed
- [ ] 10+ organizations using scheduled automation

---

## Appendix: Quick Reference

### All Slash Commands (When Complete)

**Phase 1: Generic (✅ Complete)**
- `/gh-work <issue>` - Start work on issue
- `/gh-finish <issue>` - Complete and close issue
- `/gh-update-issue <issue>` - Update issue progress
- `/create-issue` - Create new issue
- `/gh-review-issue <issue>` - Review existing issue
- `/gh-create-milestone` - Create milestone
- `/gh-next-issue <milestone>` - Create next issue in milestone
- `/create-pr` - Create pull request
- `/review-pr <number>` - Review PR

**Phase 2: Org Automation (🚧 In Progress)**
- `/triage-summary` - Show all triage issues
- `/project-status <number>` - Project board summary
- `/milestone-summary <name>` - Milestone progress
- `/archival-status` - Archival project tracking

**Phase 3: Advanced Analysis (📅 Planned)**
- `/find-blocking-issues` - Identify blockers
- `/discussion-summary <number>` - Summarize discussion
- `/weekly-report` - Generate weekly summary

**Phase 4: Scheduled (📅 Planned)**
- (All automation runs via cron, not interactive commands)

### All Scripts (When Complete)

**Phase 2: Org Automation (🚧 In Progress)**
- `repo-ownership-audit.py` - Audit repo ownership
- `archive-repos-batch.sh` - Batch archive repos
- `sync-labels.sh` - Sync labels across repos

**Phase 3: Advanced Analysis (📅 Planned)**
- `dependency-graph.py` - Visualize dependencies
- `build-validation.sh` - Validate builds
- `metrics-dashboard.py` - Generate metrics dashboard
- `weekly-report-generator.py` - Generate weekly report

**Phase 4: Scheduled (📅 Planned)**
- `stale-cleanup.sh` - Clean up stale issues (cron)
- `weekly-report-generator.py --post-discussion` - Auto-post reports (cron)
- `sync-labels-cron.sh` - Auto-sync labels (cron)
- `metrics-collector-cron.py` - Collect metrics (cron)

---

**Questions or feedback?** Open a discussion or issue on GitHub!

**Ready to contribute?** Check the current milestone and grab an unassigned issue with the `help-wanted` label!