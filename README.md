# OpenClaw OS

<div align="center">

**Personal Operating System for AI Agents**

Plug-and-play mission control for your AI workforce

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/eduardg7/openclaw-os/blob/main/LICENSE)
[![Node](https://img.shields.io/badge/node-18%2B-green.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black.svg)](https://nextjs.org/)
[![Security](https://img.shields.io/badge/Security-0%20Vulnerabilities-brightgreen.svg)](https://github.com/eduardg7/openclaw-os/security)
[![GitHub Release](https://img.shields.io/github/v/release/eduardg7/openclaw-os)](https://github.com/eduardg7/openclaw-os/releases/latest)
[![GitHub Stars](https://img.shields.io/github/stars/eduardg7/openclaw-os?style=social)](https://github.com/eduardg7/openclaw-os/stargazers)

[Getting Started](#-quick-start) • [Documentation](https://eduardg7.github.io/openclaw-os) • [Demo](#-demo-screenshots) • [Contributing](./.github/CONTRIBUTING.md) • [Community](#-community)

</div>

---

## Overview

OpenClaw OS provides a unified dashboard to manage, monitor, and coordinate your AI agents. Connect to your OpenClaw instance and get real-time insights into your AI workforce.

### Key Features

- 🤖 **Agent Management** - View and manage all AI agents with real-time sync
- 📊 **Mission Control Dashboard** - Live stats, activity feed, and quick actions
- 📋 **Task Tracking** - Monitor tasks across all projects with status updates
- 🔄 **OpenClaw Integration** - Seamless sync with your OpenClaw instance
- 🎨 **Modern UI** - Clean, responsive interface with dark mode support
- ⚡ **Zero Config** - Auto-detect OpenClaw, works out of the box
- 🐳 **Docker Ready** - Production deployment with one command
- 🔒 **Secure** - 0 vulnerabilities, branch protection, security best practices

---

## 📖 Documentation

| Resource | Description |
|----------|-------------|
| **[User Guide](https://eduardg7.github.io/openclaw-os/USER-GUIDE)** | Complete usage documentation |
| **[API Reference](https://eduardg7.github.io/openclaw-os/api)** | API endpoints and integration |
| **[Contributing](./.github/CONTRIBUTING.md)** | How to contribute to the project |
| **[Changelog](./CHANGELOG.md)** | Version history and releases |
| **[Security](./SECURITY.md)** | Security policy and reporting |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- OpenClaw installed and running

### Install

```bash
# Clone the repository
git clone https://github.com/eduardg7/openclaw-os.git
cd openclaw-os

# Install dependencies
npm install

# Start the app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and follow the onboarding wizard.

### Configuration

The app will automatically detect your OpenClaw installation and sync your agents.

You can customize settings in the UI or via environment variables:

```bash
# Optional: Custom OpenClaw Gateway URL
OPENCLAW_GATEWAY_URL=http://localhost:3100

# Optional: Custom data directory
OPENCLAW_DATA_DIR=~/.openclaw
```

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

---

## 📊 Stats & Badges

| Category | Badge |
|----------|-------|
| **Version** | [![GitHub Release](https://img.shields.io/github/v/release/eduardg7/openclaw-os)](https://github.com/eduardg7/openclaw-os/releases/latest) |
| **License** | [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/eduardg7/openclaw-os/blob/main/LICENSE) |
| **Node** | [![Node](https://img.shields.io/badge/node-18%2B-green.svg)](https://nodejs.org) |
| **TypeScript** | [![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg)](https://www.typescriptlang.org/) |
| **Next.js** | [![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black.svg)](https://nextjs.org/) |
| **Security** | [![Security](https://img.shields.io/badge/Security-0%20Vulnerabilities-brightgreen.svg)](https://github.com/eduardg7/openclaw-os/security) |
| **CI/CD** | [![CI](https://github.com/eduardg7/openclaw-os/workflows/CI/badge.svg)](https://github.com/eduardg7/openclaw-os/actions/workflows/ci.yml) |
| **Docs** | [![Docs](https://github.com/eduardg7/openclaw-os/workflows/Deploy%20Docs/badge.svg)](https://github.com/eduardg7/openclaw-os/actions/workflows/docs.yml) |
| **Stars** | [![GitHub Stars](https://img.shields.io/github/stars/eduardg7/openclaw-os?style=social)](https://github.com/eduardg7/openclaw-os/stargazers) |
| **Forks** | [![GitHub Forks](https://img.shields.io/github/forks/eduardg7/openclaw-os?style=social)](https://github.com/eduardg7/openclaw-os/network/members) |

---

## 🎮 Demo Screenshots

<div align="center">

#### Onboarding Wizard
![Onboarding](https://via.placeholder.com/800x400/3b82f6/ffffff?text=OpenClaw+OS+Onboarding)

#### Mission Control Dashboard
![Dashboard](https://via.placeholder.com/800x400/1e293b/ffffff?text=Mission+Control+Dashboard)

#### Agent Management
![Agents](https://via.placeholder.com/800x400/1e293b/ffffff?text=Agent+Management)

#### Settings Page
![Settings](https://via.placeholder.com/800x400/ffffff/3b82f6?text=Settings+Configuration)

</div>

---

## 🛠️ Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Build documentation
npm run docs:build
```

---

## 🤝 Contributing

We love contributions! See [Contributing Guide](./.github/CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 👥 Community

- [Discord](https://discord.com/invite/clawd) - Join the community
- [GitHub Discussions](https://github.com/eduardg7/openclaw-os/discussions) - Ask questions
- [Twitter](https://twitter.com/openclaw_ai) - Follow for updates

---

## 📝 License

OpenClaw OS is open-source software licensed under the [MIT License](./LICENSE).

---

## 🙏 Acknowledgments

- [OpenClaw](https://github.com/openclaw/openclaw) - The AI assistant framework
- [Next.js](https://nextjs.org) - The React framework
- [Tailwind CSS](https://tailwindcss.com) - The utility-first CSS framework
- [Lucide](https://lucide.dev) - Beautiful & consistent icons

---

<div align="center">

**Built with ❤️ for the OpenClaw community**

[⬆ Back to Top](#openclaw-os)

</div>
