# Configure GitHub Issue Relationships

Configure blocking/blocked-by dependencies between GitHub issues using GitHub's native GraphQL API.

## Instructions

### 1. Fetch Open Issues and Node IDs

```bash
gh api '/repos/{owner}/{repo}/issues?state=open&per_page=100' --jq '.[] | {number: .number, title: .title, id: .id, node_id: .node_id}'
```

Store issue numbers, titles, and node IDs (required for GraphQL).

### 2. Analyze Issues to Infer Dependencies

Read each issue:
```bash
gh issue view <number> --json number,title,body,labels,milestone
```

**Identify foundation issues** (block others):
- Configuration/infrastructure systems
- GraphQL/API libraries
- Authentication frameworks
- Titles containing: "configuration", "setup", "library", "framework"

**Identify dependent issues** (blocked by foundations):
- Commands/scripts that use infrastructure
- Features requiring configuration
- Issues mentioning other issues' deliverables

**Identify documentation issues** (blocked by implementations):
- Titles containing "documentation", "docs", "README"
- Bodies referencing "all commands", "all scripts", "all features"

### 3. Present Relationship Map

Show inferred relationships in structured format:

```
═══════════════════════════════════════
INFERRED ISSUE RELATIONSHIPS
═══════════════════════════════════════

FOUNDATION (No dependencies):
  #8: Configuration System
  #10: GraphQL Query Library

IMPLEMENTATION:
  #1: Feature A ← Blocked by: #8, #10
  #2: Feature B ← Blocked by: #8, #10
  #4: Feature C ← Blocked by: #8

DOCUMENTATION:
  #9: Docs ← Blocked by: #1, #2, #4, #8

SUMMARY: {N} relationships to configure
═══════════════════════════════════════
```

Explain rationale for each relationship based on issue content.

### 4. Get Approval

**Ask:** "Should I configure these blocking relationships using GitHub's GraphQL API?"

**Wait for explicit approval:** "yes", "proceed", "go ahead"

Do NOT proceed without approval.

### 5. Configure Relationships

Execute GraphQL mutations for each blocking relationship:

```bash
gh api graphql -f query='
mutation {
  addBlockedBy(input: {
    issueId: "{blocked_issue_node_id}"
    blockingIssueId: "{blocking_issue_node_id}"
  }) {
    issue { number }
    blockingIssue { number }
  }
}'
```

**Execute mutations efficiently:**
- Group related mutations together
- Report progress: "✓ Configured issue #1 blocked by #8, #10"
- Handle errors gracefully, continue with remaining relationships

### 6. Verify Configuration

Query to confirm relationships:

```bash
gh api graphql -f query='
query {
  repository(owner: "{owner}", name: "{repo}") {
    issues(first: 100, states: OPEN) {
      nodes {
        number
        title
        blockedBy(first: 10) {
          totalCount
          nodes { number }
        }
        blocking(first: 10) {
          totalCount
          nodes { number }
        }
      }
    }
  }
}'
```

### 7. Display Success Summary

```
✅ CONFIGURED {N} RELATIONSHIPS

Foundation:
  #8 → Blocks: #1, #2, #4, #9
  #10 → Blocks: #1, #2

Implementation:
  #1 ← Blocked by: #8, #10
  #2 ← Blocked by: #8, #10

Next: Work on foundation issues (#8, #10) first
```

## Relationship Inference Logic

- **Foundation indicators:** Config systems, libraries, frameworks, infrastructure
- **Dependency indicators:** Issue A uses technology from Issue B, references B's deliverables
- **Documentation indicators:** Documents "all features", should be last
- **Validation:** Check for circular dependencies before configuring

## Tool Preferences

- Use `gh api` for REST and GraphQL operations
- REST API: Fetch issues with node IDs
- GraphQL API: Configure relationships with `addBlockedBy` mutations
- Automatic repo detection via git context

## API Constraints

- Max 50 blocking relationships per issue
- Max 50 blocked-by relationships per issue
- Cannot create circular dependencies
- Relationships are bidirectional (setting "blocked by" auto-sets "blocking")

## Error Handling

- Auth error → Run `gh auth login`
- Invalid node ID → Re-fetch issue node IDs
- Circular dependency → Remove circular references from relationship map
- Rate limit → Add delays between mutations
