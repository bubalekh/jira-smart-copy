# Jira Smart Copy

Chrome extension for copying Jira task IDs and summaries in various formats.

## Features

- 📋 Copy Jira task ID with one click (Cmd+C / Ctrl+C)
- 🔗 Multiple format support: Markdown, Slack, Plain text, HTML
- 🌍 Multilingual: English, Français, Русский
- ⚡ Smart mode: Copy only Task ID or Task ID + Summary

## Installation

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension directory

## Usage

1. Navigate to any Jira issue page
2. Press `Cmd+C` (Mac) or `Ctrl+C` (Windows/Linux)
3. The task ID (and summary if enabled) will be copied in your selected format

## Configuration

Click the extension icon to configure:
- **Link format**: Choose between Markdown, Slack, Plain text, or HTML
- **What to copy**: Only Task ID or Task ID + Summary
- **Language**: Select your preferred language

## Supported Formats

- **Markdown**: `[TASK-123](https://jira.example.com/browse/TASK-123)`
- **Slack**: `<https://jira.example.com/browse/TASK-123|TASK-123>`
- **Plain**: `TASK-123`
- **HTML**: `<a href="https://jira.example.com/browse/TASK-123">TASK-123</a>`

## License

MIT
