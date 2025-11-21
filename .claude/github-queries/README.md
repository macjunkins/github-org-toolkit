# GitHub GraphQL Query Library

Reusable GraphQL query templates for efficient GitHub organization management.

## Overview

This directory contains pre-built GraphQL queries optimized for common GitHub organization tasks. These queries are designed to work with the GitHub CLI (`gh`) and provide efficient, token-optimized data fetching.

### Why GraphQL?

- **Efficient**: Fetch exactly the data you need in a single request
- **Fast**: Reduce API calls by 60-80% compared to REST API
- **Flexible**: Use variables for different organizations/projects
- **Cached**: Results can be cached to avoid rate limits

## Available Queries

| Query | Purpose | Primary Use Case |
|-------|---------|------------------|
| `triage-issues.graphql` | Find all issues needing decisions | Daily triage workflow |
| `milestone-progress.graphql` | Track milestone completion | Status reporting |
| `project-status.graphql` | Get project board state | Project management |
| `repo-list.graphql` | List all org repositories | Repository audits |

---

## Usage

### Basic Pattern

All queries follow this pattern:

```bash
gh api graphql -f query="$(cat .claude/github-queries/<query-name>.graphql)" \
  -F variable1="value1" \
  -F variable2="value2"
```

### With JSON Output Processing

Use `jq` to process JSON output:

```bash
gh api graphql -f query="$(cat .claude/github-queries/<query-name>.graphql)" \
  -F org="YourOrgName" \
  | jq '.data.organization.repositories.nodes[] | select(.issues.nodes | length > 0)'
```

---

## Query Details

### 1. Triage Issues

**File:** `triage-issues.graphql`

**Purpose:** Find all open issues labeled with 'triage' across the organization.

**Variables:**
- `org` (String, required): Organization name
- `first` (Int, optional): Number of repositories to fetch (default: 50)
- `issueFirst` (Int, optional): Number of issues per repository (default: 20)

**Example:**
```bash
gh api graphql -f query="$(cat .claude/github-queries/triage-issues.graphql)" \
  -F org="YourOrgName" \
  -F first=50 \
  -F issueFirst=20
```

**Use Cases:**
- Daily triage workflow (`/triage-summary` command)
- Finding issues needing decisions
- Identifying blocking issues

**Output Includes:**
- Issue number, title, body, state
- Labels, milestone, timestamps
- Repository name
- Author and comment count

---

### 2. Milestone Progress

**File:** `milestone-progress.graphql`

**Purpose:** Track progress of a specific milestone across all repositories.

**Variables:**
- `org` (String, required): Organization name
- `milestoneTitle` (String, required): Milestone title to search for
- `first` (Int, optional): Number of repositories to fetch (default: 50)

**Example:**
```bash
gh api graphql -f query="$(cat .claude/github-queries/milestone-progress.graphql)" \
  -F org="YourOrgName" \
  -F milestoneTitle="v1.1-phase-2-org-automation"
```

**Use Cases:**
- Milestone status reporting (`/milestone-summary` command)
- Sprint/release planning
- Deadline tracking

**Output Includes:**
- Total issues (open/closed)
- Issue details with labels
- Due date and description
- Repository name

---

### 3. Project Status

**File:** `project-status.graphql`

**Purpose:** Get the current state of a GitHub Projects V2 board.

**Variables:**
- `org` (String, required): Organization name
- `projectNumber` (Int, required): Project number (from project URL)

**Example:**
```bash
gh api graphql -f query="$(cat .claude/github-queries/project-status.graphql)" \
  -F org="YourOrgName" \
  -F projectNumber=18
```

**Use Cases:**
- Project status updates (`/project-status` command)
- Board health monitoring
- Sprint reviews

**Output Includes:**
- Project title, description, URL
- All items (issues/PRs) with status
- Field values (status, priority, etc.)
- Assignees and labels

---

### 4. Repository List

**File:** `repo-list.graphql`

**Purpose:** Fetch all repositories in an organization with comprehensive metadata.

**Variables:**
- `org` (String, required): Organization name
- `first` (Int, optional): Number of repositories to fetch (default: 100)

**Example:**
```bash
gh api graphql -f query="$(cat .claude/github-queries/repo-list.graphql)" \
  -F org="YourOrgName" \
  -F first=100
```

**Use Cases:**
- Repository ownership audits
- Archive status tracking (`/archival-status` command)
- Organization inventory

**Output Includes:**
- Name, description, visibility
- Archive/fork/template status
- Language, stars, forks
- Open issues/PRs count
- License and topics

---

## Advanced Usage

### Caching Results

Cache query results to avoid rate limits:

```bash
#!/bin/bash
CACHE_DIR="/tmp/github-cache"
CACHE_FILE="$CACHE_DIR/triage-issues.json"
CACHE_TTL=300  # 5 minutes

mkdir -p "$CACHE_DIR"

# Check if cache exists and is fresh
if [ -f "$CACHE_FILE" ] && [ $(($(date +%s) - $(stat -c %Y "$CACHE_FILE"))) -lt $CACHE_TTL ]; then
  cat "$CACHE_FILE"
else
  gh api graphql -f query="$(cat .claude/github-queries/triage-issues.graphql)" \
    -F org="YourOrgName" | tee "$CACHE_FILE"
fi
```

### Pagination

Handle pagination for large result sets:

```bash
#!/bin/bash
ORG="YourOrgName"

# Note: The current queries use the 'first' parameter to limit results.
# For pagination beyond the initial fetch, you would need to:
# 1. Modify the query to accept an 'after' cursor parameter
# 2. Add pagination logic as shown below

# Example of what pagination would look like (requires query modification):
CURSOR=""
RESULT=$(gh api graphql -f query="$(cat .claude/github-queries/repo-list.graphql)" -F org="$ORG")

# Extract results
echo "$RESULT" | jq '.data.organization.repositories.nodes[]'

# Check if more pages exist
HAS_NEXT=$(echo "$RESULT" | jq -r '.data.organization.repositories.pageInfo.hasNextPage')
if [ "$HAS_NEXT" = "true" ]; then
  CURSOR=$(echo "$RESULT" | jq -r '.data.organization.repositories.pageInfo.endCursor')
  echo "More results available. Next cursor: $CURSOR"
  echo "To fetch next page, modify the query to accept 'after: \$cursor' parameter"
fi
```

### Error Handling

Check for GraphQL errors:

```bash
RESULT=$(gh api graphql -f query="$(cat .claude/github-queries/triage-issues.graphql)" -F org="YourOrgName")

# Check if response contains errors
if echo "$RESULT" | jq -e '.errors' > /dev/null 2>&1; then
  echo "GraphQL Error:" >&2
  echo "$RESULT" | jq '.errors' >&2
  exit 1
fi

# Process successful result
echo "$RESULT" | jq '.data'
```

---

## Integration with Slash Commands

These queries are designed to be used by slash commands:

```bash
# Example: /triage-summary command
gh api graphql -f query="$(cat .claude/github-queries/triage-issues.graphql)" \
  -F org="$(yq -r '.organization' config/config.yaml)" \
  | jq '.data.organization.repositories.nodes[] | 
        select(.issues.nodes | length > 0) |
        {repo: .name, issues: [.issues.nodes[] | 
        {number, title, labels: [.labels.nodes[].name]}]}'
```

---

## Performance Tips

1. **Use caching**: Cache results for 5-10 minutes to avoid rate limits
2. **Limit results**: Use `first` parameter to fetch only what you need
3. **GraphQL over REST**: GraphQL reduces API calls by 60-80%
4. **Batch queries**: Combine multiple queries when possible
5. **Monitor rate limits**: Use `gh api rate_limit` to check remaining quota

### Rate Limit Check

```bash
gh api rate_limit --jq '.resources.graphql'
```

Expected output:
```json
{
  "limit": 5000,
  "remaining": 4987,
  "reset": 1701234567,
  "used": 13
}
```

---

## Troubleshooting

### Common Issues

**Issue:** "Could not resolve to an Organization with the login 'X'"
- **Solution:** Check organization name spelling, ensure you have access

**Issue:** "Rate limit exceeded"
- **Solution:** Implement caching, wait until reset time, or upgrade to GitHub Enterprise

**Issue:** "Parse error on '<query>'"
- **Solution:** Ensure query file has no syntax errors, check for missing variables

**Issue:** "Field 'X' doesn't exist on type 'Y'"
- **Solution:** Check GitHub GraphQL schema, field may have been renamed/removed

### Debug Mode

Enable verbose output:

```bash
GH_DEBUG=api gh api graphql -f query="$(cat .claude/github-queries/triage-issues.graphql)" -F org="YourOrgName"
```

---

## GitHub GraphQL Resources

- **Official Docs**: [docs.github.com/graphql](https://docs.github.com/en/graphql)
- **GraphQL Explorer**: [docs.github.com/graphql/overview/explorer](https://docs.github.com/en/graphql/overview/explorer)
- **Schema Reference**: [docs.github.com/graphql/reference](https://docs.github.com/en/graphql/reference)
- **GitHub CLI Docs**: [cli.github.com/manual](https://cli.github.com/manual/)

---

## Contributing

### Adding New Queries

1. Create a new `.graphql` file in this directory
2. Add header comments with:
   - Description
   - Required variables with types
   - Usage example
   - Output description
3. Test query with real data
4. Document in this README
5. Add usage example

### Query Template

```graphql
# Query: <Name>
# Description: <What it does>
#
# Required Variables:
#   - var1: Type! (Description)
#   - var2: Type (Description, default: X)
#
# Usage Example:
#   gh api graphql -f query="$(cat .claude/github-queries/<name>.graphql)" \
#     -F var1="value1" \
#     -F var2="value2"
#
# Output: <What data is returned>

query QueryName($var1: Type!, $var2: Type = defaultValue) {
  # Query body
}
```

---

## License

MIT License - See [LICENSE](../../LICENSE) for details.
