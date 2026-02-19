# 🤖 GitHub Copilot - Máster en IA Generativa

Repositorio de ejemplo para las clases de **GitHub Copilot** del **Máster en IA Generativa** de [The Bridge](https://www.thebridge.tech/).

## 📚 Clases que usan este repositorio

Este repositorio se utiliza en las siguientes clases del máster:

| Clase | Rama | Comando para clonar |
|-------|------|---------------------|
| **Desarrollo con GitHub Copilot y Python** | `clase-1` | `git clone --branch clase-1 https://github.com/thebridgeschooldemo/memes-app.git` |
| **Agentic DevOps** | `clase-2` | `git clone --branch clase-2 https://github.com/thebridgeschooldemo/memes-app.git` |
| **MCP Servers y GitHub Copilot** | `clase-3` | `git clone --branch clase-3 https://github.com/thebridgeschooldemo/memes-app.git` |

> 💡 **Tip**: Si quieres ver el código tal como estaba al finalizar una clase específica, usa el comando de la tabla para clonar esa rama.

## ❓ ¿Qué es esto?

Este repositorio contiene una aplicación web de ejemplo junto con todo el código y configuraciones necesarias para que puedas practicar lo que aprendiste durante las clases. Aquí podrás experimentar con GitHub Copilot, romper cosas, arreglarlas, y entender cómo funciona esta herramienta de inteligencia artificial que te ayuda a escribir código.

## 🚀 ¿Cómo empezar?

### 🍴 Opción 1: Hacer un Fork (Recomendado)

Haz click en el botón **"Fork"** en la parte superior derecha de este repositorio. Esto creará una copia en tu cuenta de GitHub donde podrás jugar libremente.

### 📋 Opción 2: Clonar el repositorio

Si prefieres trabajar en tu máquina local directamente:

```shell
git clone https://github.com/thebridgeschooldemo/memes-app.git
cd memes-app
```

## ⚙️ Instalación y Configuración

### 📋 Requisitos previos

- [Python 3.8+](https://www.python.org/downloads/)
- [Git](https://git-scm.com/downloads)

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

## ▶️ Ejecutar la aplicación

Una vez instaladas las dependencias, ejecuta:

```shell
fastapi dev app.py
```

¡Y listo! Ahora puedes acceder a la aplicación en:

- 🌐 **Aplicación**: http://127.0.0.1:8000
- 📚 **Documentación interactiva**: http://127.0.0.1:8000/docs
- 📖 **Documentación alternativa**: http://127.0.0.1:8000/redoc

## 🛠️ Tecnologías utilizadas

- ⚡ **[FastAPI](https://fastapi.tiangolo.com/)**: Framework web moderno y rápido para construir aplicaciones con Python
- 🤖 **[GitHub Copilot](https://github.com/features/copilot)**: Asistente de IA para programación

## 💡 ¿Necesitas ayuda?

- 📚 Consulta la [documentación de FastAPI](https://fastapi.tiangolo.com/tutorial/)
- 👀 Revisa el código en las carpetas `models/` y `database/` para ver cómo está estructurado
- 🎮 Experimenta, cambia cosas y aprende jugando

## 📄 Licencia

Este es un repositorio de ejemplo con fines educativos.