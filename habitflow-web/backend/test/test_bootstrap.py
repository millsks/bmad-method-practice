"""Bootstrap validation tests for HabitFlow backend."""
def test_habitflow_package_imports() -> None:
    """Verify that the habitflow package can be imported successfully."""
    import habitflow

    assert habitflow.__version__ == "0.1.0"
    assert habitflow.__author__ == "Kevin Mills"


def test_backend_directory_structure() -> None:
    """Verify that backend directory structure is correct."""
    from pathlib import Path

    backend_root = Path(__file__).parent.parent
    assert (backend_root / "src" / "habitflow").exists()
    assert (backend_root / "src" / "habitflow" / "__init__.py").exists()
    assert (backend_root / "src" / "habitflow" / "py.typed").exists()
    assert (backend_root / "test").exists()


def test_pyproject_exists() -> None:
    """Verify that pyproject.toml exists and is valid."""
    from pathlib import Path

    backend_root = Path(__file__).parent.parent
    pyproject = backend_root / "pyproject.toml"
    assert pyproject.exists()

    # Verify it can be parsed
    import tomllib

    with open(pyproject, "rb") as f:
        config = tomllib.load(f)
    assert config["project"]["name"] == "habitflow-backend"

