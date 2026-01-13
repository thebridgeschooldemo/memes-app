# Instrucciones para Copilot - memes-app

## ¿Qué es esto?
Una API con FastAPI para manejar memes. Simple: models con Pydantic, endpoints async, datos en memoria.

## La estructura

**Models** (`models/`):
- `Meme`: id, description, image, rating (opcional), source (opcional)
- `MemeImage`: url (validada), width, height
- `MemeSource`: enum con REDDIT, TWITTER, DEVS, UNKNOWN
- `FilterParams`: para los queries (limit, offset, order_by, tags)

**Database** (`database/db.py`):
- Solo una lista en memoria con 8 memes

**API** (`app.py`):
- `GET /` → index.html
- `GET /api/memes` → todo
- `GET /api/memes/{meme_id}` → uno (⚠️ BUG: `id != meme_id` debe ser `==`)
- `POST /api/memes` → crear
- `PUT /api/memes/{meme_id}` → actualizar

## Cosas importantes

**Type hints**: usar `int | None` en lugar de `Optional[int]`

**Validación**: 
- Path params: `Annotated[int, Path(..., ge=1)]`
- Body: confiar en Pydantic
- Fields: `Field(gt=0, le=100)` para números, `Literal["a", "b"]` para strings

**Endpoints**: todos son `async def`

**Errores**: devolver `{"error": "mensaje"}`

## Para empezar

```bash
python -m venv .venv
source .venv/bin/activate
pip3 install -r requirements.txt
```

```bash
fastapi dev app.py
```

Luego:
- http://127.0.0.1:8000 (la app)
- http://127.0.0.1:8000/docs (Swagger)

## TODO

- Arreglar el bug de GET por id
- Agregar DELETE
- Implementar los filters de FilterParams
- Frontend interactivo
