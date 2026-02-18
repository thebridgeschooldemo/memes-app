---
name: drawio-demo
description: Investiga la aplicación del workspace actual y genera un diagrama de arquitectura con Draw.io
---

# Mockup de UI - Memes App 🎨

## Objetivo
Crear un mockup interactivo y profesional de la interfaz de usuario de la aplicación de memes usando formas y componentes de wireframing de draw.io. Mostrar cómo se vería la experiencia del usuario.

### Referencias de Inspiración
- Template Bootstrap en draw.io: https://raw.githubusercontent.com/jgraph/drawio-diagrams/dev/templates/layout/bootstrap_1.xml
- Usar estilos comunes de mockups web profesionales con elementos reutilizables y bien organizados

## Requisitos del Mockup

### 1. Estructura de Pantalla Principal
- **Header/Navegación**: Logo, título, navegación principal
- **Barra de Búsqueda**: Campo de entrada con icono de búsqueda
- **Panel de Filtros**: Opciones de filtrado (por fuente, categoría)
- **Galería/Grid de Memes**: Visualización principal de memes
- **Sidebar opcional**: Fuentes de memes disponibles
- **Footer**: Información y créditos

### 2. Componentes de Interfaz
- **Input Fields**: Campos de búsqueda con placeholder
- **Buttons**: Botones de acción (Buscar, Filtrar, Cargar más)
- **Tarjetas de Meme**: Cards con imagen, título, fuente
- **Chips/Tags**: Filtros aplicados visibles
- **Badges**: Indicadores de cantidad (ej: "12 memes encontrados")
- **Dropdowns**: Selector de categoría/fuente

### 3. Funcionalidades Clave Visibles
- 🔍 Campo de búsqueda prominente
- 🎯 Opciones de filtrado visuales
- 📚 Lista/grid de memes descubiertos
- 👆 Interactividad clara (hover states, estados activos)
- 📱 Indicadores de carga/estado

## Especificaciones Visuales Avanzadas

### Paleta de Colores Premium
- **Header (Púrpura Profesional)**: #9C27B0 con gradiente a #7B1FA2
- **Elementos Interactivos (Azul Vibrante)**: #00BCD4 / #0277BD - para botones y enlaces
- **Acento Naranja**: #FF9800 para elementos destacados (favoritos, nuevos)
- **Fondo Base**: #FAFAFA (gris muy claro)
- **Texto Principal**: #212121 (casi negro)
- **Texto Secundario**: #757575 (gris medio)
- **Bordes**: #E0E0E0 (gris claro)

### Componentes de Wireframing (Formas draw.io)
- **Header**: Rectangle filled, rounded corners 8px, sombra suave
- **Search Bar**: Combined input + button, border-radius 24px, sombra interna
- **Filter Tags**: Chips con borde, corners 16px, color de fondo pastel
- **Meme Cards**: 
  - Rectángulos redondeados 10px
  - Área de imagen (placeholder con degradado)
  - Título y metadata debajo
  - Sombra drop-shadow 0 2px 8px
- **Buttons**: 
  - Primary: filled, rounded 6px, shadow
  - Secondary: outline, rounded 6px
  - Tertiary: text-only
- **Grid Layout**: 3-4 columnas en desktop, responsive

### Tipografía y Texto
- **Header Title**: Bold, 24pt, #9C27B0
- **Subtítulos de sección**: Bold, 14pt, #212121
- **Body text**: Regular 12-13pt, #424242
- **Placeholders**: Italic 12pt, #9E9E9E
- **Etiquetas/Tags**: Bold 11pt, #FFFFFF on colored background

### Efectos Visuales Avanzados
- **Hover States**: 
  - Cards: sombra aumenta, background ligeramente oscuro
  - Buttons: darkening del color base, shadow enhancement
- **Active States**: Borde coloreado 2px, fondo de acento suave
- **Disabled States**: Opacidad 50%, cursor not-allowed
- **Loading States**: Spinner/skeleton placeholders animados
- **Focus States**: Borde distinctivo 2px en color principal

### Espaciado y Tipografía
- **Header Height**: 64px
- **Padding elementos**: 16px (estándar), 12px (compacto), 20px (generoso)
- **Gap entre cards**: 16px
- **Border radius estándar**: 8px para componentes, 24px para pills
- **Márgenes contenedor**: 20px a los lados, 16px arriba/abajo

### Elementos Interactivos draw.io
Usar formas nativas de mockup:
- Input fields (dx.io shape library)
- Button components
- Image placeholders con degradado
- Text shapes para etiquetas
- Groups para organizar secciones
- Connector lines para mostrar flujo/relaciones

## Resultado Esperado
Un mockup profesional que cumpla con:
1. ✨ Diseño limpio y moderno, visualmente atractivo
2. 📱 Layout responsive mostrado en una vista desktop
3. 🎨 Paleta coherente con purple accent/blue primary
4. 🔍 Prominencia clara del campo de búsqueda
5. 📊 Visualización clara de memes en grid
6. 🎯 Filtros visibles e intuitivos
7. ✅ Estados visuales claros (hover, active, disabled)
8. 👥 Legibilidad y accesibilidad (alto contraste, espaciado)
9. 💡 Facilidad de entender UX: qué hace cada elemento
10. 🎭 Propuesta visual atractiva para presentaciones/demos

## Buenas Prácticas para Draw.io

### Estructura XML Recomendada
- Usar atributos de estilo simples y directos (sin valores complejos)
- Evitar propiedades CSS innecesarias
- Preferir elementos básicos (rectangle, text) antes que formas complejas
- Usar `html=1` solo cuando sea necesario para formato de texto

### Organización del Diagrama
- Agrupar elementos por secciones (header, search, sidebar, grid, footer)
- Usar IDs descriptivos para cada componente (ej: `card1`, `filter-all`)
- Mantener z-ordering coherente (backgrounds al fondo, contenido arriba)
- Dejar espacio entre elementos para claridad visual

### Colores y Estilos
- Aplicar sombras suaves (`shadow=1`) para profundidad
- Usar paleta limitada y coherente
- Respetar espaciado: padding 16px standard, 12px compacto, 20px generoso
- Border radius: 0 (rectangular), 1 (ligeramente redondeado), completo para pills

### Componentes Principales
1. **Header**: Rectangle alto (70-80px), color principal, sombra
2. **Search Section**: Container blanco con border, botón accent, filtros como chips
3. **Sidebar**: Fondo más claro, lista de opciones seleccionable
4. **Grid Cards**: Uniformes, con espaciado consistent, sombra pickup en hover
5. **Buttons**: Primary (filled color), Secondary (outline), Tertiary (text only)

### Tips de Rendimiento
- Mantener XML limpio (evitar metadata innecesaria)
- Usar `modified`, `agent`, `version` con valores válidos en tag mxfile
- Incluir IDs únicos para cada elemento
- Testear la carga del archivo antes de compartir
