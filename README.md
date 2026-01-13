# 🤖 Desarrollo con GitHub Copilot

Repositorio de ejemplo para la clase **"Desarrollo con GitHub Copilot"** del **Máster en IA Generativa** de [The Bridge](https://www.thebridge.tech/).

## ¿Qué es esto?

Este repositorio contiene una aplicación web de ejemplo junto con todo el código y configuraciones necesarias para que puedas practicar lo que aprendiste durante la clase. Aquí podrás experimentar con GitHub Copilot, romper cosas, arreglarlas, y entender cómo funciona esta herramienta de inteligencia artificial que te ayuda a escribir código.

---

## 🌳 Rama "personalizaciones"

Este branch contiene **personalizaciones y extensiones para GitHub Copilot** que amplían sus capacidades mediante archivos de configuración especializados en la carpeta [`.github`](.github). Estos archivos te permiten:

- 📋 **Definir instrucciones personalizadas** para Copilot
- 🤖 **Crear agentes autónomos** para tareas específicas
- 💡 **Desarrollar prompts reutilizables** para patrones comunes
- 🛠️ **Construir skills personalizadas** para expandir funcionalidades

### 📁 Estructura de Personalizaciones

```
.github/
├── copilot-instructions.md       # 📋 Instrucciones para Copilot
├── agents/                        # 🤖 Agentes autónomos
│   ├── codetour-agent.agent.md   # Tour guiado de código
│   └── test-specialist.agent.md  # Especialista en testing
├── prompts/                       # 💡 Prompts educativos
│   └── add-educational-comments.prompt.md  # Agregar comentarios educativos
└── skills/                        # 🛠️ Skills personalizadas
    └── mermaid-diagrams/         # Generador de diagramas
```

### 🎯 Componentes Incluidos

#### 📋 **Instrucciones Base** (`copilot-instructions.md`)
Instrucciones de configuración para Copilot en todo el proyecto, incluyendo convenciones de código, arquitectura y guías específicas para FastAPI y Frontend.

#### 🤖 **Agentes** (`.github/agents/`)

**CodeTour Expert** (`codetour-agent.agent.md`)
- Crea tours interactivos de código en VS Code
- Guías paso a paso para onboarding de nuevos desarrolladores
- Soporte para múltiples lenguajes y tipos de pasos

**Test Specialist** (`test-specialist.agent.md`)
- Especialista autónomo en testing
- Ayuda a crear tests comprensivos para FastAPI
- Implementa mejores prácticas de cobertura de tests

#### 💡 **Prompts Educativos** (`.github/prompts/`)

**Agregar Comentarios Educativos** (`add-educational-comments.prompt.md`)
- Transforma código en recurso educativo
- Agrega comentarios explicativos automáticos en español
- Adapta el nivel de detalle según experiencia del usuario
- Incluye emojis para mejorar claridad visual

#### 🛠️ **Skills Personalizadas** (`.github/skills/`)

**Mermaid Diagrams** (`mermaid-diagrams/`)
- Genera diagramas de arquitectura automáticamente
- Soporta flowcharts, sequence diagrams, ER diagrams
- Temas y estilos personalizables (classic, neo, hand-drawn)

---

## 🚀 ¿Cómo empezar?

### 🍴 Opción 1: Hacer un Fork (Recomendado)

Haz click en el botón **"Fork"** en la parte superior derecha de este repositorio. Esto creará una copia en tu cuenta de GitHub donde podrás jugar libremente.

### 📋 Opción 2: Clonar el repositorio

Si prefieres trabajar en tu máquina local directamente:

```shell
git clone https://github.com/thebridgeschooldemo/memes-app.git
cd memes-app
```

Para acceder a este branch de personalizaciones:

```shell
git checkout personalizaciones
```

---

## ⚙️ Instalación y Configuración

### 1️⃣ Crear un entorno virtual

```shell
python -m venv .venv
```

### 2️⃣ Activar el entorno virtual

En **macOS/Linux**:
```shell
source .venv/bin/activate
```

En **Windows**:
```shell
.venv\Scripts\activate
```

### 3️⃣ Instalar las dependencias

```shell
pip install -r requirements.txt
```

---

## ▶️ Ejecutar la aplicación

Una vez instaladas las dependencias, ejecuta:

```shell
fastapi dev app.py
```

¡Y listo! Ahora puedes acceder a la aplicación en:

- 🌐 **Aplicación**: http://127.0.0.1:8000
- 📚 **Documentación interactiva**: http://127.0.0.1:8000/docs
- 📖 **Documentación alternativa**: http://127.0.0.1:8000/redoc

---

## 🛠️ Tecnologías utilizadas

- ⚡ **[FastAPI](https://fastapi.tiangolo.com/)**: Framework web moderno y rápido para construir aplicaciones con Python
- 🤖 **[GitHub Copilot](https://github.com/features/copilot)**: Asistente de IA para programación
- 🗺️ **[CodeTour](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour)**: Guías interactivas de código en VS Code
- 📊 **[Mermaid](https://mermaid.js.org/)**: Generación de diagramas desde código

---

## 💡 ¿Necesitas ayuda?

- 📚 Consulta la [documentación de FastAPI](https://fastapi.tiangolo.com/tutorial/)
- 👀 Revisa el código en las carpetas `models/` y `database/` para ver cómo está estructurado
- 🎮 Experimenta, cambia cosas y aprende jugando
- 🤖 Prueba las personalizaciones: agents, prompts y skills en `.github/`

---

## 🎓 Aprende con Copilot

Las personalizaciones incluidas en este branch te permiten:

1. **Solicitar tour automático** del código usando el CodeTour Expert agent
2. **Agregar comentarios educativos** automáticos a cualquier archivo
3. **Generar diagramas** de arquitectura con prompts de Mermaid
4. **Ejecutar tests** con asistencia especializada

Experimenta con Copilot para descubrir cómo estas herramientas pueden acelerar tu desarrollo 🚀

---

## 📄 Licencia

Este es un repositorio de ejemplo con fines educativos.