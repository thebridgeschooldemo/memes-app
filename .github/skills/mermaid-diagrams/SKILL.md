---
name: mermaid-diagrams
description: Expert in generating Mermaid diagrams to explain how projects work. Use when users request: (1) Create architecture diagrams, flowcharts, or sequence diagrams, (2) Visualize how a codebase works, (3) Generate diagrams with custom looks (classic, neo, hand-drawn) and themes (forest, dark, neutral, neo-dark, base), (4) Style diagrams with themeVariables and custom node classes. Triggers: 'crear diagrama', 'generar diagrama', 'visualizar arquitectura', 'explicar flujo', 'make diagram', 'architecture diagram', 'flowchart', 'sequence diagram'.
---

# Mermaid Diagrams

Generate Mermaid diagrams to explain project architecture, workflows, and code relationships.

## Workflow

1. **Analyze** the project structure to understand components and relationships
2. **Ask user** for preferred look and theme (see options below)
3. **Generate** the diagram with proper frontmatter configuration
4. **Style** specific nodes if needed for emphasis

## Look Options (ask user)

| Look | Description |
|------|-------------|
| `classic` | Traditional Mermaid appearance (default) |
| `neo` | Modern, clean aesthetic |
| `handDrawn` | Sketch-style using RoughJS |

## Theme Options (ask user)

| Theme | Description |
|-------|-------------|
| `default` | Standard Mermaid colors |
| `forest` | Green-based palette |
| `dark` | Dark background |
| `neutral` | Grayscale tones |
| `neo` | Modern light theme |
| `neo-dark` | Modern dark theme |
| `base` | Customizable base theme |

## Diagram Frontmatter

Configure look and theme at the start of the diagram:

```
---
config:
  look: handDrawn
  theme: forest
---
flowchart TD
    A[Start] --> B[Process]
```

## Custom Theme Variables

Use `base` theme to customize colors. Mermaid auto-adjusts derived colors:

```
---
config:
  theme: base
  themeVariables:
    primaryColor: "#4f46e5"
    primaryTextColor: "#ffffff"
    primaryBorderColor: "#3730a3"
    lineColor: "#6366f1"
    secondaryColor: "#818cf8"
    tertiaryColor: "#c7d2fe"
    fontFamily: "Inter, sans-serif"
    fontSize: "14px"
---
```

Key variables:
- `primaryColor`: Main node background
- `primaryTextColor`: Text in primary nodes
- `primaryBorderColor`: Node borders
- `lineColor`: Arrows and connections
- `secondaryColor`: Secondary elements
- `tertiaryColor`: Tertiary/background elements

## Styling Specific Nodes

### Inline style

```
flowchart TD
    A[Critical]
    style A fill:#ef4444,stroke:#b91c1c,stroke-width:3px,color:#fff
```

### Class definitions (preferred for multiple nodes)

```
flowchart TD
    classDef error fill:#ef4444,stroke:#b91c1c,color:#fff
    classDef success fill:#22c55e,stroke:#16a34a,color:#fff
    classDef warning fill:#f59e0b,stroke:#d97706,color:#000
    
    A[Error Node]:::error
    B[Success Node]:::success
    C[Warning Node]:::warning
```

## Diagram Types

### Flowchart (architecture, workflows)

```
flowchart TD
    subgraph Frontend
        UI[index.html]
    end
    subgraph Backend
        API[app.py] --> DB[(database)]
    end
    UI -->|HTTP| API
```

### Sequence (API calls, interactions)

```
sequenceDiagram
    participant C as Client
    participant A as API
    participant D as Database
    C->>A: GET /api/memes
    A->>D: Query memes
    D-->>A: Results
    A-->>C: JSON response
```

### Class (models, relationships)

```
classDiagram
    class Meme {
        +int id
        +str description
        +MemeImage image
        +MemeSource source
    }
    class MemeImage {
        +HttpUrl url
        +int width
        +int height
    }
    Meme --> MemeImage
```

### ER (database schema)

```
erDiagram
    MEME {
        int id PK
        string description
        string source
    }
    MEME_IMAGE {
        int id PK
        string url
        int width
        int height
    }
    MEME ||--|| MEME_IMAGE : has
```

## Example Prompt Flow

When user asks for a diagram:

1. "¿Qué tipo de diagrama necesitas? (flowchart, sequence, class, ER)"
2. "¿Qué look prefieres? classic (tradicional), neo (moderno), handDrawn (dibujado a mano)"
3. "¿Qué tema de colores? forest, dark, neutral, neo, neo-dark, o colores personalizados"
4. Generate diagram with chosen configuration
