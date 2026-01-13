# Instrucciones para Copilot - Frontend (HTML/CSS/JavaScript)

Agente especializado en desarrollo frontend con enfoque en buenas prácticas, separación de responsabilidades y accesibilidad web.

## Principios fundamentales

### Separación de responsabilidades

**Detectar y proponer separación** cuando encuentres:
- CSS inline o en `<style>` → mover a archivo `.css` externo
- JavaScript en `<script>` inline → mover a archivo `.js` externo
- Más de 50 líneas de JS en HTML → definitivamente separar

**Estructura recomendada:**
```
static/
├── index.html          # Solo estructura HTML
├── css/
│   └── styles.css      # Estilos personalizados
├── js/
│   ├── app.js          # Lógica principal / inicialización
│   ├── api.js          # Llamadas a la API (fetch)
│   └── components.js   # Funciones que generan HTML
└── images/
```

### JavaScript moderno

**Usar:**
- `const` y `let` (nunca `var`)
- Arrow functions para callbacks: `items.map(item => ...)`
- Template literals: `` `Hola ${nombre}` ``
- Destructuring: `const { id, name } = meme`
- Optional chaining: `meme?.image?.url`
- Nullish coalescing: `value ?? 'default'`
- `async/await` en lugar de `.then()` chains
- Módulos ES6 cuando sea posible: `import/export`

**Manejo de errores:**
```javascript
try {
    const response = await fetch('/api/memes');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
} catch (error) {
    console.error('Error:', error);
    showUserFriendlyError('No se pudieron cargar los datos');
}
```

**Evitar:**
- `innerHTML` con datos del usuario (riesgo XSS) → usar `textContent` o sanitizar
- Variables globales innecesarias → encapsular en módulos o IIFE
- Event listeners en HTML (`onclick="..."`) → usar `addEventListener`

### HTML semántico

**Usar elementos semánticos:**
- `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`, `<article>`, `<section>`
- `<button>` para acciones, `<a>` para navegación
- Listas `<ul>/<ol>` para grupos de elementos similares
- `<figure>` y `<figcaption>` para imágenes con descripción

**Estructura base:**
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Descripción de la página">
    <title>Título descriptivo</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
    <script src="js/app.js" defer></script>
</body>
</html>
```

## Accesibilidad (a11y) - OBLIGATORIO

### Imágenes
```html
<!-- ✅ Correcto -->
<img src="meme.jpg" alt="Descripción significativa del contenido">

<!-- ✅ Decorativa (sin alt vacío, usar atributo vacío) -->
<img src="decoracion.svg" alt="" role="presentation">

<!-- ❌ Incorrecto -->
<img src="meme.jpg">
<img src="meme.jpg" alt="imagen">
```

### Formularios
```html
<!-- ✅ Correcto: label asociado -->
<label for="search">Buscar memes</label>
<input type="text" id="search" name="search">

<!-- ✅ Alternativa con aria-label -->
<input type="text" aria-label="Buscar memes" placeholder="Buscar...">

<!-- ❌ Incorrecto: sin label ni aria -->
<input type="text" placeholder="Buscar...">
```

### Botones e interacciones
```html
<!-- ✅ Correcto: texto descriptivo o aria-label -->
<button aria-label="Marcar como favorito">
    <i class="fa fa-heart" aria-hidden="true"></i>
</button>

<!-- ✅ Con texto visible -->
<button>
    <i class="fa fa-heart" aria-hidden="true"></i>
    <span>Me gusta</span>
</button>

<!-- ❌ Incorrecto: solo icono sin descripción -->
<button><i class="fa fa-heart"></i></button>
```

### Iconos (Font Awesome, etc.)
```html
<!-- Icono decorativo -->
<i class="fa fa-star" aria-hidden="true"></i>

<!-- Icono con significado (sin texto acompañante) -->
<span class="fa fa-warning" role="img" aria-label="Advertencia"></span>
```

### Estados de carga y cambios dinámicos
```html
<!-- Región que se actualiza -->
<div id="gallery" aria-live="polite" aria-busy="false">
    <!-- contenido dinámico -->
</div>

<!-- Durante la carga -->
<div aria-busy="true">
    <span class="spinner" aria-label="Cargando..."></span>
</div>

<!-- Estado vacío -->
<p role="status">No se encontraron resultados</p>
```

### Navegación por teclado
- Todos los elementos interactivos deben ser focuseables
- Orden de tabulación lógico (evitar `tabindex` > 0)
- Estados `:focus` visibles (no eliminar outline sin alternativa)
- Skip links para saltar navegación

```html
<a href="#main-content" class="skip-link">Saltar al contenido</a>
```

### Contraste y colores
- Ratio mínimo 4.5:1 para texto normal, 3:1 para texto grande
- No transmitir información solo con color (añadir iconos/texto)

## Checklist de revisión

Al revisar código frontend, verificar:

### Estructura
- [ ] HTML, CSS y JS en archivos separados
- [ ] Uso de elementos HTML semánticos
- [ ] Atributo `lang` en `<html>`
- [ ] Meta viewport presente
- [ ] Scripts con `defer` o al final del body

### Accesibilidad
- [ ] Todas las imágenes tienen `alt` apropiado
- [ ] Formularios con labels asociados
- [ ] Botones con texto o `aria-label`
- [ ] Iconos decorativos con `aria-hidden="true"`
- [ ] Regiones dinámicas con `aria-live`
- [ ] Estados de carga anunciados (`aria-busy`)
- [ ] Contraste de colores suficiente
- [ ] Navegable por teclado

### JavaScript
- [ ] Sin variables globales innecesarias
- [ ] Manejo de errores en fetch/async
- [ ] Sin `innerHTML` con datos de usuario
- [ ] Event listeners en JS (no inline)
- [ ] Código organizado en funciones/módulos

## Ejemplo de refactorización

**Detectar este patrón (todo junto):**
```html
<button class="text-gray-400" title="Me gusta">
    <i class="far fa-heart"></i>
</button>
```

**Proponer esta mejora:**
```html
<button class="btn-action" aria-label="Marcar como favorito" aria-pressed="false">
    <i class="far fa-heart" aria-hidden="true"></i>
    <span class="visually-hidden">Me gusta</span>
</button>
```

Con CSS en archivo separado:
```css
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}
```
