#!/bin/bash
# Start new feature/fix workflow for jira-smart-copy project
# Usage: ./scripts/start-work.sh "Brief description of the work"

DESCRIPTION="$1"

if [ -z "$DESCRIPTION" ]; then
    echo "Error: Description is required"
    echo "Usage: $0 \"Brief description of the work\""
    exit 1
fi

# Ensure we're on main and up to date
echo "📥 Updating main branch..."
git checkout main
git pull origin main

# Get next JSC number
echo "📋 Fetching latest PR numbers..."
LAST_PR=$(gh pr list --state all --json number --jq 'map(.number) | max // 0')
NEXT_NUM=$((LAST_PR + 1))

echo ""
echo "🔢 Next JSC number: JSC-${NEXT_NUM}"
echo "📝 Description: ${DESCRIPTION}"
echo ""

# Create branch name from description (lowercase, replace spaces with dashes)
BRANCH_SUFFIX=$(echo "$DESCRIPTION" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-$//')
BRANCH_NAME="jsc-${NEXT_NUM}-${BRANCH_SUFFIX}"

echo "🌿 Branch name: ${BRANCH_NAME}"
echo ""

# Create and checkout branch
echo "🌿 Creating branch ${BRANCH_NAME}..."
git checkout -b "${BRANCH_NAME}"

# Create initial commit to enable PR creation
echo "📝 Creating initial commit..."
git commit --allow-empty -m "chore(jsc-${NEXT_NUM}): initialize work on ${DESCRIPTION}"
git push -u origin "${BRANCH_NAME}"

# Create draft PR
echo "📋 Creating draft PR..."
PR_URL=$(gh pr create \
    --title "JSC-${NEXT_NUM}: ${DESCRIPTION}" \
    --body "## Description

${DESCRIPTION}

## Tasks

- [ ] Implement changes
- [ ] Update documentation (if needed)
- [ ] Test changes

## Acceptance Criteria

_To be defined_
" \
    --draft \
    --base main)

echo "✅ Draft PR created: ${PR_URL}"
echo ""
echo "✨ Ready to work on JSC-${NEXT_NUM}!"
echo ""
echo "Next steps:"
echo "  1. Make your changes"
echo "  2. Commit: git commit -m \"feat(jsc-${NEXT_NUM}): your changes\""
echo "  3. Push: git push"
echo "  4. Mark as ready: gh pr ready"
echo ""
