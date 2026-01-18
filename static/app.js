// Variables globales
let todosMemes = [];

// Cuando la página carga
document.addEventListener('DOMContentLoaded', () => {
    cargarMemes();
    configurarFiltros();
    configurarModal();
});

// Cargar memes del servidor
async function cargarMemes() {
    try {
        const respuesta = await fetch('/api/memes');
        todosMemes = await respuesta.json();
        mostrarMemes(todosMemes);
    } catch (error) {
        console.error('Error cargando memes:', error);
        mostrarError();
    }
}

// Mostrar memes en la galería
function mostrarMemes(memes) {
    const galeria = document.getElementById('galeria');
    galeria.innerHTML = ''; // Limpiar galería

    if (memes.length === 0) {
        galeria.innerHTML = '<p class="col-span-full text-center text-gray-500 py-8">No se encontraron memes con este filtro.</p>';
        return;
    }

    memes.forEach(meme => {
        const tarjeta = crearTarjeta(meme);
        galeria.appendChild(tarjeta);
    });
}

// Crear una tarjeta de meme
function crearTarjeta(meme) {
    // Crear el contenedor de la tarjeta
    const tarjeta = document.createElement('div');
    tarjeta.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer';
    tarjeta.onclick = () => abrirModal(meme);

    // Crear la imagen
    const img = document.createElement('img');
    img.src = meme.image.url;
    img.alt = meme.description;
    img.className = 'w-full h-64 object-cover';

    // Crear el contenedor de contenido
    const contenido = document.createElement('div');
    contenido.className = 'p-4';

    // Crear descripción
    const descripcion = document.createElement('p');
    descripcion.className = 'text-gray-800 font-medium mb-2';
    descripcion.textContent = meme.description;

    // Crear fuente
    const fuente = document.createElement('div');
    fuente.className = 'flex items-center justify-between';
    
    const fuenteSpan = document.createElement('span');
    fuenteSpan.className = 'inline-block px-2 py-1 rounded bg-blue-100 text-blue-800 text-sm';
    fuenteSpan.textContent = meme.source || 'Unknown';

    // Crear rating si existe
    if (meme.rating !== null && meme.rating !== undefined) {
        const ratingSpan = document.createElement('span');
        ratingSpan.className = 'text-yellow-500 text-sm';
        ratingSpan.textContent = '⭐'.repeat(meme.rating);
        fuente.appendChild(ratingSpan);
    }

    fuente.appendChild(fuenteSpan);
    
    // Ensamblar la tarjeta
    contenido.appendChild(descripcion);
    contenido.appendChild(fuente);
    tarjeta.appendChild(img);
    tarjeta.appendChild(contenido);

    return tarjeta;
}

// Configurar botones de filtro
function configurarFiltros() {
    const botonesFiltro = document.querySelectorAll('.filtro-btn');
    
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            // Actualizar estilos de botones
            botonesFiltro.forEach(btn => {
                btn.classList.remove('bg-blue-500', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            
            boton.classList.remove('bg-gray-200', 'text-gray-700');
            boton.classList.add('bg-blue-500', 'text-white');
            
            // Filtrar memes
            const fuente = boton.getAttribute('data-source');
            if (fuente === 'all') {
                mostrarMemes(todosMemes);
            } else {
                filtrarPorFuente(fuente);
            }
        });
    });
}

// Filtrar por fuente
function filtrarPorFuente(fuente) {
    const memesFiltrados = todosMemes.filter(meme => meme.source === fuente);
    mostrarMemes(memesFiltrados);
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

// Abrir modal con detalles
function abrirModal(meme) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalSource = document.getElementById('modal-source');
    const modalRating = document.getElementById('modal-rating');
    
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
