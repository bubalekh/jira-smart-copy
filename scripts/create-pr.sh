#!/bin/bash
# Quick PR creation script for jira-smart-copy project
# Usage: ./scripts/create-pr.sh "Title of PR" "Description"

TITLE="$1"
DESCRIPTION="$2"
CURRENT_BRANCH=$(git branch --show-current)

if [ -z "$TITLE" ]; then
    echo "Error: PR title is required"
    echo "Usage: $0 \"Title\" \"Description\""
    exit 1
fi

if [ "$CURRENT_BRANCH" = "main" ]; then
    echo "Error: Cannot create PR from main branch"
    exit 1
fi

# Extract issue number from branch name (e.g., jsc-1-feature -> 1)
ISSUE_NUM=$(echo "$CURRENT_BRANCH" | grep -oP 'jsc-\K\d+')

BODY="$DESCRIPTION"

if [ -n "$ISSUE_NUM" ]; then
    BODY="$BODY

Closes #$ISSUE_NUM"
fi

gh pr create \
    --title "$TITLE" \
    --body "$BODY" \
    --base main \
    --head "$CURRENT_BRANCH"
