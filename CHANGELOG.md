# Changelog

All notable changes to OpenClaw OS will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-08

### Added
- Initial public release
- Onboarding wizard with 6-step setup
- Mission Control Dashboard with real-time stats
- Agent management page with live data
- Task tracking page
- Settings page with configuration persistence
- Docker support with multi-stage builds
- OpenClaw Gateway API integration
- Agent sync from OpenClaw
- Light/Dark/System theme support
- User Guide documentation
- Contributing guidelines
- Security policy
- Issue templates (bug report + feature request)
- Pull request template
- CI workflow with linting and security audit

### Fixed
- Dashboard configuration check after onboarding
- Settings page form submission
- ESLint configuration errors
- Special character escaping in onboarding

### Security
- Next.js 16.1.6 with 0 vulnerabilities
- Branch protection on main
- Required PR reviews
- Security audit in CI

### Technical
- Next.js 16.1.6 with Turbopack
- React 19
- TypeScript strict mode
- Tailwind CSS with dark mode
- Vitest for testing
- ESLint for code quality

## [0.1.0] - 2026-03-08

### Added
- Initial MVP
- Basic onboarding flow
- Dashboard placeholder
- Agents placeholder
- Tasks placeholder
- Settings placeholder

---

## Version History

- **1.0.0** (2026-03-08) - First public release
- **0.1.0** (2026-03-08) - Initial MVP

---

[Unreleased]: https://github.com/eduardg7/openclaw-os/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/eduardg7/openclaw-os/releases/tag/v1.0.0
[0.1.0]: https://github.com/eduardg7/openclaw-os/compare/v0.1.0...v1.0.0
