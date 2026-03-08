# OpenClaw OS

**Personal Operating System for AI Agents**

Plug-and-play mission control for your AI workforce. Connect to your OpenClaw instance and manage agents, tasks, and projects in one unified dashboard.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![OpenClaw](https://img.shields.io/badge/openclaw-compatible-green.svg)

## ✨ Features

- 🤖 **Agent Management** - View and manage all your AI agents in one place
- 📊 **Mission Control Dashboard** - Real-time overview of your AI operations
- 📋 **Task Tracking** - Monitor tasks across all projects
- 🔄 **OpenClaw Sync** - Automatically syncs with your OpenClaw instance
- 🎨 **Modern UI** - Clean, responsive interface built with Next.js + shadcn/ui
- ⚡ **Zero Config** - Works out of the box with sensible defaults

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

## 📁 Project Structure

```
openclaw-os/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── onboarding/   # Setup wizard
│   │   ├── agents/       # Agent management
│   │   ├── tasks/        # Task tracking
│   │   └── dashboard/    # Mission Control
│   ├── components/       # React components
│   ├── lib/              # Utilities & API clients
│   └── types/            # TypeScript types
├── public/               # Static assets
└── package.json
```

## 🔧 Development

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
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [OpenClaw Documentation](https://docs.openclaw.ai)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [Community Discord](https://discord.com/invite/clawd)

---

Built with ❤️ for the OpenClaw community
