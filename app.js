// Variables globales
let bitacoras = [];
let bitacoraEditando = null;
const PASSWORD_EDITOR = "081624";

// Datos iniciales de las 6 bitácoras
const bitacorasIniciales = [
    {
        id: 1,
        titulo: "Jorge Luis Borges - El cuento y el infinito",
        tema: "Jorge Luis Borges",
        fecha: "2024-09-01",
        contenido: "Análisis de cómo Borges utiliza los laberintos y el infinito en sus cuentos para explorar la naturaleza de la realidad y la identidad personal.",
        imagen: "https://images.unsplash.com/photo-150784272343-583f20270319?w=400",
        video: "",
        audio: "",
        enlaces: ""
    },
    {
        id: 2,
        titulo: "Alfonsina Storni - Feminismo y poesía",
        tema: "Alfonsina Storni",
        fecha: "2024-09-08",
        contenido: "Exploración de la voz lírica femenina en la poesía de Storni y su crítica a las normas sociales a través de una estética innovadora.",
        imagen: "https://images.unsplash.com/photo-1507842872343-583f20270319?w=400",
        video: "",
        audio: "",
        enlaces: ""
    },
    {
        id: 3,
        titulo: "Julio Cortázar - La novela experimental",
        tema: "Julio Cortázar",
        fecha: "2024-09-15",
        contenido: "Análisis de 'Rayuela' y la ruptura con la narrativa tradicional. Estudio de cómo Cortázar revoluciona la forma de contar historias.",
        imagen: "https://images.unsplash.com/photo-1507842872343-583f20270319?w=400",
        video: "",
        audio: "",
        enlaces: ""
    },
    {
        id: 4,
        titulo: "Macedonio Fernández - La metaficción",
        tema: "Macedonio Fernández",
        fecha: "2024-09-22",
        contenido: "Estudio de la metaficción en la obra de Macedonio Fernández y su influencia en la literatura experimental argentina.",
        imagen: "https://images.unsplash.com/photo-1507842872343-583f20270319?w=400",
        video: "",
        audio: "",
        enlaces: ""
    },
    {
        id: 5,
        titulo: "Haroldo Conti - La narrativa moderna",
        tema: "Haroldo Conti",
        fecha: "2024-09-29",
        contenido: "Análisis de la propuesta narrativa moderna de Conti y su búsqueda de nuevas formas de expresión en la prosa argentina.",
        imagen: "https://images.unsplash.com/photo-1507842872343-583f20270319?w=400",
        video: "",
        audio: "",
        enlaces: ""
    },
    {
        id: 6,
        titulo: "Leopoldo Lugones - La estética modernista",
        tema: "Leopoldo Lugones",
        fecha: "2024-10-06",
        contenido: "Exploración de la estética modernista en la obra de Lugones y su contribución a la literatura argentina de principios del siglo XX.",
        imagen: "https://images.unsplash.com/photo-1507842872343-583f20270319?w=400",
        video: "",
        audio: "",
        enlaces: ""
    }
];

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    cargarBitacoras();
    inicializarEventos();
    aplicarColoresGuardados();
});

// Cargar bitácoras desde Firebase o usar las iniciales
async function cargarBitacoras() {
    try {
        const snapshot = await db.collection(COLECCION_BITACORAS).get();
        if (snapshot.empty) {
            // Si no hay bitácoras, crear las iniciales
            bitacoras = [...bitacorasIniciales];
            guardarBitacorasEnFirebase();
        } else {
            bitacoras = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        }
        mostrarBitacoras();
    } catch (error) {
        console.error("Error cargando bitácoras:", error);
        // Usar bitácoras iniciales si hay error con Firebase
        bitacoras = [...bitacorasIniciales];
        mostrarBitacoras();
    }
}

// Guardar bitácoras en Firebase
async function guardarBitacorasEnFirebase() {
    try {
        for (const bitacora of bitacoras) {
            await db.collection(COLECCION_BITACORAS).doc(bitacora.id.toString()).set(bitacora);
        }
    } catch (error) {
        console.error("Error guardando en Firebase:", error);
    }
}

// Mostrar bitácoras en modo lector
function mostrarBitacoras() {
    const grid = document.getElementById('bitacorasGrid');
    grid.innerHTML = '';

    bitacoras.forEach(bitacora => {
        const card = document.createElement('div');
        card.className = 'bitacora-card';
        card.innerHTML = `
            ${bitacora.imagen ? `<img src="${bitacora.imagen}" alt="${bitacora.titulo}" class="bitacora-image" onerror="this.src='https://via.placeholder.com/400x200?text=Sin+imagen'">` : ''}
            <div class="bitacora-content">
                <h3>${bitacora.titulo}</h3>
                <p class="bitacora-tema">📚 ${bitacora.tema}</p>
                <p class="bitacora-fecha">📅 ${new Date(bitacora.fecha).toLocaleDateString('es-AR')}</p>
                <p class="bitacora-text">${bitacora.contenido}</p>
                <div class="bitacora-media">
                    ${bitacora.video ? `<button onclick="abrirEnPestana('${bitacora.video}')">▶️ Ver video</button>` : ''}
                    ${bitacora.audio ? `<button onclick="abrirEnPestana('${bitacora.audio}')">🎵 Escuchar audio</button>` : ''}
                    ${bitacora.enlaces ? `<button onclick="mostrarEnlaces('${bitacora.id}')">🔗 Enlaces</button>` : ''}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Mostrar bitácoras en modo editor
function mostrarBitacorasEditar() {
    const container = document.getElementById('bitacorasEditar');
    container.innerHTML = '';

    bitacoras.forEach(bitacora => {
        const item = document.createElement('div');
        item.className = 'bitacora-edit-item';
        item.innerHTML = `
            <div class="bitacora-edit-info">
                <h4>${bitacora.titulo}</h4>
                <p>${bitacora.tema}</p>
            </div>
            <button class="btn-edit" onclick="abrirEditarBitacora(${bitacora.id})">✏️ Editar</button>
        `;
        container.appendChild(item);
    });
}

// Inicializar eventos
function inicializarEventos() {
    // Botón acceder editor
    document.getElementById('btnEditor').addEventListener('click', function() {
        document.getElementById('modalPassword').classList.remove('hidden');
    });

    // Botón confirmar contraseña
    document.getElementById('btnConfirmPassword').addEventListener('click', function() {
        const password = document.getElementById('passwordInput').value;
        if (password === PASSWORD_EDITOR) {
            document.getElementById('modalPassword').classList.add('hidden');
            document.getElementById('modoLector').classList.add('hidden');
            document.getElementById('modoEditor').classList.remove('hidden');
            mostrarBitacorasEditar();
            document.getElementById('passwordInput').value = '';
        } else {
            alert('Contraseña incorrecta');
        }
    });

    // Botón cancelar modal
    document.getElementById('btnCancelPassword').addEventListener('click', function() {
        document.getElementById('modalPassword').classList.add('hidden');
        document.getElementById('passwordInput').value = '';
    });

    // Enter en campo contraseña
    document.getElementById('passwordInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('btnConfirmPassword').click();
        }
    });

    // Botón salir del editor
    document.getElementById('btnSalir').addEventListener('click', function() {
        document.getElementById('modoEditor').classList.add('hidden');
        document.getElementById('modoLector').classList.remove('hidden');
    });

    // Botón guardar bitácora
    document.getElementById('btnGuardarBitacora').addEventListener('click', guardarBitacora);

    // Botón cancelar edición
    document.getElementById('btnCancelEdit').addEventListener('click', cerrarModalEditarBitacora);

    // Botón cerrar modal
    document.getElementById('btnCerrarModal').addEventListener('click', cerrarModalEditarBitacora);

    // Cambio de colores
    document.getElementById('colorPrincipal').addEventListener('change', aplicarColores);
    document.getElementById('colorSecundario').addEventListener('change', aplicarColores);
    document.getElementById('colorFondo').addEventListener('change', aplicarColores);

    // Botón Copilot para colores
    document.getElementById('btnCopilotColores').addEventListener('click', abrirCopilotColores);

    // Cerrar Copilot
    document.getElementById('btnCerrarCopilot').addEventListener('click', cerrarCopilot);

    // Enviar mensaje Copilot
    document.getElementById('btnEnviarCopilot').addEventListener('click', enviarMensajeCopilot);

    document.getElementById('copilotInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            enviarMensajeCopilot();
        }
    });
}

// Abrir modal para editar bitácora
function abrirEditarBitacora(id) {
    bitacoraEditando = bitacoras.find(b => b.id == id);
    if (bitacoraEditando) {
        document.getElementById('editTitulo').value = bitacoraEditando.titulo;
        document.getElementById('editTema').value = bitacoraEditando.tema;
        document.getElementById('editFecha').value = bitacoraEditando.fecha;
        document.getElementById('editContenido').value = bitacoraEditando.contenido;
        document.getElementById('editImagen').value = bitacoraEditando.imagen || '';
        document.getElementById('editVideo').value = bitacoraEditando.video || '';
        document.getElementById('editAudio').value = bitacoraEditando.audio || '';
        document.getElementById('editEnlaces').value = bitacoraEditando.enlaces || '';
        document.getElementById('modalEditBitacora').classList.remove('hidden');
    }
}

// Cerrar modal de editar bitácora
function cerrarModalEditarBitacora() {
    document.getElementById('modalEditBitacora').classList.add('hidden');
    bitacoraEditando = null;
}

// Guardar bitácora editada
async function guardarBitacora() {
    if (!bitacoraEditando) return;

    bitacoraEditando.titulo = document.getElementById('editTitulo').value;
    bitacoraEditando.tema = document.getElementById('editTema').value;
    bitacoraEditando.fecha = document.getElementById('editFecha').value;
    bitacoraEditando.contenido = document.getElementById('editContenido').value;
    bitacoraEditando.imagen = document.getElementById('editImagen').value;
    bitacoraEditando.video = document.getElementById('editVideo').value;
    bitacoraEditando.audio = document.getElementById('editAudio').value;
    bitacoraEditando.enlaces = document.getElementById('editEnlaces').value;

    try {
        await db.collection(COLECCION_BITACORAS).doc(bitacoraEditando.id.toString()).set(bitacoraEditando);
        cerrarModalEditarBitacora();
        mostrarBitacorasEditar();
        mostrarBitacoras();
        alert('Bitácora guardada exitosamente');
    } catch (error) {
        console.error('Error guardando:', error);
        alert('Error al guardar la bitácora');
    }
}

// Aplicar colores personalizados
function aplicarColores() {
    const colorPrincipal = document.getElementById('colorPrincipal').value;
    const colorSecundario = document.getElementById('colorSecundario').value;
    const colorFondo = document.getElementById('colorFondo').value;

    document.documentElement.style.setProperty('--color-principal', colorPrincipal);
    document.documentElement.style.setProperty('--color-secundario', colorSecundario);
    document.documentElement.style.setProperty('--color-fondo', colorFondo);

    // Guardar en localStorage
    localStorage.setItem('colorPrincipal', colorPrincipal);
    localStorage.setItem('colorSecundario', colorSecundario);
    localStorage.setItem('colorFondo', colorFondo);
}

// Aplicar colores guardados
function aplicarColoresGuardados() {
    const colorPrincipal = localStorage.getItem('colorPrincipal') || '#1a1a1a';
    const colorSecundario = localStorage.getItem('colorSecundario') || '#d4af37';
    const colorFondo = localStorage.getItem('colorFondo') || '#f5f5f5';

    document.getElementById('colorPrincipal').value = colorPrincipal;
    document.getElementById('colorSecundario').value = colorSecundario;
    document.getElementById('colorFondo').value = colorFondo;

    aplicarColores();
}

// Funciones auxiliares
function abrirEnPestana(url) {
    window.open(url, '_blank');
}

function mostrarEnlaces(bitacoraId) {
    const bitacora = bitacoras.find(b => b.id == bitacoraId);
    if (bitacora && bitacora.enlaces) {
        alert(bitacora.enlaces);
    }
}

function abrirCopilotColores() {
    document.getElementById('copilotPanel').classList.remove('hidden');
    agregarMensajeCopilot('assistant', 'Hola! Soy tu asistente Claude. Puedo ayudarte a elegir colores para tu bitácora. ¿Qué tipo de paleta prefieres? (Ejemplo: profesional, elegante, moderna, colorida, etc.)');
}

function cerrarCopilot() {
    document.getElementById('copilotPanel').classList.add('hidden');
}

function agregarMensajeCopilot(tipo, mensaje) {
    const chat = document.getElementById('copilotChat');
    const div = document.createElement('div');
    div.className = `copilot-message ${tipo}`;
    div.textContent = mensaje;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function enviarMensajeCopilot() {
    const input = document.getElementById('copilotInput');
    const mensaje = input.value.trim();
    
    if (!mensaje) return;

    agregarMensajeCopilot('user', mensaje);
    input.value = '';

    // Simular respuesta (en producción llamaría a la API de Claude)
    setTimeout(() => {
        agregarMensajeCopilot('assistant', 'Gracias por tu pregunta. Puedo ayudarte a personalizar los colores. En el modo lector, presiona el botón "Acceso Editor" para ingresar (contraseña: 081624) y luego personaliza los colores según tu preferencia.');
    }, 500);
}
