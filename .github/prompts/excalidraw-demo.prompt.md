---
name: excalidraw-demo
description: Investiga la aplicación del workspace actual y genera un diagrama de arquitectura en Excalidraw
---

# Objetivo

Crea un diagrama de arquitectura en Excalidraw para **la aplicación del workspace actual**. El diagrama debe ser visualmente claro, profesional y fácil de entender a primera vista.

---

## Paso 0 — Investigar la aplicación (OBLIGATORIO)

Antes de dibujar nada, **analiza el código fuente del workspace** para entender qué hace la aplicación. Realiza los siguientes pasos:

1. **Lee la estructura de carpetas** del proyecto completo
2. **Lee los archivos clave**: README, archivos de configuración, punto de entrada principal (ej: `app.py`, `main.py`, `index.js`, `server.ts`, etc.)
3. **Identifica las dependencias** leyendo `requirements.txt`, `package.json`, `Cargo.toml`, `go.mod` o el archivo de dependencias que corresponda
4. **Lee los modelos de datos** (carpeta `models/`, schemas, entidades, etc.)
5. **Lee las rutas/endpoints** del backend si los hay
6. **Lee el frontend** (HTML, templates, componentes) para entender la UI
7. **Identifica la base de datos** utilizada (archivos de conexión, migraciones, etc.)
8. **Identifica integraciones externas** (APIs de terceros, servicios cloud, etc.)

Con toda esa información, construye mentalmente:
- **Qué hace la app** (propósito principal)
- **Qué componentes tiene** (frontend, backend, BD, servicios externos, etc.)
- **Qué tecnologías usa** (lenguajes, frameworks, librerías, BD)
- **Qué funcionalidades ofrece** al usuario final

> ⚠️ NO inventes componentes ni tecnologías. Todo lo que aparezca en el diagrama debe estar respaldado por el código fuente real del proyecto.

---

## Estructura del diagrama

Organiza el contenido en **3 filas horizontales** separadas visualmente con títulos de sección:

| Fila | Sección                        | Color de fondo sugerido |
|------|--------------------------------|-------------------------|
| 1    | Componentes principales        | Azul (#E3F2FD)          |
| 2    | Tecnologías                    | Verde (#E8F5E9)         |
| 3    | Funcionalidades clave          | Naranja (#FFF3E0)       |

---

## Fila 1 — Componentes principales

Dibuja cada componente real de la aplicación como un **rectángulo** con borde sólido y color de relleno azul claro. Distribúyelos de izquierda a derecha.

Los componentes deben corresponder a lo que realmente existe en el código. Ejemplos típicos (incluye solo los que apliquen):
- Frontend / UI
- Backend / API
- Base de datos
- Servicios o módulos internos especializados
- APIs o servicios externos consumidos
- Autenticación (si existe)
- Workers / tareas en background (si existen)

### Conexiones (flechas)

Dibuja flechas entre los componentes que se comunican entre sí, basándote en lo que hayas visto en el código (llamadas HTTP, queries a BD, imports entre módulos, etc.).

Usa **flechas con etiqueta corta** que describan el tipo de interacción (ej: "REST", "SQL", "HTTP", "import").

---

## Fila 2 — Tecnologías

Dibuja cada tecnología como un **rectángulo con bordes redondeados** y color de relleno verde claro. Agrúpalas debajo del componente al que corresponden.

Las tecnologías deben extraerse directamente de:
- El archivo de dependencias (`requirements.txt`, `package.json`, etc.)
- Los imports en el código fuente
- Los archivos de configuración (Docker, CI/CD, etc.)

Conecta cada grupo de tecnologías al componente de la fila 1 con una **línea punteada vertical** (sin flecha).

---

## Fila 3 — Funcionalidades clave

Dibuja cada funcionalidad como un **rectángulo con relleno naranja claro** y una etiqueta descriptiva corta.

Las funcionalidades deben inferirse del código real: endpoints disponibles, vistas del frontend, operaciones CRUD, flujos de usuario, etc. No inventes funcionalidades que no estén implementadas.

Conecta cada funcionalidad al componente principal que la ejecuta con una **flecha punteada ascendente**.

---

## Reglas visuales obligatorias

- **Formas**: Rectángulos sólidos (componentes), rectángulos redondeados (tecnologías), rectángulos con icono o borde diferenciado (sistemas externos)
- **Flechas**: Sólidas para flujo de datos entre componentes; punteadas para relación tecnología↔componente y funcionalidad↔componente
- **Colores**: Cada fila usa una paleta distinta (azul, verde, naranja). Usar tonos pastel para fondos y colores más intensos para bordes
- **Etiquetas en flechas**: Máximo 2-3 palabras (ej: "REST API", "SQL Query", "JWT Auth")
- **Textos**: Fuente legible, tamaño mínimo que permita lectura sin zoom
- **Títulos de sección**: Texto grande y en negrita a la izquierda de cada fila

## Estilo general

- Minimalista y profesional
- Sin código ni pseudocódigo
- Enfocado en **relaciones y flujo de datos**, no en detalles de implementación
- Espaciado generoso entre elementos para evitar sobrecarga visual
- Tamaño del canvas: aprox. 1600×1000px
- El nombre de la aplicación debe aparecer como título principal del diagrama

