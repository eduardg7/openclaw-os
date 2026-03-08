# OpenClaw OS - User Guide

## 🚀 Getting Started

### What is OpenClaw OS?

OpenClaw OS is a personal operating system for AI agents. It provides a web-based mission control dashboard to manage, monitor, and coordinate your AI workforce.

### Prerequisites

Before installing OpenClaw OS, ensure you have:

- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **OpenClaw** installed and running ([OpenClaw Docs](https://docs.openclaw.ai))
- **Git** for cloning the repository

### Installation

#### Option 1: Quick Start (Recommended for First-Time Users)

```bash
# Clone the repository
git clone https://github.com/eduardg7/openclaw-os.git
cd openclaw-os

# Install dependencies
npm install

# Start the application
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and follow the onboarding wizard.

#### Option 2: Docker (Production Deployment)

```bash
# Clone the repository
git clone https://github.com/eduardg7/openclaw-os.git
cd openclaw-os

# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f
```

Access the app at [http://localhost:3000](http://localhost:3000)

---

## 📖 Using OpenClaw OS

### Onboarding

When you first start OpenClaw OS, you'll go through a 6-step setup wizard:

1. **Welcome** - Introduction to OpenClaw OS
2. **Theme** - Choose light, dark, or system theme
3. **Detection** - Automatic OpenClaw installation detection
4. **Agents** - Configure agent preferences
5. **Project** - Set default project view
6. **Complete** - Ready to use!

### Dashboard

The main dashboard shows:

- **Agents**: Number of active AI agents
- **Active Tasks**: Tasks currently in progress
- **Completed Today**: Sessions/tasks completed today
- **Avg Response**: Average response time

**Recent Activity** shows the latest agent actions and task updates.

**Quick Actions** provide shortcuts to:
- Configure settings
- View documentation

### Agents Page

View all your AI agents with:

- Agent name and ID
- Enabled/Disabled status
- Heartbeat configuration
- Active session count

Use the **Refresh** button to update the agent list.

### Tasks Page

Track tasks across all projects:

- Task title and status
- Project association
- Priority level

### Settings

Configure OpenClaw OS:

- **OpenClaw Path**: Path to your OpenClaw installation
- **Gateway URL**: OpenClaw Gateway API endpoint

Changes are saved automatically with visual confirmation.

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
# OpenClaw Gateway URL (optional - auto-detected)
OPENCLAW_GATEWAY_URL=http://localhost:3100

# OpenClaw data directory (optional - auto-detected)
OPENCLAW_DATA_DIR=~/.openclaw

# Node environment
NODE_ENV=development
```

### Configuration File

OpenClaw OS stores configuration in:

```
~/.openclaw/os-config.json
```

This file is created during onboarding and can be edited manually if needed.

---

## 🐳 Docker Deployment

### Quick Start

```bash
docker-compose up -d
```

### Environment Variables in Docker

Edit `docker-compose.yml` to customize:

```yaml
environment:
  - OPENCLAW_GATEWAY_URL=http://host.docker.internal:3100
  - OPENCLAW_DATA_DIR=/data
volumes:
  - ${OPENCLAW_DATA_DIR:-~/.openclaw}:/data:ro
```

### Building Custom Image

```bash
docker build -t openclaw-os .
docker run -p 3000:3000 openclaw-os
```

---

## 🛠️ Troubleshooting

### "Configuration Required" after onboarding

**Cause**: Onboarding completion not detected

**Solution**:
1. Check `~/.openclaw/os-config.json` exists
2. Verify `onboardingComplete: true` in the file
3. Clear browser cache and reload

### "Failed to fetch stats" error

**Cause**: OpenClaw Gateway not running or unreachable

**Solution**:
1. Verify OpenClaw is running: `openclaw status`
2. Check Gateway URL in Settings
3. Ensure Gateway is accessible at `http://localhost:3100`

### Agents not showing up

**Cause**: No agents configured in OpenClaw

**Solution**:
1. Check `~/.openclaw/agents/` directory exists
2. Verify you have agents configured
3. Restart OpenClaw OS

### Docker can't connect to Gateway

**Cause**: Docker network isolation

**Solution**:
1. Use `host.docker.internal` instead of `localhost`
2. Ensure `extra_hosts` is configured in `docker-compose.yml`

### npm install fails

**Cause**: Node version incompatible

**Solution**:
1. Verify Node.js version: `node --version` (should be 18+)
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` and reinstall

---

## 📊 Advanced Usage

### Custom Themes

OpenClaw OS supports light/dark themes:

- **Light**: Clean and bright interface
- **Dark**: Easy on the eyes for long sessions
- **System**: Automatically matches your device theme

Change theme in Settings or during onboarding.

### API Endpoints

OpenClaw OS provides REST API endpoints:

```
GET /api/openclaw/agents     - List all agents
GET /api/openclaw/sessions   - Recent sessions
GET /api/openclaw/tasks      - Tasks from TASK_DB
POST /api/config             - Save configuration
GET /api/config              - Get configuration
```

### Integration with OpenClaw

OpenClaw OS automatically integrates with:

- **Agents**: Reads from `~/.openclaw/agents/`
- **Sessions**: Fetches from OpenClaw Gateway
- **Tasks**: Reads from OpenClaw TASK_DB

---

## 🆘 Getting Help

### Documentation

- [OpenClaw Docs](https://docs.openclaw.ai)
- [GitHub Repository](https://github.com/eduardg7/openclaw-os)
- [Contributing Guide](./.github/CONTRIBUTING.md)

### Community

- [Discord Community](https://discord.com/invite/clawd)
- [GitHub Issues](https://github.com/eduardg7/openclaw-os/issues)

### Reporting Bugs

Found a bug? Please open an issue:

1. Go to [GitHub Issues](https://github.com/eduardg7/openclaw-os/issues/new)
2. Use the bug report template
3. Include steps to reproduce
4. Add screenshots if applicable

---

## 🔒 Security

### Best Practices

- Never commit `.env.local` files
- Use HTTPS in production
- Keep dependencies updated: `npm audit`
- Restrict access to your OpenClaw instance

### Reporting Security Issues

**Do not** open public issues for security vulnerabilities.

Email: security@openclaw.ai

---

## 📝 License

OpenClaw OS is open-source software licensed under the [MIT License](./LICENSE).

---

Built with ❤️ for the OpenClaw community
