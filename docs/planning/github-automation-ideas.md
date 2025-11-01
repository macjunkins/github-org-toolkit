# GitHub Organization Automation Ideas

**Date:** 2025-10-31
**Context:** AcreetionOS-Linux Organization Management
**Purpose:** Leverage GitHub CLI, GraphQL API, and Claude Code slash commands for efficient org management

---

## Philosophy: Slash Commands vs Standalone Scripts

### When to Use Slash Commands
**Best for:** Interactive workflows where you need AI assistance to interpret, summarize, or make decisions.

**Characteristics:**
- Requires context understanding (summarizing discussions, extracting decisions)
- Needs natural language output (reports, summaries)
- Benefits from AI reasoning (prioritization, recommendations)
- Used frequently in Claude Code workflow
- Quick ad-hoc queries

**Examples:** Summarizing triage items, generating reports, analyzing issue dependencies

### When to Use Bash/Python Scripts
**Best for:** Deterministic operations, automation, scheduled tasks, or complex data processing.

**Characteristics:**
- Repeatable operations (sync labels, archive repos)
- Scheduled automation (nightly reports, stale issue cleanup)
- Complex data transformation (metrics, graphs)
- External integrations (webhooks, CI/CD)
- Called from cron or CI pipelines

**Examples:** Batch archiving repos, syncing labels across repos, generating metrics

---

## Slash Command Ideas

### Daily Workflow Commands

#### `/triage-summary`
**Purpose:** Show all issues needing decisions across the org
**Why Slash Command:** AI can interpret 🔍 markers, prioritize by urgency, summarize context
**Output:**
```
## Triage Summary (5 issues)

### 🚨 Blocking Issues (1)
- #23: Audit and transfer personal repos to org ownership
  - DECISION: Which personal accounts to audit?
  - DECISION: Make private repos public during transfer?

### Milestone 1: Pre-Archival (4 issues)
- #6: Validate custom work (archlinux-keyring, pamac, coreutils-rust)
  - DECISION: Does archlinux-keyring contain AcreetionOS keys?
- #9: Archive GNU Core Utilities
  - DECISION: Keep coreutils-rust or archive both?
...
```

**Implementation:**
```bash
# Query all issues with 'triage' label
# Extract decision points from issue bodies
# Group by milestone/priority
# AI summarizes with context
```

---

#### `/project-status [project-number]`
**Purpose:** Summarize project board state with insights
**Why Slash Command:** AI can identify trends, suggest actions, highlight risks
**Output:**
```
## Project #7: AcreetionOS-Linux Repository Archival

**Progress:** 2/23 issues complete (9%)
**Status:** On track (Week 1 of 4)

### Breakdown
- 📋 Todo: 20 issues
- 🔄 In Progress: 1 issue (#23 - Ownership audit)
- ✅ Done: 2 issues

### ⚠️ Attention Needed
- Issue #23 (blocking) has no progress in 2 days
- Milestone 1 due in 7 days with 7 open issues

### 💡 Recommendations
- Prioritize Issue #23 (blocks 3 other issues)
- Consider extending Milestone 1 by 3 days
```

---

#### `/milestone-summary <milestone-name>`
**Purpose:** Progress report for specific milestone
**Why Slash Command:** Natural language summary, burndown analysis, actionable recommendations
**Output:**
```
## Milestone: Pre-Archival Preparation
**Due:** Nov 8, 2025 (7 days remaining)
**Progress:** 1/7 issues complete (14%)

### Completed ✅
- #3: Create ARCHIVAL_LOG.md

### In Progress 🔄
- #23: Audit and transfer personal repos

### Blocked 🚫
- #2: Audit PKGBUILD Dependencies (blocked by #23)
- #6: Validate custom work (blocked by #23)

### Not Started 📋
- #1: Create community announcement
- #4: Update build system documentation
- #5: Backup critical data

### 📊 Analysis
- At current velocity (1 issue/week), milestone will miss deadline by 6 days
- Recommend: Complete #23 ASAP to unblock 2 critical issues
```

---

#### `/discussion-summary <discussion-number>`
**Purpose:** AI-powered summary of discussion thread
**Why Slash Command:** Natural language processing to extract key points, decisions, action items
**Output:**
```
## Discussion #7: Repository Archival Proposal

**Participants:** 3 people, 12 comments
**Status:** Active discussion, no final decision yet

### Key Points
1. Consensus on archiving empty repos (10 repos)
2. Debate on pamac ecosystem (keep vs archive)
3. Concern about breaking builds during archival

### Decisions Made
- ✅ Archive TIER 1 repos immediately (10 repos)
- ✅ Require validation checkpoint after TIER 1

### Open Questions
- ❓ Should archlinux-keyring be kept? (awaiting key audit)
- ❓ Timeline: 4 weeks realistic or extend to 6?

### Action Items
- [ ] @macjunkins: Audit archlinux-keyring for custom keys (Issue #6)
- [ ] @team: Review TIER 2 repo list for missed customizations
```

---

#### `/issue-decisions <issue-number>`
**Purpose:** Extract all decision points from an issue
**Why Slash Command:** Parse issue body/comments for 🔍 markers and decision context
**Output:**
```
## Issue #23: Audit and Transfer Personal Repos

### Decisions Needed (3)

1. **Which personal accounts need auditing?**
   - Context: Some repos may be under personal ownership
   - Impact: Missing repos invalidate archival count
   - Recommendation: List all org members + collaborators

2. **Should private repos be made public during transfer?**
   - Context: Some repos may contain sensitive data
   - Impact: Security risk vs transparency
   - Recommendation: Review each private repo individually

3. **Timing: Block all archival or just specific repos?**
   - Context: Org may not own all repos yet
   - Impact: Project timeline
   - Recommendation: Block TIER 1 only, proceed with known repos
```

---

#### `/find-blocking-issues`
**Purpose:** Identify all issues blocking other work
**Why Slash Command:** Traverse dependency graph, prioritize critical path
**Output:**
```
## Blocking Issues Analysis

### Critical Path (3 issues)
1. #23: Audit personal repos 🚨 **BLOCKS 5 issues**
   - Blocks: #2, #6, #7, #9, #10
   - Status: In Progress (no updates in 2 days)
   - Recommendation: **URGENT - Top priority**

2. #8: Validate TIER 1 archival **BLOCKS 8 issues**
   - Blocks: All TIER 2 archival issues (#9-15)
   - Status: Waiting on #7 to complete
   - Recommendation: Prepare validation environment now

3. #16: Validate TIER 2 archival **BLOCKS 6 issues**
   - Blocks: All post-archival docs (#17-22)
   - Status: Not started
   - Recommendation: Schedule for Week 3
```

---

#### `/weekly-report`
**Purpose:** Auto-generate weekly activity summary for the org
**Why Slash Command:** AI synthesis of activity into readable narrative
**Output:**
```
## AcreetionOS-Linux Weekly Report
**Week of:** Oct 28 - Nov 3, 2025

### 📊 Activity Summary
- **Issues:** 23 created, 2 closed
- **Discussions:** 2 new threads, 15 comments
- **Pull Requests:** 0 (archival project is planning phase)
- **Repositories:** No changes (archival pending)

### 🎯 Milestones Progress
- **Pre-Archival Preparation:** 1/7 complete (on track)
- **TIER 1:** Not started
- **TIER 2:** Not started
- **Post-Archival:** Not started

### 🔥 Hot Topics
1. Issue #23 (personal repo ownership) - blocking 5 issues
2. Discussion #7 (archival timeline) - debating 4 vs 6 weeks
3. Decision pending: archlinux-keyring keep vs archive

### 📅 Next Week Priorities
1. Complete Issue #23 (ownership audit)
2. Finalize archival decisions (#6, #13, #15)
3. Begin TIER 1 archival (#7)
```

---

#### `/stale-report`
**Purpose:** Find stale issues, PRs, discussions
**Why Slash Command:** AI can suggest actions (close, ping, re-engage)
**Output:**
```
## Stale Items Report (30+ days no activity)

### Issues (3)
- #12 (Open 45 days) - "Update website design"
  - Last activity: Sep 15, 2025
  - Recommendation: **Close** (superseded by archival project)

- #18 (Open 60 days) - "Add GNOME variant documentation"
  - Last activity: Sep 1, 2025
  - Recommendation: **Keep** (still relevant, assign to maintainer)

### Discussions (1)
- Discussion #4 (Created 90 days ago) - "Use discussions for decisions"
  - Last comment: Aug 1, 2025
  - Recommendation: **Close** (purpose achieved, discussions now active)
```

---

### Repository Management Commands

#### `/repo-health <repo-name>`
**Purpose:** Comprehensive health check for a repository
**Why Slash Command:** AI interprets multiple signals, provides actionable recommendations
**Output:**
```
## Repository Health: acreetionos

### ✅ Healthy Indicators
- Active development (last commit: 2 days ago)
- CI passing (all workflows green)
- Documentation exists (README, CONTRIBUTING)
- No open security alerts

### ⚠️ Needs Attention
- 12 open issues (5 with 'bug' label)
- No branch protection on main
- 3 stale PRs (30+ days)

### 💡 Recommendations
1. **Enable branch protection** (require PR reviews)
2. **Triage bug issues** (5 issues need labels/milestones)
3. **Review stale PRs** (merge or close #45, #67, #89)
```

---

#### `/archival-status`
**Purpose:** Custom command for tracking archival project progress
**Why Slash Command:** Project-specific logic, AI summarizes multi-source data
**Output:**
```
## AcreetionOS Repository Archival Status

### 📊 Overall Progress
- **Current:** 99 repos
- **Target:** 20-24 repos
- **To Archive:** 75-79 repos
- **Archived:** 0 repos (0%)

### 🎯 Milestone Progress
1. ✅ Pre-Archival (14% complete) - 1/7 issues done
2. ⏸️  TIER 1 (0% complete) - Blocked by #23
3. ⏸️  TIER 2 (0% complete) - Blocked by #8
4. ⏸️  Post-Archival (0% complete) - Blocked by #16

### 🚨 Blockers
- **Issue #23** blocks everything (personal repo ownership)

### 📅 Timeline
- **Week 1:** Pre-archival (IN PROGRESS)
- **Week 2:** TIER 1 archival (NOT STARTED)
- **Week 3:** TIER 2 archival (NOT STARTED)
- **Week 4:** Cleanup & docs (NOT STARTED)

### ⚠️ Risk Assessment
- **High Risk:** Timeline at risk if #23 not resolved by Nov 4
- **Medium Risk:** TIER 2 validation may uncover unexpected issues
- **Low Risk:** TIER 1 archival (empty repos, very safe)
```

---

## Bash/Python Script Ideas

### Automation Scripts (Run via cron or manually)

#### `sync-labels.sh`
**Purpose:** Ensure all repos have consistent labels
**Why Script:** Deterministic, batch operation across repos
**Usage:**
```bash
./scripts/sync-labels.sh
```

**What it does:**
```bash
#!/bin/bash
# Read standard labels from .github/labels.json
# For each repo in org:
#   - Create missing labels
#   - Update label colors/descriptions
#   - Report repos with extra labels
# Output: CSV report of label consistency
```

---

#### `archive-repos-batch.sh`
**Purpose:** Archive multiple repos from a list
**Why Script:** Repeatable, auditable, can be run in dry-run mode
**Usage:**
```bash
./scripts/archive-repos-batch.sh --file tier1-repos.txt --dry-run
./scripts/archive-repos-batch.sh --file tier1-repos.txt --execute
```

**What it does:**
```bash
#!/bin/bash
# Read repo list from file
# For each repo:
#   - Verify repo exists
#   - Check for open issues/PRs
#   - Archive repo (gh repo archive)
#   - Update ARCHIVAL_LOG.md
#   - Post to discussion thread
# Output: Archival summary report
```

---

#### `repo-ownership-audit.py`
**Purpose:** Identify repos not owned by the organization (Issue #23)
**Why Script:** Complex GraphQL queries, data processing, CSV output
**Usage:**
```bash
python scripts/repo-ownership-audit.py --output ownership-report.csv
```

**What it does:**
```python
# Query GitHub API for all org repos
# For each repo:
#   - Get owner (org vs personal account)
#   - Check visibility (public vs private)
#   - Get last commit date
#   - Check for uncommitted branches
# Output CSV:
#   repo_name, owner, visibility, last_commit, needs_transfer
# Flag repos for transfer
```

---

#### `dependency-graph.py`
**Purpose:** Visualize issue dependencies
**Why Script:** Graph analysis, generates visual output (SVG/PNG)
**Usage:**
```bash
python scripts/dependency-graph.py --project 7 --output deps.svg
```

**What it does:**
```python
# Parse issue bodies for "BLOCKED BY" / "BLOCKS" keywords
# Build dependency graph (NetworkX)
# Identify critical path
# Generate visual graph (Graphviz)
# Detect circular dependencies
# Output: SVG diagram + critical path report
```

---

#### `metrics-dashboard.py`
**Purpose:** Generate org-wide metrics
**Why Script:** Heavy data processing, generates HTML/charts
**Usage:**
```bash
python scripts/metrics-dashboard.py --output dashboard.html
```

**What it does:**
```python
# Collect metrics:
#   - Issues created/closed per week
#   - Average time to close
#   - Discussion activity
#   - PR merge rate
#   - Repo activity (commits per repo)
# Generate charts (matplotlib/plotly)
# Output: Interactive HTML dashboard
```

---

#### `stale-cleanup.sh`
**Purpose:** Automatically close/label stale issues
**Why Script:** Scheduled automation (cron), rule-based decisions
**Usage:**
```bash
# Run nightly via cron
0 2 * * * /scripts/stale-cleanup.sh
```

**What it does:**
```bash
#!/bin/bash
# Find issues with no activity in 60+ days
# If issue has 'stale' label for 7 days:
#   - Close issue with comment
# Else:
#   - Add 'stale' label
#   - Comment: "This issue will close in 7 days"
# Output: Log file with actions taken
```

---

#### `build-validation.sh`
**Purpose:** Run ISO build validation (Issues #8, #16)
**Why Script:** CI integration, long-running process
**Usage:**
```bash
./scripts/build-validation.sh --tier 1 --issue 8
```

**What it does:**
```bash
#!/bin/bash
# Clone acreetionos and arch-iso repos
# Run ISO build for KDE/XFCE/GNOME
# Capture build logs
# If build succeeds:
#   - Comment on issue with success + logs
#   - Update issue checklist
# If build fails:
#   - Open new issue with failure details
#   - Block archival milestone
# Output: Build logs + issue updates
```

---

#### `weekly-report-generator.py`
**Purpose:** Generate detailed weekly report with metrics
**Why Script:** Can run on schedule, complex data aggregation
**Usage:**
```bash
# Run weekly via cron, post to discussion
0 9 * * MON python scripts/weekly-report-generator.py --post-discussion
```

**What it does:**
```python
# Collect last 7 days of activity:
#   - Issues created/closed
#   - PRs merged
#   - Discussion comments
#   - Milestone progress
# Generate markdown report
# Post to discussion thread (if --post-discussion)
# Email to maintainers (if --email)
# Output: Markdown report + metrics JSON
```

---

## Recommended Implementation Order

### Phase 1: Essential Slash Commands (Week 1)
Start with daily-use commands that provide immediate value:

1. **`/triage-summary`** - You'll use this every morning
2. **`/project-status 7`** - Track archival project progress
3. **`/milestone-summary "Pre-Archival Preparation"`** - Monitor current milestone

**Effort:** ~2 hours to implement all three
**Value:** High (daily use)

---

### Phase 2: Archival-Specific Tools (Week 2)
Build tools specific to the archival project:

**Slash Command:**
4. **`/archival-status`** - Custom project dashboard

**Scripts:**
5. **`repo-ownership-audit.py`** - Solve Issue #23
6. **`archive-repos-batch.sh`** - Execute archival safely

**Effort:** ~4 hours
**Value:** Critical for archival project success

---

### Phase 3: Advanced Analysis (Week 3)
Add deeper insights and automation:

**Slash Commands:**
7. **`/discussion-summary`** - Summarize community feedback
8. **`/find-blocking-issues`** - Critical path analysis

**Scripts:**
9. **`dependency-graph.py`** - Visualize issue dependencies
10. **`build-validation.sh`** - Automate validation checkpoints

**Effort:** ~6 hours
**Value:** Medium-High (reduces manual work)

---

### Phase 4: Ongoing Automation (Week 4+)
Set up maintenance automation:

**Scripts (Scheduled):**
11. **`stale-cleanup.sh`** - Nightly (cron)
12. **`weekly-report-generator.py`** - Weekly (cron)
13. **`sync-labels.sh`** - Monthly (cron)
14. **`metrics-dashboard.py`** - Weekly (cron)

**Effort:** ~8 hours (includes cron setup)
**Value:** Long-term maintenance reduction

---

## Technical Architecture

### Directory Structure
```
/Users/johnjunkins/GitHub/acreetion_os-Org/
├── .claude/
│   ├── commands/
│   │   ├── triage-summary.md
│   │   ├── project-status.md
│   │   ├── archival-status.md
│   │   └── discussion-summary.md
│   └── github-queries/
│       ├── triage-issues.graphql
│       ├── milestone-progress.graphql
│       └── project-items.graphql
├── scripts/
│   ├── bash/
│   │   ├── sync-labels.sh
│   │   ├── archive-repos-batch.sh
│   │   ├── build-validation.sh
│   │   └── stale-cleanup.sh
│   └── python/
│       ├── repo-ownership-audit.py
│       ├── dependency-graph.py
│       ├── metrics-dashboard.py
│       └── weekly-report-generator.py
└── config/
    ├── labels.json (standard label definitions)
    └── automation-config.yaml (cron schedules, settings)
```

---

### GraphQL Query Storage
Store reusable queries in `.claude/github-queries/`:

**`triage-issues.graphql`:**
```graphql
query TriageIssues($org: String!) {
  organization(login: $org) {
    repositories(first: 100) {
      nodes {
        name
        issues(first: 100, labels: ["triage"], states: OPEN) {
          nodes {
            number
            title
            milestone { title }
            labels(first: 10) { nodes { name } }
            body
          }
        }
      }
    }
  }
}
```

**`milestone-progress.graphql`:**
```graphql
query MilestoneProgress($owner: String!, $repo: String!, $milestone: Int!) {
  repository(owner: $owner, name: $repo) {
    milestone(number: $milestone) {
      title
      dueOn
      issues(first: 100) {
        totalCount
        nodes {
          number
          title
          state
          labels(first: 10) { nodes { name } }
        }
      }
    }
  }
}
```

---

### Caching Strategy
Avoid API rate limits by caching query results:

```bash
# Cache location
CACHE_DIR="/tmp/github-cache"
CACHE_TTL=300 # 5 minutes

# Cache function
cache_query() {
  local query_name=$1
  local cache_file="$CACHE_DIR/$query_name.json"

  # Return cached if fresh
  if [ -f "$cache_file" ] && [ $(($(date +%s) - $(stat -f %m "$cache_file"))) -lt $CACHE_TTL ]; then
    cat "$cache_file"
    return
  fi

  # Otherwise query and cache
  gh api graphql -f query="$(cat .claude/github-queries/$query_name.graphql)" > "$cache_file"
  cat "$cache_file"
}
```

---

## Integration with RAPID-AI Framework

Since you're using the RAPID-AI framework, slash commands can invoke specialized agents:

**Example: `/triage-summary` command**
```markdown
# .claude/commands/triage-summary.md

Use the Task tool to invoke the Explore agent with thoroughness level "medium".

Task: Find all issues with the 'triage' label across the AcreetionOS-Linux organization.

For each issue:
1. Extract the issue number, title, milestone
2. Search issue body for decision points (lines with 🔍)
3. Check if issue is blocking other issues (search for "BLOCKED BY")

Group results by milestone and output a markdown summary table.
```

This leverages your existing agent infrastructure!

---

## Next Steps

### Immediate Actions (This Week)
1. **Create 3 starter slash commands:**
   - `/triage-summary`
   - `/project-status`
   - `/archival-status`

2. **Create 2 essential scripts:**
   - `repo-ownership-audit.py` (solves Issue #23)
   - `archive-repos-batch.sh` (enables TIER 1 execution)

3. **Set up directory structure:**
   - `.claude/commands/` for slash commands
   - `.claude/github-queries/` for GraphQL templates
   - `scripts/bash/` and `scripts/python/` for automation

### Medium-Term (Next 2 Weeks)
4. Expand slash commands based on usage patterns
5. Add dependency graphing and build validation scripts
6. Set up cron jobs for weekly reporting

### Long-Term (Ongoing)
7. Build metrics dashboard
8. Implement stale issue automation
9. Create custom integrations (webhooks, CI/CD)

---

## Conclusion

**Key Insight:** GitHub CLI + GraphQL API + Claude Code = Powerful Org Management

**The Magic Combination:**
- **Slash Commands** for interactive, AI-assisted workflows (summaries, decisions, recommendations)
- **Scripts** for deterministic automation (batch operations, scheduled tasks, data processing)
- **RAPID-AI Agents** for complex exploration and planning tasks

**Expected Impact:**
- **Time Savings:** 60-80% reduction in manual GitHub UI navigation
- **Better Decisions:** AI-powered insights surface patterns you'd miss
- **Consistency:** Automated processes ensure standards are maintained
- **Visibility:** Real-time dashboards and reports keep team aligned

**Start small, iterate often.** Build the 3 essential slash commands this week, then expand based on what you find most valuable.

---

**Questions or want me to build any of these right now?** Let me know which commands/scripts would be most helpful for your immediate workflow!
