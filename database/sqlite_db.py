import sqlite3
import json
from typing import List, Optional
from models.meme import Meme
from models.meme_image import MemeImage
from models.meme_source import MemeSource


DB_FILE = "memes.db"


def get_connection():
    """Crear una conexión a la base de datos SQLite"""
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Inicializar la base de datos y crear las tablas si no existen"""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS memes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            image_url TEXT NOT NULL,
            image_width INTEGER,
            image_height INTEGER,
            rating INTEGER,
            source TEXT
        )
    """)

    conn.commit()
    conn.close()


def get_all_memes() -> List[Meme]:
    """Obtener todos los memes de la base de datos"""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM memes")
    rows = cursor.fetchall()
    conn.close()

    memes = []
    for row in rows:
        meme = Meme(
            id=row["id"],
            description=row["description"],
            image=MemeImage(
                url=row["image_url"],
                width=row["image_width"],
                height=row["image_height"]
            ),
            rating=row["rating"],
            source=MemeSource(row["source"]) if row["source"] else None
        )
        memes.append(meme)

    return memes


def get_meme_by_id(meme_id: int) -> Optional[Meme]:
    """Obtener un meme por su ID"""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM memes WHERE id = ?", (meme_id,))
    row = cursor.fetchone()
    conn.close()

    if row:
        return Meme(
            id=row["id"],
            description=row["description"],
            image=MemeImage(
                url=row["image_url"],
                width=row["image_width"],
                height=row["image_height"]
            ),
            rating=row["rating"],
            source=MemeSource(row["source"]) if row["source"] else None
        )

    return None


def create_meme(meme: Meme) -> Meme:
    """Crear un nuevo meme en la base de datos"""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO memes (description, image_url, image_width, image_height, rating, source)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        meme.description,
        str(meme.image.url),
        meme.image.width,
        meme.image.height,
        meme.rating,
        meme.source.value if meme.source else None
    ))

    meme_id = cursor.lastrowid
    conn.commit()
    conn.close()

    meme.id = meme_id
    return meme


def update_meme(meme_id: int, updated_meme: Meme) -> Optional[Meme]:
    """Actualizar un meme existente"""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE memes
        SET description = ?, image_url = ?, image_width = ?, image_height = ?, rating = ?, source = ?
        WHERE id = ?
    """, (
        updated_meme.description,
        str(updated_meme.image.url),
        updated_meme.image.width,
        updated_meme.image.height,
        updated_meme.rating,
        updated_meme.source.value if updated_meme.source else None,
        meme_id
    ))

    conn.commit()
    affected_rows = cursor.rowcount
    conn.close()

    if affected_rows > 0:
        updated_meme.id = meme_id
        return updated_meme

    return None


def delete_meme(meme_id: int) -> bool:
    """Eliminar un meme de la base de datos"""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM memes WHERE id = ?", (meme_id,))

    conn.commit()
    affected_rows = cursor.rowcount
    conn.close()

    return affected_rows > 0
