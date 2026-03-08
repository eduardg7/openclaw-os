# Security Policy

## 🔒 Reporting Security Issues

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them securely:

- **Email**: security@openclaw.ai
- **GitHub Security Advisories**: [Report a vulnerability](https://github.com/eduardg7/openclaw-os/security/advisories/new)

You should receive a response within 48 hours. If you do not, please follow up via email.

## 🛡️ Security Features

OpenClaw OS is designed with security in mind:

- ✅ No hardcoded credentials or API keys
- ✅ No mock/seed data that could leak into production
- ✅ Input validation on all user inputs (coming soon)
- ✅ Authentication via OpenClaw Gateway (coming soon)
- ✅ Regular dependency audits
- ✅ Branch protection on main branch
- ✅ Required PR reviews before merging

## 🔐 Best Practices

When deploying OpenClaw OS:

1. **Environment Variables**: Never commit `.env` files
2. **HTTPS**: Always use HTTPS in production
3. **Updates**: Keep dependencies updated
4. **Access Control**: Restrict access to your OpenClaw instance
5. **Monitoring**: Monitor logs for suspicious activity

## 📋 Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## 🎯 Security Audits

All contributions are automatically checked:

- `npm audit` - Dependency vulnerabilities
- Code review by maintainers
- No direct pushes to main branch
- All changes via Pull Request only

Thank you for helping keep OpenClaw OS and our users safe! 🙏
