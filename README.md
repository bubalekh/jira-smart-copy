# Jira Smart Copy

Chrome extension for copying Jira task IDs and summaries in various formats.

## 📁 Project Structure

```
jira-smart-copy/
├── .github/
│   └── workflows/
│       └── release.yml          # GitHub Actions workflow for releases
├── assets/
│   └── icon.png                 # Extension icon
├── docs/
│   ├── README.md                # Project documentation
│   ├── DEVELOPMENT.md           # Development workflow guidelines
│   └── CHROME_STORE_SETUP.md    # Chrome Web Store setup guide
├── src/
│   ├── constants.js             # Shared constants and configuration
│   ├── locales.js               # Internationalization strings
│   ├── content.js               # Content script (runs on Jira pages)
│   ├── popup.html               # Extension popup UI
│   └── popup.js                 # Popup logic
├── manifest.json                # Chrome extension manifest
└── .gitignore                   # Git ignore rules
```

## Features

- 📋 Copy Jira task ID with one click (Cmd+C / Ctrl+C)
- 🔗 Multiple format support: Markdown, Slack, Plain text, HTML
- 🌍 Multilingual: English, Français, Русский
- ⚡ Smart mode: Copy only Task ID or Task ID + Summary

## Installation

### From Source

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the project directory

### From Release

1. Download the latest release from [Releases](https://github.com/bubalekh/jira-smart-copy/releases)
2. Unzip the file
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable "Developer mode"
5. Click "Load unpacked" and select the unzipped folder

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

## Development

See [DEVELOPMENT.md](docs/DEVELOPMENT.md) for development workflow guidelines.

## Contributing

1. Fork the repository
2. Create a feature branch following [development guidelines](docs/DEVELOPMENT.md)
3. Make your changes
4. Submit a pull request

## License

MIT

## Links

- [Documentation](docs/README.md)
- [Development Guide](docs/DEVELOPMENT.md)
- [Chrome Store Setup](docs/CHROME_STORE_SETUP.md)
- [Releases](https://github.com/bubalekh/jira-smart-copy/releases)
