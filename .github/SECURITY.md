# Security Policy

## 🔒 Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## 🚨 Reporting a Vulnerability

**DO NOT** open a public issue for security vulnerabilities.

Instead, please report security issues privately:

1. **Email**: Send details to security@openclaw.ai
2. **GitHub**: Use the [Security Advisories](https://github.com/eduardg7/openclaw-os/security/advisories) feature

### What to Include

- **Description**: What is the vulnerability?
- **Impact**: What can an attacker do?
- **Reproduction**: Steps to reproduce
- **Proof of Concept**: If possible
- **Suggested Fix**: If you have ideas

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity

## 🛡️ Security Best Practices

When using OpenClaw OS:

1. **Keep Updated**: Use the latest version
2. **Review Dependencies**: Run `npm audit` regularly
3. **Environment Variables**: Never commit `.env` files
4. **API Keys**: Keep credentials secure
5. **HTTPS**: Use HTTPS in production

## ✅ Security Features

OpenClaw OS includes:

- ✅ No hardcoded credentials
- ✅ No mock/seed data
- ✅ Input validation (coming soon)
- ✅ Authentication via OpenClaw Gateway (coming soon)
- ✅ Regular dependency audits

## 🔐 Dependency Security

We regularly audit dependencies:

```bash
npm audit
npm audit fix
```

All contributions must pass security audits before merging.

---

Thank you for helping keep OpenClaw OS secure! 🛡️
