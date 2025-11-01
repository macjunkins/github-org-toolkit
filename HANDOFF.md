# Handoff Document: GitHub Org Toolkit

**Date:** 2025-10-31
**Context:** Transition from planning to implementation
**User:** John Junkins (@macjunkins)
**Original Location:** `/Users/johnjunkins/.claude/`
**New Working Directory:** `/Users/johnjunkins/GitHub/github-org-toolkit`

---

## What This Repository Is

A **generic, reusable toolkit** for managing GitHub organizations efficiently using:
- **Slash commands** (Claude Code) for AI-assisted workflows
- **Scripts** (Bash/Python) for deterministic automation
- **GraphQL queries** for efficient GitHub API interaction
- **GitHub CLI (`gh`)** as the primary integration tool

**Philosophy:** "Slash Commands vs Scripts"
- **Slash Commands:** AI-assisted, interpretive (summaries, analysis, recommendations)
- **Scripts:** Deterministic, repeatable (batch operations, scheduled tasks)

---

## Conversation Summary

### How We Got Here

John joined the **AcreetionOS-Linux** organization and created a comprehensive plan to archive 75-79 of the org's 99 repositories. While working on this archival project, he identified opportunities to automate GitHub organization management.

He created two planning documents:
1. **`docs/planning/acreetionos-archival-recommendations.md`** - Archival strategy for AcreetionOS
2. **`docs/planning/github-automation-ideas.md`** - Comprehensive automation toolkit design

### Key Design Decisions

**Decision 1: Single Public Personal Repo**
- John maintains the toolkit in his personal GitHub account
- Generic enough for any organization to use
- Org-specific configs live in `examples/` or config files
- Organizations can fork, copy, or reference as needed

**Decision 2: Separate Generic vs Org-Specific Commands**
- **Generic commands** (`.claude/commands/generic/`): Work for ANY GitHub repo
- **Org-specific commands** (`.claude/commands/org-automation/`): Custom automation for specific workflows

**Decision 3: Integration with RAPID-AI Framework**
- Slash commands can invoke specialized agents (Explore, Plan, etc.)
- Leverage John's existing RAPID-AI infrastructure

---

## Repository Structure

```
github-org-toolkit/
├── .claude/
│   ├── commands/
│   │   ├── generic/              # ✅ COMPLETE - 9 GitHub workflow commands
│   │   │   ├── gh-work.md
│   │   │   ├── gh-finish.md
│   │   │   ├── gh-update-issue.md
│   │   │   ├── create-issue.md
│   │   │   ├── gh-review-issue.md
│   │   │   ├── gh-create-milestone.md
│   │   │   ├── gh-next-issue.md
│   │   │   ├── create-pr.md
│   │   │   └── review-pr.md
│   │   └── org-automation/       # ⏳ TO BUILD
│   │       ├── triage-summary.md
│   │       ├── project-status.md
│   │       ├── archival-status.md
│   │       ├── milestone-summary.md
│   │       ├── discussion-summary.md
│   │       ├── find-blocking-issues.md
│   │       └── weekly-report.md
│   └── github-queries/           # ⏳ TO BUILD
│       ├── triage-issues.graphql
│       ├── milestone-progress.graphql
│       └── project-items.graphql
├── scripts/
│   ├── bash/                     # ⏳ TO BUILD
│   │   ├── sync-labels.sh
│   │   ├── archive-repos-batch.sh
│   │   ├── build-validation.sh
│   │   └── stale-cleanup.sh
│   └── python/                   # ⏳ TO BUILD
│       ├── repo-ownership-audit.py
│       ├── dependency-graph.py
│       ├── metrics-dashboard.py
│       └── weekly-report-generator.py
├── config/
│   ├── config.example.yaml       # ⏳ TO CREATE - Template for users
│   └── labels.json               # ⏳ TO CREATE - Standard label definitions
├── examples/
│   └── acreetion-os/             # ⏳ TO CREATE - Example configs
│       ├── config.yaml
│       └── tier1-repos.txt
├── docs/
│   ├── planning/                 # ✅ COMPLETE
│   │   ├── acreetionos-archival-recommendations.md
│   │   └── github-automation-ideas.md
│   └── usage/                    # ⏳ TO CREATE
│       ├── slash-commands.md
│       └── scripts.md
├── HANDOFF.md                    # ✅ THIS FILE
└── README.md                     # ⏳ TO CREATE
```

---

## Current Progress

### ✅ Completed
1. Directory structure created
2. 9 generic GitHub workflow commands copied from global `.claude/commands/`
3. Planning documents moved to `docs/planning/`

### ⏳ Next Steps (Immediate)

**Phase 1: Essential Setup (This Session)**
1. Create `README.md` - Main documentation for the toolkit
2. Create `config/config.example.yaml` - Template configuration
3. Create `.gitignore` - Standard ignores
4. Initialize git repository (ask John first)

**Phase 2: First Org-Specific Commands (Next Session)**
Based on `docs/planning/github-automation-ideas.md`:
1. `/triage-summary` - Show issues needing decisions
2. `/project-status` - Summarize project board state
3. `/archival-status` - Custom command for archival project

**Phase 3: Critical Scripts (Week 1)**
1. `repo-ownership-audit.py` - **URGENT**: Solves AcreetionOS Issue #23 (blocks 5 other issues)
2. `archive-repos-batch.sh` - Enable TIER 1 execution with dry-run mode

---

## Context: The AcreetionOS Archival Project

**Critical Blocker:** Issue #23 (Audit and transfer personal repos to org ownership)
- Blocking 5 other issues in the archival project
- Must identify which repos are under personal vs org ownership
- Must determine which private repos need to be made public
- **Solution:** Build `repo-ownership-audit.py` first

**Project Timeline:**
- Week 1: Pre-archival preparation (IN PROGRESS, 1/7 issues complete)
- Week 2: TIER 1 archival (10 empty repos)
- Week 3: TIER 2 archival (custom PKGBUILDs evaluation)
- Week 4: Post-archival cleanup and docs

**Expected Impact of This Toolkit:**
- 60-80% reduction in manual GitHub UI navigation
- AI-powered pattern recognition (blocking issues, stale items)
- Consistent processes across organizations
- Real-time visibility into project health

---

## Technical Notes

### Caching Strategy
- Cache GitHub API responses to avoid rate limits
- Default TTL: 300 seconds (5 minutes)
- Cache location: `/tmp/github-cache/`

### Configuration Approach
- Generic scripts read from `config.yaml` (gitignored)
- Users copy `config.example.yaml` and customize
- Org-specific values (org name, repo lists) externalized

### GitHub CLI Preference
Per John's global `CLAUDE.md`:
- **Prefer `gh` CLI** over MCP GitHub tools (80-85% fewer tokens)
- Use for issues, PRs, repository management
- MCP tools only as fallback

### Error Handling Needed
- API rate limit exceeded
- Network failures
- Malformed responses
- Missing repos/issues

---

## User Preferences (from Global CLAUDE.md)

**Critical - Always Ask for Approval Before:**
- Committing code to version control
- Creating pull requests
- Closing GitHub issues
- Making destructive changes (deleting files, force push, etc.)
- Proceeding with non-trivial implementations
- Changing project configuration or dependencies

**Communication Style:**
- Explain WHY, not just WHAT
- Brief explanations preferred, but detailed when safety matters
- Challenge bad ideas politely
- No gaslighting - be honest and objective

**Development Philosophy:**
- "No one tool does it all. Orchestrate a stack. Own your flow."
- Build for personal use first, commercialize only if genuinely useful
- Documentation-first, systematic approaches

**Technical Preferences:**
- Primary languages: Dart/Flutter (but this project is Bash/Python)
- Version control: Git Flow (main → dev → feature branches)
- Always use relative paths
- Prefer `gh` CLI over MCP tools for GitHub operations

---

## Questions for Next Session

1. **Git initialization:** Should we initialize the repo now or wait?
2. **Repository visibility:** Make it public immediately or keep private initially?
3. **License:** MIT? Apache 2.0? Unlicense? Other?
4. **First priority:** Build org-specific commands or scripts first?
5. **AcreetionOS urgency:** Should we prioritize `repo-ownership-audit.py` to unblock Issue #23?

---

## Next Claude Instance: What You Need to Know

**Current Working Directory:** `/Users/johnjunkins/GitHub/github-org-toolkit`

**Immediate Tasks:**
1. Review this HANDOFF.md and the planning docs in `docs/planning/`
2. Ask John which Phase 1 item to tackle first
3. Create README.md for the project
4. Optionally: Create config templates, .gitignore, initialize git

**Available Resources:**
- **Generic commands:** 9 slash commands in `.claude/commands/generic/` (ready to use)
- **Planning docs:** `docs/planning/github-automation-ideas.md` (detailed automation strategy)
- **Archival context:** `docs/planning/acreetionos-archival-recommendations.md` (AcreetionOS project details)

**User Expectation:**
John wants to start building the automation tools to unblock the AcreetionOS archival project. He's ready to work but will need to approve:
- Commits and PRs
- Major implementation decisions
- Destructive operations
- Configuration changes

**Tone:**
- Friendly but honest
- Challenge bad ideas when appropriate
- Explain WHY, not just WHAT
- Brief explanations unless safety matters

---

## Key Principle: Who Uses This Toolkit?

**Primary User:** John (@macjunkins)
- Managing AcreetionOS-Linux organization
- Personal productivity tool

**Secondary Users:** Anyone managing GitHub organizations
- Can fork/copy this toolkit
- Customize configs in `examples/` or `config.yaml`
- Contribute improvements back via PRs

**Design Goal:** Generic enough to be useful for any org, specific enough to solve real problems immediately.

---

## What Makes This Different from Existing Tools?

**Existing GitHub Tools:**
- GitHub Web UI: Slow, doesn't scale for 99+ repos
- GitHub CLI (`gh`): Powerful but imperative, no AI assistance
- GitHub Actions: Great for CI/CD, not for interactive workflows
- GitHub Projects: Good for boards, poor for cross-repo analysis

**This Toolkit:**
- **AI-assisted decision making** (slash commands)
- **Deterministic automation** (scripts)
- **Token-efficient** (prefers `gh` CLI over MCP)
- **Integrated with Claude Code** (leverages RAPID-AI framework)
- **Multi-layered approach** (human + AI + automation)

---

**Good luck! This is a solid project with clear value. Let's build something useful.** 🚀

**First step:** Read the planning docs, then ask John what to build first.
