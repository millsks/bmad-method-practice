# BMAD Method with GitHub Copilot: Novice to Expert
### Python · Pixi · VS Code

> **Update (2026-04-26):** Installation and verification steps in this guide are aligned with `bmad-method` installer output for version `6.5.0` and later.

> **BMAD** stands for **B**uild **M**ore **A**rchitect **D**reams. It is an AI-driven development
> framework that gives you a full virtual software team — Analyst, PM, Architect, Developer, QA —
> each with a defined persona and structured workflow, all powered by GitHub Copilot inside VS Code.
>
> Official docs: https://docs.bmad-method.org  
> GitHub repo: https://github.com/bmad-code-org/BMAD-METHOD

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Understanding the BMAD Philosophy](#2-understanding-the-bmad-philosophy)
3. [Installation & Project Setup](#3-installation--project-setup)
4. [VS Code & GitHub Copilot Configuration](#4-vs-code--github-copilot-configuration)
5. [Setting Up a Python + Pixi Project](#5-setting-up-a-python--pixi-project)
6. [BMAD Workflow Overview](#6-bmad-workflow-overview)
7. [Phase 1 — Analysis (Novice)](#7-phase-1--analysis-novice)
8. [Phase 2 — Planning (Beginner)](#8-phase-2--planning-beginner)
9. [Phase 3 — Solutioning (Intermediate)](#9-phase-3--solutioning-intermediate)
10. [Phase 4 — Implementation (Advanced)](#10-phase-4--implementation-advanced)
11. [Expert Techniques](#11-expert-techniques)
12. [Troubleshooting & Tips](#12-troubleshooting--tips)
13. [Quick Reference Cheat Sheet](#13-quick-reference-cheat-sheet)

## 1. Prerequisites

Before you begin, ensure the following are installed and working:

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 20+ | Required to run the BMAD installer |
| Git | Any | Version control |
| VS Code | Latest | Your IDE |
| GitHub Copilot | Active subscription | AI assistant |
| Pixi | Latest | Python package & environment manager |
| Python | 3.11+ | Primary language |

### Install Pixi

```bash
# macOS / Linux
curl -fsSL https://pixi.sh/install.sh | bash

# Windows (PowerShell)
iwr -useb https://pixi.sh/install.ps1 | iex
```

Verify:

```bash
pixi --version
```

### Install VS Code Extensions

Open VS Code and install:

- **GitHub Copilot** (`GitHub.copilot`)
- **GitHub Copilot Chat** (`GitHub.copilot-chat`)
- **Python** (`ms-python.python`)

Or from the terminal:

```bash
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat
code --install-extension ms-python.python
```

## 2. Understanding the BMAD Philosophy

### The Core Problem BMAD Solves

When you chat with an AI model, it has no persistent memory of *who it is* in your project. You might say “act like a developer” and then “now act like a QA engineer” — but the AI can lose context and mix roles.

BMAD helps by:

1. **Defining structured agent personas** — each agent (PM, Architect, Dev, QA) has a fixed role, communication style, and responsibilities.
2. **Building context progressively** — each phase produces documents that feed the next phase.
3. **Using fresh chat sessions per workflow** — reduces context overflow and role confusion.

### The Four Phases

```
Phase 1: Analysis        → Brainstorm, research, validate ideas
Phase 2: Planning        → Define WHAT to build (PRD)
Phase 3: Solutioning     → Define HOW to build it (Architecture + Stories)
Phase 4: Implementation  → BUILD it, story by story
```

### The Agent Team

| Agent | Role | When to Use |
|-------|------|-------------|
| `bmad-master` | Orchestrator | General questions, routing |
| `bmad-agent-pm` | Product Manager | PRD, epics, stories |
| `bmad-agent-architect` | Architect | Architecture, ADRs |
| `bmad-agent-dev` | Developer | Implementation, code review |
| `bmad-agent-qa` | QA Engineer | Tests, quality checks |
| `bmad-agent-analyst` | Analyst | Research, brainstorming |
| `bmad-agent-ux-designer` | UX Designer | UI/UX specs |

## 3. Installation & Project Setup

### Step 1: Create Your Project Directory

```bash
mkdir my-python-app
cd my-python-app
git init
```

### Step 2: Install BMAD

```bash
npx bmad-method install
```

You should see npm resolve at least version `6.5.0`:

```text
Need to install the following packages:
bmad-method@6.5.0
Ok to proceed? (y) y
```

When prompted:

- **Installation location:** Current directory (press Enter)
- **Official modules:** Select both **BMad Method Agile-AI Driven-Development** and **BMad Core Module**
- **Community modules:** `No` (optional)
- **Custom source (Git URL/local path):** `No` (unless needed)
- **Integrations:** Select **GitHub Copilot**
- **Core configuration:** provide your name/team, chat language, output language, and output folder (for example `_bmad-output`)
- **Module configuration:** choose **Express Setup**

### Step 3: Verify the Installation

```bash
ls -la
```

You should see:

```
_bmad/
_bmad-output/
.agents/
docs/
```

### What Was Created

**`_bmad/`** — BMAD modules, config, manifests, and helper scripts.

**`_bmad-output/`** — Generated planning and implementation artifacts.

**`.agents/skills/`** — Installed GitHub Copilot skills (for example `bmad-help`, `bmad-agent-dev`, etc.).

**`docs/`** — Project knowledge/document folder created by installer.

## 4. VS Code & GitHub Copilot Configuration

### Opening Copilot Chat

| OS | Shortcut |
|----|---------|
| macOS | `Ctrl+Cmd+I` |
| Windows/Linux | `Ctrl+Alt+I` |

### Switching Between BMAD Agent Modes

In the Copilot Chat panel:

1. Click the **agent mode selector** (dropdown at the top)
2. Select the agent mode (`pm`, `dev`, `architect`, etc.)
3. Keep that chat dedicated to that workflow/role

> **Rule:** Start a **new chat session** when switching agents or starting a new workflow.

### Recommended `.vscode/settings.json`

```json
{
  "chat.agent.maxRequests": 25,
  "github.copilot.chat.agent.runTasks": true,
  "github.copilot.chat.agent.autoFix": true,
  "chat.tools.autoApprove": false,
  "editor.inlineSuggest.enabled": true,
  "github.copilot.enable": {
    "*": true,
    "plaintext": false,
    "markdown": true,
    "python": true
  }
}
```

### Copilot Instructions File

If your workspace uses a Copilot instructions file (for example `.github/copilot-instructions.md`), extend it to keep Copilot aligned:

```markdown
# Project: My Python App

## Tech Stack
- Language: Python 3.11+
- Package Manager: Pixi
- IDE: VS Code

## Conventions
- Use type hints on all functions
- Follow PEP 8
- All tests use pytest

## Pixi Commands
- Add dependency: `pixi add <package>`
- Run script: `pixi run <script>`
- Activate env: `pixi shell`
```

## 5. Setting Up a Python + Pixi Project

### Initialize Pixi

```bash
pixi init
```

Example `pixi.toml` (starter):

```toml
[project]
name = "my-python-app"
version = "0.1.0"
description = "My BMAD-driven Python application"
channels = ["conda-forge"]
platforms = ["linux-64", "osx-arm64", "win-64"]

[dependencies]
python = ">=3.11"

[pypi-dependencies]

[tasks]
start = "python src/main.py"
test = "pytest tests/ -v"
lint = "ruff check src/"
format = "ruff format src/"
typecheck = "mypy src/"

[feature.dev.dependencies]
pytest = "*"
ruff = "*"
mypy = "*"
```

### Add Dependencies

```bash
pixi add python=3.11
pixi add --pypi pytest ruff mypy
pixi add --pypi typer rich httpx
```

### Recommended Structure

```
my-python-app/
├── _bmad/
├── _bmad-output/
├── .agents/
│   └── skills/
├── docs/
├── .vscode/
│   └── settings.json   # optional (recommended local IDE settings)
├── .github/
│   └── copilot-instructions.md   # optional workspace guidance for Copilot
├── src/
│   └── my_python_app/
│       ├── __init__.py
│       └── main.py
├── tests/
│   └── test_main.py
├── pixi.toml
└── README.md
```

## 6. BMAD Workflow Overview

Each phase produces artifacts that the next phase consumes:

```
Idea
  ↓
Analysis → product-brief.md
  ↓
Planning → PRD.md (+ optional ux-spec)
  ↓
Solutioning → architecture.md + epics/stories
  ↓
Implementation → code + tests, story by story
```

BMAD shorthand:

| Shorthand | Meaning |
|----------|---------|
| `Y` | Yes |
| `N` | No |
| `A` | Accept all remaining defaults |

## 7. Phase 1 — Analysis (Novice)

### 7.1 Brainstorming

**New chat → `analyst` agent mode**

```
/bmad-brainstorming
```

Example prompt:

> I want to build a CLI tool that monitors Python dependencies for vulnerabilities and outdated versions in Pixi projects.

### 7.2 Product Brief

```
/bmad-bmm-create-product-brief
```

Example excerpt:

```markdown
# Product Brief: PyGuard CLI

## Problem Statement
Python developers need a fast CLI tool to audit Pixi dependencies for known CVEs and outdated packages.

## Core Capabilities
1. Scan `pixi.toml` dependencies
2. Query vulnerability sources (e.g., OSV)
3. Display a readable terminal report
4. Provide `--json` output for CI
5. Exit non-zero when issues found
```

## 8. Phase 2 — Planning (Beginner)

### 8.1 Create the PRD

**New chat → `pm` agent mode**

```
/bmad-bmm-create-prd
```

PRD should include user stories and acceptance criteria.

Example user story:

```markdown
### US-001: Scan Dependencies
**As a** Python developer,
**I want to** run `pyguard scan`,
**So that** I can see vulnerable and outdated packages.

**Acceptance Criteria:**
- [ ] Reads `pixi.toml` by default
- [ ] Shows CVE IDs and severity
- [ ] Shows current vs latest version
- [ ] Exits with code 1 if vulnerabilities found
```

### 8.2 UX Design (Optional)

**New chat → `ux-designer` agent mode**

```
/bmad-bmm-create-ux-design
```

For CLI tools, define commands, flags, and output conventions.

## 9. Phase 3 — Solutioning (Intermediate)

### 9.1 Create Architecture

**New chat → `architect` agent mode**

```
/bmad-bmm-create-architecture
```

Example component layout:

```text
pyguard/
├── __main__.py
├── cli.py
├── scanner.py
├── osv_client.py
├── pypi_client.py
├── reporter.py
└── models.py
```

### 9.2 Create Epics and Stories

**New chat → `pm` agent mode**

```
/bmad-bmm-create-epics-and-stories
```

### 9.3 Implementation Readiness

**New chat → `architect` agent mode**

```
/bmad-bmm-check-implementation-readiness
```

## 10. Phase 4 — Implementation (Advanced)

### 10.1 Sprint Planning

**New chat → `dev` agent mode**

```
/bmad-bmm-sprint-planning
```

### 10.2 Story Cycle

For each story:

1. **Create story**
   ```
   /bmad-bmm-create-story
   ```
2. **Implement story**
   ```
   /bmad-bmm-dev-story
   ```
3. **Review**
   ```
   /bmad-bmm-code-review
   ```

### Example Implementation: Parse `pixi.toml`

`src/pyguard/scanner.py`:

```python
import tomllib
from pathlib import Path


def parse_pixi_toml(file_path: Path | None = None) -> dict[str, str]:
    """Parse a pixi.toml file and return a dict of dependency name → version spec.

    Notes:
        - This is a simplified example. Real implementations should also parse
          `[pypi-dependencies]`, optional features, and platform-specific sections.

    Raises:
        FileNotFoundError: If pixi.toml is missing.
        ValueError: If TOML is invalid.
    """
    file_path = file_path or (Path.cwd() / "pixi.toml")
    if not file_path.exists():
        raise FileNotFoundError(f"pixi.toml not found at {file_path}")

    with file_path.open("rb") as f:
        data = tomllib.load(f)

    deps = data.get("dependencies", {})
    # Common convention: ignore python itself for scanning
    deps.pop("python", None)
    return {k: str(v) for k, v in deps.items()}
```

`tests/test_scanner.py`:

```python
from pathlib import Path

import pytest

from pyguard.scanner import parse_pixi_toml


@pytest.fixture
def sample_pixi_toml(tmp_path: Path) -> Path:
    content = """
[project]
name = "demo"
version = "0.1.0"
channels = ["conda-forge"]
platforms = ["linux-64"]

[dependencies]
python = ">=3.11"
requests = ">=2.31"
numpy = ">=1.26"
"""
    p = tmp_path / "pixi.toml"
    p.write_text(content)
    return p


def test_parse_pixi_toml(sample_pixi_toml: Path) -> None:
    deps = parse_pixi_toml(sample_pixi_toml)
    assert deps == {"requests": ">=2.31", "numpy": ">=1.26"}


def test_parse_pixi_toml_missing_file(tmp_path: Path) -> None:
    with pytest.raises(FileNotFoundError):
        parse_pixi_toml(tmp_path / "pixi.toml")
```

Run:

```bash
pixi run test
```

## 11. Expert Techniques

### 11.1 Project Context “Constitution”

Create and maintain `docs/project-context.md` that captures:

- stack decisions (Python 3.11, Pixi)
- conventions (type hints, ruff, mypy)
- testing rules
- error-handling rules

### 11.2 Quick Dev Flow (Small Tasks)

**New chat → `quick-dev` agent mode**

```
/bmad-bmm-quick-dev
```

Use for bug fixes and small features.

### 11.3 Adversarial QA Review

**New chat → `qa` agent mode**

Ask for harsh review:

> Review the OSV client for security issues, timeouts, caching correctness, and error handling.

### 11.4 Shard Large Docs

When docs get huge:

```
/bmad-shard-doc
```

This reduces context overload by splitting documents into sections.

## 12. Troubleshooting & Tips

### Agent loses context

- Start a **new chat**
- Select the correct agent mode
- Tell it explicitly which artifact(s) to read

### Slash commands not working

- Confirm `_bmad/` exists
- Confirm Copilot Chat extension enabled
- Restart VS Code
- Try `/bmad-help`

### Copilot suggests `pip install`

Add an explicit rule to your Copilot instructions file (for example `.github/copilot-instructions.md`):

```markdown
## CRITICAL
Never use pip or Poetry. Always manage dependencies with Pixi (`pixi add ...`).
```

## 13. Quick Reference Cheat Sheet

### BMAD Commands

| Phase | Command | Agent |
|------|---------|-------|
| Analysis | `/bmad-brainstorming` | analyst |
| Analysis | `/bmad-bmm-create-product-brief` | analyst |
| Planning | `/bmad-bmm-create-prd` | pm |
| Solutioning | `/bmad-bmm-create-architecture` | architect |
| Solutioning | `/bmad-bmm-create-epics-and-stories` | pm |
| Implementation | `/bmad-bmm-sprint-planning` | dev |
| Implementation | `/bmad-bmm-dev-story` | dev |
| Review | `/bmad-bmm-code-review` | dev |

### Pixi Commands

```bash
pixi init
pixi add <package>
pixi add --pypi <package>
pixi run test
pixi run lint
pixi run format
pixi run typecheck
pixi shell
```

### Golden Rules

1. **Fresh chat per workflow**
2. **Fresh chat per agent mode switch**
3. **Reference artifacts explicitly**
4. **Use Pixi, not pip**
5. **Commit after each story**
