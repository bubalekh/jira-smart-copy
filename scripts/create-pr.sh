#!/bin/bash
# Quick PR creation script for jira-smart-copy project
# Usage: ./scripts/create-pr.sh "Description of changes"
# Or:    ./scripts/create-pr.sh [issue-number] "Description of changes"

DESCRIPTION="$1"
ISSUE_NUM=""
CURRENT_BRANCH=$(git branch --show-current)

# Check if first argument is a number (manual issue number)
if [[ "$1" =~ ^[0-9]+$ ]]; then
    ISSUE_NUM="$1"
    DESCRIPTION="$2"
fi

if [ "$CURRENT_BRANCH" = "main" ]; then
    echo "Error: Cannot create PR from main branch"
    exit 1
fi

# Try to extract issue number from branch name if not provided
if [ -z "$ISSUE_NUM" ]; then
    ISSUE_NUM=$(echo "$CURRENT_BRANCH" | grep -oE 'jsc-[0-9]+' | grep -oE '[0-9]+')
fi

# If still no issue number, get the next available one
if [ -z "$ISSUE_NUM" ]; then
    echo "📋 Fetching latest PR/issue numbers..."
    LAST_PR=$(gh pr list --state all --json number --jq 'map(.number) | max // 0')
    LAST_ISSUE=$(gh issue list --state all --json number --jq 'map(.number) | max // 0')
    LAST_NUM=$((LAST_PR > LAST_ISSUE ? LAST_PR : LAST_ISSUE))
    ISSUE_NUM=$((LAST_NUM + 1))
    
    echo "⚠️  No JSC number found in branch name"
    echo "📌 Suggested branch name: jsc-${ISSUE_NUM}-your-feature-name"
    echo "🔢 Using JSC-${ISSUE_NUM} for this PR"
    echo ""
    read -p "Continue with JSC-${ISSUE_NUM}? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi
fi

if [ -z "$DESCRIPTION" ]; then
    echo "Error: Description is required"
    echo "Usage: $0 \"Description of changes\""
    echo "   Or: $0 [issue-number] \"Description of changes\""
    exit 1
fi

TITLE="JSC-${ISSUE_NUM}: ${DESCRIPTION}"
BODY="Closes #${ISSUE_NUM}"

echo "Creating PR:"
echo "  Title: $TITLE"
echo "  Branch: $CURRENT_BRANCH → main"
echo ""

gh pr create \
    --title "$TITLE" \
    --body "$BODY" \
    --base main \
    --head "$CURRENT_BRANCH"
