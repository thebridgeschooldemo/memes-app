# Instrucciones para Copilot - memes-app

API REST con FastAPI para gestionar memes. Base de datos en memoria.

## Arquitectura del proyecto

```
memes-app/
├── app.py              # Endpoints de la API
├── models/             # Modelos Pydantic
│   ├── meme.py         # Modelo principal
│   ├── meme_image.py   # Imagen con validación de URL
│   ├── meme_source.py  # Enum de fuentes
│   └── filter_params.py # Parámetros de query
├── database/
│   └── db.py           # Lista en memoria con datos de ejemplo
├── static/             # Frontend (ver static/AGENTS.md)
│   ├── index.html
│   └── images/
└── tests/              # Tests con pytest (crear si no existe)
```

## Convenciones de código

### Python / FastAPI

**Type hints obligatorios:**
```python
# ✅ Correcto
def get_meme(meme_id: int) -> Meme | None:
    ...

# ✅ Para tipos opcionales
rating: int | None = None  # NO usar Optional[int]
```

**Path parameters con validación:**
```python
from typing import Annotated
from fastapi import Path

@app.get("/api/memes/{meme_id}")
async def get_meme(
    meme_id: Annotated[int, Path(ge=1, description="ID del meme")],
):
    ...
```

**Query parameters con modelo:**
```python
from fastapi import Query, Depends

@app.get("/api/memes")
async def get_memes(
    filters: Annotated[FilterParams, Query()],
):
    ...
```

**Respuestas de error consistentes:**
```python
from fastapi import HTTPException

# ✅ Usar HTTPException para errores HTTP
raise HTTPException(status_code=404, detail="Meme not found")

# ❌ Evitar retornar diccionarios de error
return {"error": "Meme not found"}  # No tiene status code correcto
```

### Modelos Pydantic

**Validación con Field:**
```python
from pydantic import BaseModel, Field

class FilterParams(BaseModel):
    limit: int = Field(default=100, gt=0, le=100)
    offset: int = Field(default=0, ge=0)
    order_by: Literal["rating", "date"] = "date"
```

**Validación de URLs:**
```python
from pydantic import HttpUrl

class MemeImage(BaseModel):
    url: HttpUrl
    width: int | None = None
    height: int | None = None
```

**Enums para valores fijos:**
```python
from enum import Enum

class MemeSource(str, Enum):
    REDDIT = "Reddit"
    TWITTER = "Twitter"
    DEVS = "Devs"
    UNKNOWN = "Unknown"
```

## Endpoints actuales

| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/` | Sirve index.html | ✅ |
| GET | `/api/memes` | Lista todos los memes | ✅ (falta filtros) |
| GET | `/api/memes/{id}` | Obtiene un meme | ⚠️ BUG: `!=` debe ser `==` |
| POST | `/api/memes` | Crea un meme | ✅ |
| PUT | `/api/memes/{id}` | Actualiza un meme | ✅ |
| DELETE | `/api/memes/{id}` | Elimina un meme | ❌ No implementado |

## Bugs conocidos

### GET /api/memes/{meme_id}
```python
# ❌ Actual (bug)
if meme.id != meme_id:
    return meme

# ✅ Correcto
if meme.id == meme_id:
    return meme
```

## TODO pendiente

1. **Arreglar bug** en GET por ID
2. **Implementar DELETE** `/api/memes/{meme_id}`
3. **Aplicar FilterParams** en GET `/api/memes`:
   - `limit` y `offset` para paginación
   - `order_by` para ordenar resultados
   - `tags` para filtrar (requiere añadir campo a Meme)
4. **Usar HTTPException** en lugar de `return {"error": ...}`
5. **Añadir tests** en carpeta `tests/`

## Testing

**Estructura de tests:**
```
tests/
├── __init__.py
├── conftest.py         # Fixtures compartidos
├── test_memes_api.py   # Tests de endpoints
└── test_models.py      # Tests de validación Pydantic
```

**Fixture básico:**
```python
import pytest
from fastapi.testclient import TestClient
from app import app

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
def sample_meme():
    return {
        "id": 99,
        "description": "Test meme",
        "image": {"url": "https://example.com/meme.jpg"},
        "source": "Devs"
    }
```

**Ejecutar tests:**
```bash
pytest                     # Todos los tests
pytest -v                  # Con detalle
pytest tests/test_memes_api.py  # Solo un archivo
pytest -k "test_get"       # Tests que coincidan con patrón
```

## Desarrollo local

```bash
# Activar entorno
source .venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar en modo desarrollo
fastapi dev app.py

# URLs
# - App: http://127.0.0.1:8000
# - Swagger: http://127.0.0.1:8000/docs
# - ReDoc: http://127.0.0.1:8000/redoc
```
