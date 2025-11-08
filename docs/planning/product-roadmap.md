# Product Roadmap
## GitHub Organization Toolkit

**Version:** 1.0
**Last Updated:** 2025-11-01
**Owner:** John Junkins (@macjunkins)

---

## Executive Summary

### Product Vision
A comprehensive toolkit combining AI-assisted workflows, deterministic automation, and token-efficient operations to help maintainers manage GitHub organizations with 50+ repositories efficiently.

### Problem Statement
- Manual navigation through GitHub web UI doesn't scale
- Finding critical issues across multiple projects is tedious
- Status tracking for stale issues and PRs is time-consuming
- Context switching between repos kills productivity

### Solution
1. **AI-assisted workflows** via Claude Code slash commands (interactive, context-aware)
2. **Deterministic automation** via Bash/Python scripts (repeatable, schedulable)
3. **Token-efficient operations** using GitHub CLI (`gh`) and GraphQL caching

### Success Metrics
- **60-80% reduction** in manual GitHub UI navigation
- **Sub-5-minute** response time for triage summaries
- **90%+ cache hit rate** for frequently accessed data

---

## Product Phases

### Phase 1: Essential Commands ✅ (COMPLETED)
Generic GitHub workflow commands that work in any repository
- Issue workflow: `/gh-work`, `/gh-finish`, `/gh-update-issue`, `/create-issue`, `/gh-review-issue`
- Milestone management: `/gh-create-milestone`, `/gh-next-issue`
- PR workflow: `/create-pr`, `/review-pr`

### Phase 2: Org Automation 🚧 (IN PROGRESS - Q4 2025)
AI-powered commands and scripts for organization management
- Triage and status commands
- Project tracking tools
- Repository management scripts

### Phase 3: Advanced Analysis 📅 (PLANNED - Q1 2026)
Deep insights and dependency analysis
- Blocking issue detection
- Dependency graph visualization
- Discussion summarization

### Phase 4: Scheduled Automation 📅 (PLANNED - Q2 2026)
Continuous automation and maintenance
- Stale issue cleanup (cron)
- Weekly report generation (cron)
- Metrics dashboard (cron)

---

## Technical Architecture

**Technology Stack:**
- Claude Code (AI coding assistant)
- GitHub CLI (`gh`) - 80-85% more token-efficient than REST API
- GraphQL API with 5-minute caching
- Bash (shell automation)
- Python 3.8+ (data processing)

**Key Design Decisions:**
1. Prefer `gh` CLI over GitHub REST API for token efficiency
2. Cache GraphQL results to avoid rate limits
3. Slash commands for AI workflows, scripts for deterministic tasks

---

## Phase 2: Org Automation

**Milestone:** `v1.1-phase-2-org-automation`

### Epic: Daily Triage & Status Tracking

**2.1: Triage Summary** - Show all issues needing decisions across org for daily prioritization
- Command: `/triage-summary`
- Query repos for `triage` label, extract decision points, group by priority
- Show blocking issues first, complete in <5s with caching

**2.2: Project Status** - Show current state of project board with risks and blockers
- Command: `/project-status <project-number>`
- Fetch project data, calculate completion %, group by status
- Identify stale issues (7+ days), provide AI recommendations

**2.3: Milestone Summary** - Track progress toward specific milestone with deadline risk assessment
- Command: `/milestone-summary <milestone-name>`
- Find milestone across repos, show completed vs total issues
- Calculate days remaining and estimate completion based on velocity

**2.4: Archival Status** - Custom tracking for repository archival projects
- Command: `/archival-status`
- Show repo count vs target, progress per tier, blocking issues
- Calculate risk level and provide next action recommendations

### Epic: Repository Management Scripts

**2.5: Repository Ownership Audit** - Identify repos not owned by organization
- Script: `scripts/python/repo-ownership-audit.py`
- Query all repos, identify owner, check visibility and last commit
- Output CSV report with repos needing transfer

**2.6: Batch Archive Repositories** - Safely archive multiple repositories from list
- Script: `scripts/bash/archive-repos-batch.sh`
- Support `--dry-run` and `--execute` modes
- Verify repos exist, check for open issues/PRs, update ARCHIVAL_LOG.md

**2.7: Label Sync** - Ensure consistent labels across all repositories
- Script: `scripts/bash/sync-labels.sh`
- Read from `config/labels.json`, create/update labels
- Report non-standard labels, support `--dry-run` mode

### Epic: Configuration & Documentation

**2.8: Configuration System** - Clear YAML-based configuration
- Files: `config/config.example.yaml`, `config/config.yaml`, `config/labels.json`
- Document all options, validate on startup
- Support org name, cache TTL, tier definitions, stale thresholds

**2.9: Org Automation Documentation** - Comprehensive usage guide
- File: `docs/usage/org-automation.md`
- Document all commands/scripts with examples
- Include configuration, troubleshooting, screenshots

**2.10: GraphQL Query Library** - Reusable query templates for efficient GitHub access
- Directory: `.claude/github-queries/`
- Create queries: `triage-issues.graphql`, `milestone-progress.graphql`, `project-status.graphql`
- Document variables and usage with `gh api`

---

## Phase 3: Advanced Analysis

**Milestone:** `v1.2-phase-3-analysis`

### Epic: Blocking Issues & Dependencies

**3.1: Find Blocking Issues** - Identify all issues blocking other work for critical path prioritization
- Command: `/find-blocking-issues`
- Parse issue bodies for "BLOCKED BY" keywords, build dependency graph
- Show critical path, provide prioritization recommendations

**3.2: Dependency Graph Visualization** - Visualize issue dependencies as graph
- Script: `scripts/python/dependency-graph.py`
- Build graph with NetworkX, detect circular dependencies
- Generate SVG/PNG with critical path highlighted

### Epic: Discussion & Communication

**3.3: Discussion Summary** - AI-powered summaries of long discussion threads
- Command: `/discussion-summary <discussion-number>`
- Fetch discussion with comments, identify key points and themes
- Extract decisions, open questions, action items

### Epic: Build & Validation

**3.4: Build Validation** - Automated build validation for archival or dependency changes
- Script: `scripts/bash/build-validation.sh`
- Clone repo, run configurable build commands, capture logs
- Comment on linked issue, create new issue if failing

### Epic: Reporting & Analytics

**3.5: Weekly Report** - Auto-generated weekly activity summary for stakeholders
- Command: `/weekly-report`
- Collect last 7 days activity, count issues/PRs, summarize discussions
- Show milestone progress, identify hot topics, format as markdown

**3.6: Metrics Dashboard** - Interactive metrics dashboard for org health tracking
- Script: `scripts/python/metrics-dashboard.py`
- Collect org-wide metrics, generate charts with plotly
- Output interactive HTML, support `--timeframe` flag

---

## Phase 4: Scheduled Automation

**Milestone:** `v1.3-phase-4-scheduled`

### Epic: Automated Maintenance

**4.1: Stale Issue Cleanup** - Automatic cleanup of stale issues
- Script: `scripts/bash/stale-cleanup.sh` (cron: nightly at 2am)
- Find issues with no activity in 60+ days, add `stale` label
- Close after 7 days unless `keep-open` label or active milestone

**4.2: Weekly Report Generator** - Automated weekly reports posted to discussions
- Script: `scripts/python/weekly-report-generator.py` (cron: Monday at 9am)
- Generate report, post to discussion, email maintainers
- Archive in `reports/` directory, generate JSON metrics

**4.3: Label Sync Automation** - Automatic label synchronization across repos
- Script: `scripts/bash/sync-labels-cron.sh` (cron: 1st of month at 1am)
- Run sync-labels.sh, generate report, post summary if changes made
- Only notify on changes

**4.4: Metrics Collection Automation** - Automated metrics collection for dashboards
- Script: `scripts/python/metrics-collector-cron.py` (cron: every 6 hours)
- Collect org-wide metrics in time-series format
- Detect anomalies, alert on spikes/drops, keep 90 days history

### Epic: CI/CD Integration

**4.5: GitHub Actions Workflows** - CI/CD workflows for testing and validation
- Files: `.github/workflows/test-scripts.yml`, `validate-commands.yml`, `lint.yml`
- Test Python scripts with pytest, lint Bash with shellcheck
- Validate slash command syntax, check for broken links

**4.6: Cron Setup Documentation** - Clear instructions for setting up cron jobs
- File: `docs/usage/cron-setup.md`
- Document cron syntax, provide example crontab entries
- Include troubleshooting, email notifications, systemd alternatives

---

## Non-Functional Requirements

**Performance:** <5s triage summaries, <10s project status, 90%+ cache hit rate, <5000 API requests/hour
**Security:** No secrets in code, read-only by default, audit trail for destructive ops, dry-run mode required
**Usability:** Clear error messages with resolutions, progress indicators, comprehensive docs, standardized markdown output
**Maintainability:** Modular design, reusable GraphQL queries, external config, structured logging, semantic versioning

---

## Success Criteria

### Phase 2 Complete When:
- All 10 user stories implemented with documentation
- Configuration system working, 3+ real-world examples
- 5+ contributors involved, 1+ external org testing

### Phase 3 Complete When:
- All 6 user stories implemented
- Dependency graph working, build validation tested on 3+ repo types
- Reporting used in 2+ orgs

### Phase 4 Complete When:
- All 6 user stories implemented
- Cron jobs running reliably, CI/CD workflows passing
- 10+ orgs using scheduled automation

---

## Quick Reference

### Slash Commands by Phase
**Phase 1 (✅ Complete):** 9 commands - issue workflow, milestone management, PR workflow
**Phase 2 (🚧 In Progress):** 4 commands - `/triage-summary`, `/project-status`, `/milestone-summary`, `/archival-status`
**Phase 3 (📅 Planned):** 3 commands - `/find-blocking-issues`, `/discussion-summary`, `/weekly-report`
**Phase 4 (📅 Planned):** All automation via cron (no interactive commands)

### Scripts by Phase
**Phase 2 (🚧 In Progress):** 3 scripts - repo ownership audit, batch archive, label sync
**Phase 3 (📅 Planned):** 4 scripts - dependency graph, build validation, metrics dashboard, weekly report generator
**Phase 4 (📅 Planned):** 4 cron scripts - stale cleanup, weekly reports, label sync, metrics collection

---

**Questions or feedback?** Open a discussion or issue on GitHub!
