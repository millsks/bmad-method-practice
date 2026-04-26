# HabitFlow

Recovery-first habit tracking application built with Django backend and React frontend.

## Quick Start

### Prerequisites

- Pixi (version 0.20.0 or later)
- macOS, Linux, or WSL

### Setup

```bash
# Install dependencies and set up environments
pixi install

# Verify setup by running tests
pixi run test
```

## Project Structure

```text
habitflow-web/
├── backend/                  # Python Django backend
│   ├── src/habitflow/       # Main package
│   ├── test/                # Backend tests
│   ├── pyproject.toml       # Backend package configuration
│   └── README.md            # Backend documentation
├── frontend/                 # React + TypeScript frontend
│   ├── src/                 # Frontend source code
│   ├── test/                # Frontend tests  
│   ├── package.json         # Frontend dependencies
│   └── README.md            # Frontend documentation
├── docs/                     # Project documentation
├── pixi.toml                # Root Pixi configuration
└── README.md                # This file
```

## Available Commands

All commands are managed through Pixi and available via `pixi run <command>`:

### Testing

```bash
# Run all tests (backend + frontend)
pixi run test

# Run only backend tests
pixi run test-backend

# Run only frontend tests
pixi run test-frontend
```

### Code Quality

```bash
# Run linting (backend + frontend)
pixi run lint

# Run code formatting (backend + frontend)
pixi run format

# Run type checking (backend + frontend)
pixi run typecheck
```

### Build

```bash
# Build both backend and frontend
pixi run build

# Build only backend
pixi run build-backend

# Build only frontend
pixi run build-frontend
```

### Full Validation

```bash
# Run complete CI validation suite
pixi run ci
```

## Refresh Screenshots

Use these commands to regenerate the Story 1.0 frontend screenshot.

```bash
# Install frontend dependencies (including Playwright)
pixi run install-frontend-deps

# Install Playwright Chromium browser (first time or after updates)
pixi run install-playwright-browser

# Start frontend dev server in one terminal
pixi run start

# Capture homepage screenshot in another terminal
pixi run screenshot-home
```

After capture completes, stop the dev server terminal with `Ctrl+C`.

Screenshot output:

- [docs/screenshots/story-1-0-bootstrap-home.png](docs/screenshots/story-1-0-bootstrap-home.png)

## Development Workflow

**Feature Development Steps:**

1. Create your feature branch: `git checkout -b feature/my-feature`
1. Make changes to backend (`backend/src/`), frontend (`frontend/src/`), or both
1. Write tests for your changes (backend tests: `backend/test/test_*.py`, frontend tests: `frontend/test/**.test.tsx`)
1. Validate locally with `pixi run test`, `pixi run lint`, and `pixi run typecheck`
1. Run full CI validation: `pixi run ci`
1. Submit a pull request with a clear description of your changes

**Example validation commands:**

```bash
# Run tests for your changes
pixi run test

# Check code quality
pixi run lint

# Verify types
pixi run typecheck
```

## Pixi Environments

The project uses Pixi feature environments for backend and frontend isolation:

- **backend** environment: Python 3.12+ with development tools (pytest, ruff, mypy, black)
- **frontend** environment: Node.js 18+ with development tools (vite, vitest, eslint, prettier)
- **default** environment: Includes both backend and frontend

### Using Specific Environments

Most commands automatically use the correct environment. For advanced usage:

```bash
# Run command in backend environment only
pixi run -e backend pytest backend/test

# Run command in frontend environment only  
pixi run -e frontend npm --prefix frontend run test
```

## Architecture Principles

- **Backend/Frontend Separation**: Strict boundary at `backend/` and `frontend/` directories
- **Pixi-First Execution**: All project commands execute through Pixi, never direct system Python/npm
- **Explicit Structure**: `src/` + `test/` layout in both backend and frontend
- **Type Safety**: TypeScript in frontend, type hints in backend with mypy validation
- **Testing**: Unit and integration tests for all major functionality

## Adding Dependencies

### Backend Dependencies

```bash
# Edit backend/pyproject.toml manually or use:
echo "new-package = '*'" >> backend/pyproject.toml

# Then update lock file
pixi update
```

### Frontend Dependencies

```bash
# Add to frontend/package.json
npm --prefix frontend install new-package

# Or edit package.json manually and run
pixi update
```

## Documentation

- [Backend README](backend/README.md) - Backend setup and API documentation
- [Frontend README](frontend/README.md) - Frontend setup and component documentation
- [Architecture](docs/ARCHITECTURE.md) - System design and technical decisions

## Contributing

1. Ensure all tests pass: `pixi run ci`
2. Follow the project structure and naming conventions
3. Add tests for any new functionality
4. Update documentation if behavior changes

## License

MIT

## Support

For issues or questions, please open a GitHub issue or contact the development team.
