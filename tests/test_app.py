import pytest
from fastapi.testclient import TestClient

from app import app
from models.meme import Meme
from models.meme_image import MemeImage
from models.meme_source import MemeSource

client = TestClient(app)


# --- Fixtures ---


@pytest.fixture
def sample_meme_data():
    """Returns valid meme data for testing."""
    return {
        "id": 100,
        "description": "Test Meme",
        "image": {"url": "https://example.com/meme.jpg"},
        "rating": 5,
        "source": "Reddit",
    }


@pytest.fixture
def sample_meme():
    """Returns a Meme instance for testing."""
    return Meme(
        id=100,
        description="Test Meme",
        image=MemeImage(url="https://example.com/meme.jpg"),
        rating=5,
        source=MemeSource.REDDIT,
    )


# --- Root Endpoint Tests ---


class TestRootEndpoint:
    def test_root_returns_index_html(self):
        response = client.get("/")
        assert response.status_code == 200
        assert "text/html" in response.headers["content-type"]


# --- GET /api/memes Tests ---


class TestGetMemes:
    def test_get_all_memes_returns_list(self):
        response = client.get("/api/memes")
        assert response.status_code == 200
        assert isinstance(response.json(), list)

    def test_get_all_memes_returns_meme_objects(self):
        response = client.get("/api/memes")
        data = response.json()
        assert len(data) > 0
        # Verify meme structure
        first_meme = data[0]
        assert "id" in first_meme
        assert "description" in first_meme
        assert "image" in first_meme


# --- GET /api/memes/{meme_id} Tests ---


class TestGetMemeById:
    def test_get_meme_with_valid_id(self):
        response = client.get("/api/memes/1")
        assert response.status_code == 200

    def test_get_meme_with_zero_id_fails_validation(self):
        """ID must be >= 1 according to Path validation."""
        response = client.get("/api/memes/0")
        assert response.status_code == 422

    def test_get_meme_with_negative_id_fails_validation(self):
        """Negative IDs should fail validation."""
        response = client.get("/api/memes/-1")
        assert response.status_code == 422

    def test_get_meme_with_non_integer_id_fails(self):
        """Non-integer IDs should fail."""
        response = client.get("/api/memes/abc")
        assert response.status_code == 422


# --- POST /api/memes Tests ---


class TestCreateMeme:
    def test_create_meme_successfully(self, sample_meme_data):
        response = client.post("/api/memes", json=sample_meme_data)
        assert response.status_code == 200
        data = response.json()
        assert data["description"] == sample_meme_data["description"]
        assert data["id"] == sample_meme_data["id"]

    def test_create_meme_with_minimal_data(self):
        """Test creating meme with only required fields."""
        minimal_meme = {
            "id": 101,
            "description": "Minimal Meme",
            "image": {"url": "https://example.com/minimal.jpg"},
        }
        response = client.post("/api/memes", json=minimal_meme)
        assert response.status_code == 200

    def test_create_meme_with_invalid_data_missing_required(self):
        """Missing required fields should fail validation."""
        invalid_meme = {"id": 102}
        response = client.post("/api/memes", json=invalid_meme)
        assert response.status_code == 422

    def test_create_meme_with_invalid_url(self):
        """Invalid URL should fail validation."""
        invalid_meme = {
            "id": 103,
            "description": "Invalid URL Meme",
            "image": {"url": "not-a-valid-url"},
        }
        response = client.post("/api/memes", json=invalid_meme)
        assert response.status_code == 422


# --- PUT /api/memes/{meme_id} Tests ---


class TestUpdateMeme:
    def test_update_existing_meme(self):
        updated_meme = {
            "id": 1,
            "description": "Updated Meme Description",
            "image": {"url": "https://example.com/updated.jpg"},
        }
        response = client.put("/api/memes/1", json=updated_meme)
        assert response.status_code == 200

    def test_update_nonexistent_meme(self):
        updated_meme = {
            "id": 99999,
            "description": "Ghost Meme",
            "image": {"url": "https://example.com/ghost.jpg"},
        }
        response = client.put("/api/memes/99999", json=updated_meme)
        assert response.status_code == 200
        assert response.json().get("error") == "Meme not found"

    def test_update_meme_with_invalid_data(self):
        """Invalid data should fail validation."""
        response = client.put("/api/memes/1", json={"invalid": "data"})
        assert response.status_code == 422


# --- GET /api/memes/search Tests ---


class TestSearchMemes:
    def test_search_memes_without_query_fails(self):
        """Query parameter is required."""
        response = client.get("/api/memes/search")
        assert response.status_code == 422


# --- POST /api/login Tests ---


class TestLogin:
    def test_login_missing_credentials(self):
        """Missing credentials should fail."""
        response = client.post("/api/login")
        assert response.status_code == 422


# --- GET /api/files/{filename} Tests ---


class TestGetFile:
    def test_get_nonexistent_file(self):
        response = client.get("/api/files/nonexistent.jpg")
        assert response.status_code == 200
        assert response.json().get("error") == "File not found"


# --- POST /api/preferences Tests ---


class TestPreferences:
    def test_set_preferences_missing_param(self):
        """Missing parameter should fail."""
        response = client.post("/api/preferences")
        assert response.status_code == 422


# --- GET /api/debug Tests ---


class TestDebugEndpoint:
    def test_debug_endpoint_returns_response(self):
        response = client.get("/api/debug")
        assert response.status_code == 200
        data = response.json()
        assert "debug" in data

    def test_debug_endpoint_structure(self):
        response = client.get("/api/debug")
        data = response.json()
        # debug key should be boolean
        assert isinstance(data.get("debug"), bool)


# --- Static Files Tests ---


class TestStaticFiles:
    def test_static_files_accessible(self):
        response = client.get("/static/app.js")
        assert response.status_code == 200

    def test_static_index_html_accessible(self):
        response = client.get("/static/index.html")
        assert response.status_code == 200
