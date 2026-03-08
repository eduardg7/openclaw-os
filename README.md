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

## 📦 Deployment

### Option 1: Docker (Recommended)

The easiest way to deploy OpenClaw OS.

```bash
# Clone and enter the repository
git clone https://github.com/eduardg7/openclaw-os.git
cd openclaw-os

# Build and run with Docker Compose
docker compose up -d

# View logs
docker compose logs -f
```

The app will be available at [http://localhost:3000](http://localhost:3000).

**Environment Variables:**

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENCLAW_GATEWAY_URL` | `http://host.docker.internal:3100` | OpenClaw Gateway URL |
| `OPENCLAW_DATA_DIR` | `/data` | OpenClaw data directory (mounted) |

**Custom Configuration:**

Create a `.env` file or pass environment variables:

```bash
# Using .env file
cat > .env << EOF
OPENCLAW_GATEWAY_URL=http://your-gateway:3100
OPENCLAW_DATA_DIR=/path/to/openclaw/data
EOF

docker compose up -d
```

```bash
# Or via command line
OPENCLAW_GATEWAY_URL=http://your-gateway:3100 docker compose up -d
```

**Manual Docker Build:**

```bash
# Build the image
docker build -t openclaw-os .

# Run the container
docker run -d \
  --name openclaw-os \
  -p 3000:3000 \
  -e OPENCLAW_GATEWAY_URL=http://host.docker.internal:3100 \
  -v ~/.openclaw:/data:ro \
  --add-host=host.docker.internal:host-gateway \
  openclaw-os
```

### Option 2: Vercel (Easiest)

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/eduardg7/openclaw-os)

1. Click the button above
2. Connect your GitHub account
3. Configure environment variables if needed
4. Deploy!

**Note:** For Vercel deployments, ensure your OpenClaw Gateway is accessible from the internet.

### Option 3: Self-Hosted (Node.js)

Run directly with Node.js for maximum control.

```bash
# Clone and install
git clone https://github.com/eduardg7/openclaw-os.git
cd openclaw-os
npm install

# Build for production
npm run build

# Set environment variables
export OPENCLAW_GATEWAY_URL=http://localhost:3100
export OPENCLAW_DATA_DIR=~/.openclaw
export NODE_ENV=production
export PORT=3000

# Start the server
npm start
```

**Using PM2 (Process Manager):**

```bash
# Install PM2
npm install -g pm2

# Build the app
npm run build

# Start with PM2
pm2 start npm --name "openclaw-os" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

### Option 4: systemd (Linux Service)

Run as a systemd service on Linux.

```bash
# Build the app
cd /opt/openclaw-os
npm install
npm run build

# Create systemd service
sudo cat > /etc/systemd/system/openclaw-os.service << EOF
[Unit]
Description=OpenClaw OS
After=network.target

[Service]
Type=simple
User=openclaw
WorkingDirectory=/opt/openclaw-os
Environment=NODE_ENV=production
Environment=OPENCLAW_GATEWAY_URL=http://localhost:3100
Environment=OPENCLAW_DATA_DIR=/home/openclaw/.openclaw
ExecStart=/usr/bin/node /opt/openclaw-os/.next/standalone/server.js
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Enable and start
sudo systemctl daemon-reload
sudo systemctl enable openclaw-os
sudo systemctl start openclaw-os
```

## 🔒 Security Considerations

- **Never expose directly to the internet** without authentication
- Use a reverse proxy (nginx, Caddy, Traefik) with HTTPS
- Consider basic auth or OAuth for production deployments
- The Docker container runs as a non-root user for security

**Example nginx reverse proxy:**

```nginx
server {
    listen 443 ssl http2;
    server_name openclaw.yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
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
├── Dockerfile            # Docker production image
├── docker-compose.yml    # Docker Compose setup
└── package.json
```

## 🐳 Docker Deployment

### Quick Start with Docker

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t openclaw-os .
docker run -p 3000:3000 openclaw-os
```

The Docker image includes:
- Multi-stage build for optimized size
- Health checks configured
- OpenClaw data directory mounted
- Production-ready configuration

Access the app at [http://localhost:3000](http://localhost:3000)

### Docker Environment Variables

Configure via `docker-compose.yml` or `.env`:

```bash
OPENCLAW_GATEWAY_URL=http://host.docker.internal:3100
OPENCLAW_DATA_DIR=/data
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
