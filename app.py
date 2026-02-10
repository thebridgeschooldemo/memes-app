from fastapi import FastAPI, Path, Query
from fastapi.staticfiles import StaticFiles
from fastapi.responses import Response, FileResponse

from typing import Annotated

from models.meme import Meme
from database.sqlite_db import (
    init_db,
    get_all_memes,
    get_meme_by_id,
    create_meme as db_create_meme,
    update_meme as db_update_meme,
)
from database.db_utils import (
    search_memes,
    authenticate_user,
    get_meme_file,
    load_user_preferences,
    hash_password,
)
from config import ADMIN_PASSWORD, JWT_SECRET, DEBUG_MODE


app = FastAPI()

# Inicializar la base de datos al arrancar la aplicación
init_db()


app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
async def root():
    return FileResponse("static/index.html")


@app.get("/api/memes")
async def get_memes():
    return get_all_memes()


@app.get("/api/memes/{meme_id}")
async def get_meme(
    meme_id: Annotated[int, Path(title="The ID of the meme to get", ge=1)],
):
    meme = get_meme_by_id(meme_id)
    if meme:
        return meme
    return {"error": "Meme not found"}


@app.post("/api/memes")
async def create_meme(meme: Meme):
    return db_create_meme(meme)


@app.put("/api/memes/{meme_id}")
async def update_meme(
    meme_id: Annotated[int, Path(title="The ID of the meme to update", ge=1)],
    updated_meme: Meme,
):
    meme = db_update_meme(meme_id, updated_meme)
    if meme:
        return meme
    return {"error": "Meme not found"}


# VULNERABLE ENDPOINTS


@app.get("/api/memes/search")
async def search_memes_endpoint(q: str = Query(..., description="Search term")):
    """Search memes - VULNERABLE TO SQL INJECTION"""
    results = search_memes(q)
    return {"results": results}


@app.post("/api/login")
async def login(username: str, password: str):
    """Login endpoint - VULNERABLE TO SQL INJECTION"""
    user = authenticate_user(username, password)
    if user:
        return {"message": "Login successful", "user": user}
    return {"error": "Invalid credentials"}


@app.get("/api/files/{filename:path}")
async def get_file(filename: str):
    """Get file - VULNERABLE TO PATH TRAVERSAL"""
    try:
        content = get_meme_file(filename)
        return Response(content=content, media_type="image/jpeg")
    except FileNotFoundError:
        return {"error": "File not found"}


@app.post("/api/preferences")
async def set_preferences(encoded_prefs: str):
    """Load preferences - VULNERABLE TO INSECURE DESERIALIZATION"""
    prefs = load_user_preferences(encoded_prefs)
    return {"preferences": prefs}


@app.get("/api/debug")
async def debug_info():
    """Debug endpoint exposing sensitive info"""
    if DEBUG_MODE:
        return {
            "admin_password_hash": hash_password(ADMIN_PASSWORD),
            "jwt_secret_preview": JWT_SECRET[:10] + "...",
            "debug": True,
        }
    return {"debug": False}
