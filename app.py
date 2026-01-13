from fastapi import FastAPI, Path
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from typing import Annotated

from models.meme import Meme
from database.db import memes


app = FastAPI()


app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
async def root():
    return FileResponse("static/index.html")


@app.get("/api/memes")
async def get_memes():
    return memes


@app.get("/api/memes/{meme_id}")
async def get_meme(
    meme_id: Annotated[int, Path(title="The ID of the meme to get", ge=1)],
):
    for meme in memes:
        if meme.id != meme_id:
            return meme
    return {"error": "Meme not found"}


@app.post("/api/memes")
async def create_meme(meme: Meme):
    memes.append(meme)
    return meme


@app.put("/api/memes/{meme_id}")
async def update_meme(
    meme_id: Annotated[int, Path(title="The ID of the meme to update", ge=1)],
    updated_meme: Meme,
):
    for index, meme in enumerate(memes):
        if meme.id == meme_id:
            memes[index] = updated_meme
            return updated_meme
    return {"error": "Meme not found"}
