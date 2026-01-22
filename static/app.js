// Variables globales
let todosMemes = [];
let favoritos = JSON.parse(localStorage.getItem('meme-favoritos') || '[]');
let filtrosActivos = {
    fuentes: [],
    busqueda: '',
    ratingMinimo: 0,
    soloFavoritos: false
};

// Cuando la página carga
document.addEventListener('DOMContentLoaded', () => {
    configurarModoOscuro();
    cargarMemes();
    configurarFiltros();
    configurarBuscador();
    configurarModal();
    configurarMasFiltros();
});

// Configurar modo oscuro
function configurarModoOscuro() {
    const btnToggle = document.getElementById('toggle-modo');
    const iconoModo = document.getElementById('icono-modo');
    const root = document.documentElement;
    
    // Cargar preferencia guardada o usar 'claro' por defecto
    const modo = localStorage.getItem('modo') || 'claro';
    
    // Aplicar el modo guardado
    if (modo === 'oscuro') {
        root.classList.add('dark');
        iconoModo.textContent = '☀️';
    } else {
        root.classList.remove('dark');
        iconoModo.textContent = '🌑';
    }
    
    // Event listener para el toggle
    btnToggle.addEventListener('click', () => {
        const esOscuro = root.classList.toggle('dark');
        localStorage.setItem('modo', esOscuro ? 'oscuro' : 'claro');
        iconoModo.textContent = esOscuro ? '☀️' : '🌑';
    });
}

// Cargar memes del servidor
async function cargarMemes() {
    try {
        const respuesta = await fetch('/api/memes');
        todosMemes = await respuesta.json();
        aplicarFiltros();
    } catch (error) {
        console.error('Error cargando memes:', error);
        mostrarError();
    }
}

// Aplicar todos los filtros activos
function aplicarFiltros() {
    let memesFiltrados = [...todosMemes];
    
    // Filtrar por fuentes
    if (filtrosActivos.fuentes.length > 0) {
        memesFiltrados = memesFiltrados.filter(meme => 
            filtrosActivos.fuentes.includes(meme.source)
        );
    }
    
    // Filtrar por búsqueda
    if (filtrosActivos.busqueda) {
        const termino = filtrosActivos.busqueda.toLowerCase();
        memesFiltrados = memesFiltrados.filter(meme => 
            meme.description.toLowerCase().includes(termino)
        );
    }
    
    // Filtrar por rating mínimo
    if (filtrosActivos.ratingMinimo > 0) {
        memesFiltrados = memesFiltrados.filter(meme => 
            meme.rating >= filtrosActivos.ratingMinimo
        );
    }
    
    // Filtrar solo favoritos
    if (filtrosActivos.soloFavoritos) {
        memesFiltrados = memesFiltrados.filter(meme => 
            favoritos.includes(meme.id)
        );
    }
    
    mostrarMemes(memesFiltrados);
}

// Mostrar memes en la galería
function mostrarMemes(memes) {
    const galeria = document.getElementById('galeria');
    const sinResultados = document.getElementById('sin-resultados');
    
    galeria.innerHTML = '';

    if (memes.length === 0) {
        galeria.classList.add('hidden');
        sinResultados.classList.remove('hidden');
        return;
    }

    galeria.classList.remove('hidden');
    sinResultados.classList.add('hidden');

    memes.forEach(meme => {
        const tarjeta = crearTarjeta(meme);
        galeria.appendChild(tarjeta);
    });
}

// Crear una tarjeta de meme
function crearTarjeta(meme) {
    const esFavorito = favoritos.includes(meme.id);
    
    // Crear el contenedor de la tarjeta
    const tarjeta = document.createElement('div');
    tarjeta.className = 'meme-card bg-white dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer';
    tarjeta.dataset.memeId = meme.id;

    // Crear contenedor de imagen con indicador de fuente
    const imgContainer = document.createElement('div');
    imgContainer.className = 'relative';
    imgContainer.onclick = () => abrirModal(meme);

    // Crear la imagen
    const img = document.createElement('img');
    img.src = meme.image.url;
    img.alt = meme.description;
    img.className = 'w-full h-48 object-cover';
    img.loading = 'lazy';

    // Indicador de fuente (círculo en esquina superior derecha)
    const indicador = document.createElement('div');
    indicador.className = 'absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold';
    indicador.title = meme.source || 'Unknown';
    
    // Color según la fuente
    switch(meme.source) {
        case 'Reddit':
            indicador.className += ' bg-orange-500 text-white';
            indicador.innerHTML = 'R';
            break;
        case 'Twitter':
            indicador.className += ' bg-black text-white';
            indicador.innerHTML = 'X';
            break;
        case 'Devs':
            indicador.className += ' bg-green-500 text-white';
            indicador.innerHTML = '&lt;/&gt;';
            break;
        default:
            indicador.className += ' bg-gray-400 text-white';
            indicador.innerHTML = '?';
    }

    imgContainer.appendChild(img);
    imgContainer.appendChild(indicador);

    // Crear barra de acciones
    const acciones = document.createElement('div');
    acciones.className = 'flex items-center justify-start gap-4 p-3 border-t border-gray-100 dark:border-gray-700';

    // Botón favorito
    const btnFavorito = document.createElement('button');
    btnFavorito.className = `action-btn favorito text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 ${esFavorito ? 'active' : ''}`;
    btnFavorito.title = 'Favorito';
    btnFavorito.innerHTML = `
        <svg class="w-5 h-5" fill="${esFavorito ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
    `;
    btnFavorito.onclick = (e) => {
        e.stopPropagation();
        toggleFavorito(meme.id, btnFavorito);
    };

    // Botón descargar
    const btnDescargar = document.createElement('button');
    btnDescargar.className = 'action-btn text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400';
    btnDescargar.title = 'Descargar';
    btnDescargar.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
    `;
    btnDescargar.onclick = (e) => {
        e.stopPropagation();
        descargarMeme(meme);
    };

    // Botón enlace
    const btnEnlace = document.createElement('button');
    btnEnlace.className = 'action-btn text-gray-400 dark:text-gray-500 hover:text-green-500 dark:hover:text-green-400';
    btnEnlace.title = 'Copiar enlace';
    btnEnlace.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
        </svg>
    `;
    btnEnlace.onclick = (e) => {
        e.stopPropagation();
        copiarEnlace(meme);
    };

    acciones.appendChild(btnFavorito);
    acciones.appendChild(btnDescargar);
    acciones.appendChild(btnEnlace);
    
    // Ensamblar la tarjeta
    tarjeta.appendChild(imgContainer);
    tarjeta.appendChild(acciones);

    return tarjeta;
}

// Toggle favorito
function toggleFavorito(memeId, btn) {
    const index = favoritos.indexOf(memeId);
    if (index > -1) {
        favoritos.splice(index, 1);
        btn.classList.remove('active');
        btn.querySelector('svg').setAttribute('fill', 'none');
    } else {
        favoritos.push(memeId);
        btn.classList.add('active');
        btn.querySelector('svg').setAttribute('fill', 'currentColor');
    }
    localStorage.setItem('meme-favoritos', JSON.stringify(favoritos));
    
    // Re-aplicar filtros si está activo "solo favoritos"
    if (filtrosActivos.soloFavoritos) {
        aplicarFiltros();
    }
}

// Descargar meme
async function descargarMeme(meme) {
    try {
        const response = await fetch(meme.image.url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `meme-${meme.id}.${meme.image.url.split('.').pop() || 'jpg'}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error descargando meme:', error);
        // Fallback: abrir en nueva pestaña
        window.open(meme.image.url, '_blank');
    }
}

// Copiar enlace
function copiarEnlace(meme) {
    const url = meme.image.url;
    navigator.clipboard.writeText(url).then(() => {
        // Mostrar feedback temporal
        mostrarNotificacion('Enlace copiado al portapapeles');
    }).catch(() => {
        // Fallback
        window.open(url, '_blank');
    });
}

// Mostrar notificación temporal
function mostrarNotificacion(mensaje) {
    const notif = document.createElement('div');
    notif.className = 'fixed bottom-4 right-4 bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse';
    notif.textContent = mensaje;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
}

// Configurar filtros del panel lateral
function configurarFiltros() {
    const filtrosContainer = document.getElementById('filtros-fuente');
    const limpiarBtn = document.getElementById('limpiar-filtros');
    
    // Configurar checkboxes de fuente
    filtrosContainer.querySelectorAll('.filter-item').forEach(item => {
        item.addEventListener('click', () => {
            const checkbox = item.querySelector('.filtro-checkbox');
            const fuente = item.dataset.source;
            
            // Toggle estado
            item.classList.toggle('active');
            checkbox.checked = !checkbox.checked;
            
            // Actualizar filtros activos
            if (checkbox.checked) {
                if (!filtrosActivos.fuentes.includes(fuente)) {
                    filtrosActivos.fuentes.push(fuente);
                }
            } else {
                filtrosActivos.fuentes = filtrosActivos.fuentes.filter(f => f !== fuente);
            }
            
            aplicarFiltros();
        });
    });
    
    // Botón limpiar filtros
    limpiarBtn.addEventListener('click', () => {
        // Resetear todos los filtros
        filtrosActivos = {
            fuentes: [],
            busqueda: '',
            ratingMinimo: 0,
            soloFavoritos: false
        };
        
        // Resetear UI
        document.querySelectorAll('.filter-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.filtro-checkbox').checked = false;
        });
        
        document.getElementById('buscador').value = '';
        
        document.querySelectorAll('.rating-filter').forEach(btn => {
            btn.classList.remove('bg-yellow-100', 'border-yellow-400');
        });
        
        const soloFavoritosCheck = document.getElementById('solo-favoritos');
        if (soloFavoritosCheck) soloFavoritosCheck.checked = false;
        
        aplicarFiltros();
    });
    
    // Configurar filtros de rating
    document.querySelectorAll('.rating-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            const rating = parseInt(btn.dataset.rating);
            
            // Toggle: si ya está seleccionado, deseleccionar
            if (filtrosActivos.ratingMinimo === rating) {
                filtrosActivos.ratingMinimo = 0;
                btn.classList.remove('bg-yellow-100', 'border-yellow-400');
            } else {
                // Deseleccionar otros
                document.querySelectorAll('.rating-filter').forEach(b => {
                    b.classList.remove('bg-yellow-100', 'border-yellow-400');
                });
                filtrosActivos.ratingMinimo = rating;
                btn.classList.add('bg-yellow-100', 'border-yellow-400');
            }
            
            aplicarFiltros();
        });
    });
    
    // Configurar filtro solo favoritos
    const soloFavoritosCheck = document.getElementById('solo-favoritos');
    if (soloFavoritosCheck) {
        soloFavoritosCheck.addEventListener('change', () => {
            filtrosActivos.soloFavoritos = soloFavoritosCheck.checked;
            aplicarFiltros();
        });
    }
}

// Configurar buscador
function configurarBuscador() {
    const buscador = document.getElementById('buscador');
    let timeout;
    
    buscador.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            filtrosActivos.busqueda = buscador.value.trim();
            aplicarFiltros();
        }, 300); // Debounce de 300ms
    });
}

// Configurar sección "Más filtros"
function configurarMasFiltros() {
    const btn = document.getElementById('mas-filtros-btn');
    const filtrosAdicionales = document.getElementById('filtros-adicionales');
    const icono = document.getElementById('mas-filtros-icon');
    
    btn.addEventListener('click', () => {
        filtrosAdicionales.classList.toggle('hidden');
        icono.classList.toggle('rotate-180');
    });
}

// Configurar eventos del modal
function configurarModal() {
    const modal = document.getElementById('modal');
    const btnCerrar = document.getElementById('modal-close');
    const btnCerrarFooter = document.getElementById('modal-close-btn');
    
    // Cerrar modal al hacer clic en X
    btnCerrar.addEventListener('click', cerrarModal);
    
    // Cerrar modal al hacer clic en botón de cerrar
    btnCerrarFooter.addEventListener('click', cerrarModal);
    
    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });
    
    // Cerrar modal con la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cerrarModal();
        }
    });
}

// Variable para guardar el meme actual del modal
let memeActualModal = null;

// Abrir modal con detalles
function abrirModal(meme) {
    memeActualModal = meme;
    const esFavorito = favoritos.includes(meme.id);
    
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalSource = document.getElementById('modal-source');
    const modalRating = document.getElementById('modal-rating');
    const modalFavorito = document.getElementById('modal-favorito');
    const modalDescargar = document.getElementById('modal-descargar');
    const modalEnlace = document.getElementById('modal-enlace');
    
    // Llenar el modal con datos del meme
    modalImage.src = meme.image.url;
    modalImage.alt = meme.description;
    
    modalDescription.textContent = meme.description;
    modalSource.textContent = meme.source || 'Unknown';
    
    if (meme.rating !== null && meme.rating !== undefined) {
        modalRating.textContent = '⭐'.repeat(meme.rating) + ` (${meme.rating}/5)`;
    } else {
        modalRating.textContent = 'Sin calificación';
    }
    
    // Actualizar estado favorito del modal
    if (esFavorito) {
        modalFavorito.classList.add('text-red-500');
        modalFavorito.querySelector('svg').setAttribute('fill', 'currentColor');
    } else {
        modalFavorito.classList.remove('text-red-500');
        modalFavorito.querySelector('svg').setAttribute('fill', 'none');
    }
    
    // Configurar acciones del modal
    modalFavorito.onclick = () => {
        const tarjetaBtn = document.querySelector(`[data-meme-id="${meme.id}"] .favorito`);
        toggleFavorito(meme.id, tarjetaBtn);
        
        // Actualizar UI del modal
        const nuevoEstado = favoritos.includes(meme.id);
        if (nuevoEstado) {
            modalFavorito.classList.add('text-red-500');
            modalFavorito.querySelector('svg').setAttribute('fill', 'currentColor');
        } else {
            modalFavorito.classList.remove('text-red-500');
            modalFavorito.querySelector('svg').setAttribute('fill', 'none');
        }
    };
    
    modalDescargar.onclick = () => descargarMeme(meme);
    modalEnlace.href = meme.image.url;
    
    // Mostrar el modal
    modal.classList.remove('hidden');
    
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
    
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
}

// Mostrar mensaje de error si falla la carga de memes
function mostrarError() {
    const galeria = document.getElementById('galeria');
    galeria.innerHTML = '<p class="col-span-full text-center text-red-500 py-8">Error al cargar los memes. Por favor, intenta nuevamente.</p>';
}
