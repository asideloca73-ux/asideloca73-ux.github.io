// Variables globales
let bitacoras = [];
let bitacoraEditando = null;
const PASSWORD_EDITOR = "081624";

// Datos iniciales de las 6 bitácoras
const bitacorasIniciales = [
    {
        id: 1,
        titulo: "Jorge Luis Borges",
        tema: "El cuento y el infinito",
        contenido: `Jorge Luis Borges (1899-1986) fue uno de los escritores más influyentes del siglo XX. Su obra se caracteriza por la exploración de temas filosóficos a través de historias breves y densas.

Características principales de su obra:
• La metaficción: Sus cuentos juegan con la naturaleza de la realidad y la ficción
• El infinito: Concepto recurrente que aparece en muchas de sus historias
• Bibliotecas y laberintos: Símbolos de la complejidad del conocimiento
• La técnica narrativa: Estructura innovadora y lenguaje preciso

Obras destacadas:
- "Ficciones" (1944): Colección de relatos que revolucionó la literatura
- "El Aleph" (1949): Historias sobre la percepción y la realidad
- "El jardín de senderos que se bifurcan": Cuento sobre el tiempo y la probabilidad`,
        imagen: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=300&fit=crop",
        enlaces: ["https://es.wikipedia.org/wiki/Jorge_Luis_Borges"]
    },
    {
        id: 2,
        titulo: "Alfonsina Storni",
        tema: "Feminismo y poesía",
        contenido: `Alfonsina Storni (1892-1938) fue una de las primeras poetisas feministas de América Latina. Su obra combina la expresión personal con la reivindicación de los derechos de la mujer.

Características de su poesía:
• Voz femenina auténtica: Expresión de sentimientos personales y políticos
• Crítica social: Cuestionamiento del rol tradicional de la mujer
• Sensibilidad lírica: Lenguaje poético y emotivo
• Modernismo y post-modernismo: Evolución de su estilo

Libros principales:
- "El dulce daño" (1911): Primeras composiciones poéticas
- "Irremediablemente" (1919): Madurez poética y conciencia social`,
        imagen: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=300&fit=crop",
        enlaces: ["https://es.wikipedia.org/wiki/Alfonsina_Storni"]
    },
    {
        id: 3,
        titulo: "Julio Cortázar",
        tema: "La novela experimental",
        contenido: `Julio Cortázar (1914-1984) revolucionó la novela moderna con su enfoque experimental y su combinación de lo fantástico con lo cotidiano.

Características de su obra:
• Estructura no lineal: Desafío a la narrativa tradicional
• Lo fantástico en lo cotidiano: Ruptura de la realidad en situaciones ordinarias
• Juego narrativo: Interacción con el lector
• Innovación técnica: Uso de formas narrativas inusuales

Obras principales:
- "Rayuela" (1963): Novela revolucionaria que puede leerse de múltiples formas
- "Bestiario" (1951): Cuentos de lo fantástico
- "Las armas secretas" (1959): Narraciones breves y densas`,
        imagen: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=300&fit=crop",
        enlaces: ["https://es.wikipedia.org/wiki/Julio_Cortázar"]
    },
    {
        id: 4,
        titulo: "Macedonio Fernández",
        tema: "La metaficción",
        contenido: `Macedonio Fernández (1874-1952) fue un precursor de la metaficción y la literatura experimental, anticipando muchas innovaciones.

Características principales:
• Metaficción: Reflexión sobre la naturaleza de la ficción dentro de la misma obra
• Rechazo de convenciones: Desafío a las normas literarias establecidas
• Filosofía narrativa: Integración de ideas filosóficas en la literatura
• Humor y absurdo: Uso de elementos cómicos para profundizar en temas serios

Obras destacadas:
- "Museo de la Novela de la Eterna": Su obra maestra, experimental y fragmentaria
- "Adriana Buenos Aires": Novela sobre la identidad y la realidad`,
        imagen: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=300&fit=crop",
        enlaces: ["https://es.wikipedia.org/wiki/Macedonio_Fernández"]
    },
    {
        id: 5,
        titulo: "Haroldo Conti",
        tema: "La narrativa moderna",
        contenido: `Haroldo Conti (1925-1976) fue un escritor argentino que exploró nuevas formas narrativas y la experimentación con el lenguaje.

Características de su escritura:
• Experimentación formal: Ruptura con estructuras narrativas tradicionales
• Introspección psicológica: Exploración de la mente del personaje
• Lenguaje poético: Uso lírico del lenguaje en la prosa
• Temas existenciales: Búsqueda de sentido e identidad

Obras principales:
- "Sudeste" (1962): Novela que mezcla viaje y reflexión
- "Alrededor de la jaula" (1967): Reflexión sobre la libertad y el confinamiento`,
        imagen: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=300&fit=crop",
        enlaces: ["https://es.wikipedia.org/wiki/Haroldo_Conti"]
    },
    {
        id: 6,
        titulo: "Leopoldo Lugones",
        tema: "La estética modernista",
        contenido: `Leopoldo Lugones (1874-1938) fue un poeta y escritor argentino fundamental en la introducción del modernismo en América Latina.

Características de su obra:
• Modernismo poético: Influencia del simbolismo francés
• Innovación técnica: Experimentación con formas y métodos narrativos
• Sensibilidad estética: Énfasis en la belleza y la forma
• Temática variada: Desde la política hasta la filosofía

Obras principales:
- "Las montañas del oro" (1897): Poemario que marca su madurez poética
- "Lunario sentimental" (1909): Colección de versos sobre la luna`,
        imagen: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=300&fit=crop",
        enlaces: ["https://es.wikipedia.org/wiki/Leopoldo_Lugones"]
    }
];

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    cargarBitacoras();
    cargarColoresSesion();
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cerrarModal();
        }
    });
});

// Cargar y mostrar bitácoras en el grid
function cargarBitacoras() {
    const gridBitacoras = document.getElementById('gridBitacoras');
    gridBitacoras.innerHTML = '';
    
    bitacoras = [...bitacorasIniciales];
    
    // Cargar datos guardados desde localStorage
    bitacoras.forEach(bitacora => {
        const bitacoraGuardada = localStorage.getItem(`bitacora_${bitacora.id}`);
        if (bitacoraGuardada) {
            const datos = JSON.parse(bitacoraGuardada);
            Object.assign(bitacora, datos);
        }
    });
    
    bitacoras.forEach(bitacora => {
        const card = document.createElement('div');
        card.className = 'bitacora-card';
        card.innerHTML = `
            <img src="${bitacora.imagen}" alt="${bitacora.titulo}" class="bitacora-imagen">
            <div class="bitacora-contenido">
                <h3 class="bitacora-titulo">${bitacora.titulo}</h3>
                <span class="bitacora-tema">${bitacora.tema}</span>
                <p class="bitacora-preview">${bitacora.contenido.substring(0, 150)}...</p>
                <button class="btn-leer" onclick="verDetalles(${bitacora.id})">Leer Completo</button>
            </div>
        `;
        gridBitacoras.appendChild(card);
    });

    // Llenar select del editor
    const selectBitacora = document.getElementById('selectBitacora');
    selectBitacora.innerHTML = '<option value="">-- Selecciona una bitácora --</option>';
    bitacoras.forEach(bitacora => {
        const option = document.createElement('option');
        option.value = bitacora.id;
        option.textContent = bitacora.titulo;
        selectBitacora.appendChild(option);
    });
}

// Ver detalles completos de una bitácora
function verDetalles(id) {
    const bitacora = bitacoras.find(b => b.id === id);
    if (!bitacora) return;

    document.getElementById('modoLector').classList.add('hidden');
    document.getElementById('vistaDetallada').classList.remove('hidden');

    document.getElementById('detalleTitle').textContent = bitacora.titulo;
    document.getElementById('detalleTema').textContent = bitacora.tema;
    
    const mediaDiv = document.getElementById('detalleMedia');
    mediaDiv.innerHTML = '';
    
    if (bitacora.imagen) {
        const img = document.createElement('img');
        img.src = bitacora.imagen;
        img.alt = bitacora.titulo;
        mediaDiv.appendChild(img);
    }

    document.getElementById('detalleContenido').innerHTML = bitacora.contenido.replace(/\n/g, '<br>');

    const enlacesDiv = document.getElementById('detalleEnlaces');
    if (bitacora.enlaces && bitacora.enlaces.length > 0) {
        enlacesDiv.innerHTML = '<h3>🔗 Enlaces Adicionales</h3>';
        const ul = document.createElement('div');
        bitacora.enlaces.forEach(enlace => {
            const a = document.createElement('a');
            a.href = enlace;
            a.textContent = enlace;
            a.target = '_blank';
            ul.appendChild(a);
        });
        enlacesDiv.appendChild(ul);
    }

    window.scrollTo(0, 0);
}

// Volver al grid
function volverAlGrid() {
    document.getElementById('vistaDetallada').classList.add('hidden');
    document.getElementById('modoLector').classList.remove('hidden');
    window.scrollTo(0, 0);
}

// Cambiar modo
function cambiarModo(modo) {
    document.getElementById('btnLector').classList.toggle('active', modo === 'lector');
    document.getElementById('btnEditor').classList.toggle('active', modo === 'editor');
    
    if (modo === 'lector') {
        document.getElementById('modoEditor').classList.add('hidden');
        document.getElementById('modoLector').classList.remove('hidden');
        document.getElementById('vistaDetallada').classList.add('hidden');
    }
}

// Abrir editor
function abrirEditor() {
    document.getElementById('passwordModal').classList.remove('hidden');
    document.getElementById('passwordInput').focus();
}

// Verificar contraseña
function verificarContraseña() {
    const password = document.getElementById('passwordInput').value;
    if (password === PASSWORD_EDITOR) {
        cerrarModal();
        cambiarModo('editor');
        document.getElementById('modoLector').classList.add('hidden');
        document.getElementById('modoEditor').classList.remove('hidden');
        window.scrollTo(0, 0);
    } else {
        alert('Contraseña incorrecta');
        document.getElementById('passwordInput').value = '';
    }
}

// Cerrar modal
function cerrarModal() {
    document.getElementById('passwordModal').classList.add('hidden');
    document.getElementById('passwordInput').value = '';
}

// Salir del editor
function salirEditor() {
    cambiarModo('lector');
    document.getElementById('modoEditor').classList.add('hidden');
    document.getElementById('modoLector').classList.remove('hidden');
    bitacoraEditando = null;
    document.getElementById('editForm').reset();
    window.scrollTo(0, 0);
}

// Cargar bitácora seleccionada
function cargarBitacora() {
    const id = parseInt(document.getElementById('selectBitacora').value);
    if (!id) return;

    const bitacora = bitacoras.find(b => b.id === id);
    if (!bitacora) return;

    bitacoraEditando = bitacora;
    document.getElementById('editTitulo').value = bitacora.titulo;
    document.getElementById('editTema').value = bitacora.tema;
    document.getElementById('editContenido').value = bitacora.contenido;
    document.getElementById('editMedia').value = bitacora.imagen;
    document.getElementById('editEnlaces').value = bitacora.enlaces.join('\n');
}

// Guardar bitácora
function guardarBitacora() {
    if (!bitacoraEditando) {
        alert('Por favor selecciona una bitácora');
        return;
    }

    const titulo = document.getElementById('editTitulo').value.trim();
    const tema = document.getElementById('editTema').value.trim();
    const contenido = document.getElementById('editContenido').value.trim();
    const imagen = document.getElementById('editMedia').value.trim();
    const enlaces = document.getElementById('editEnlaces').value.trim().split('\n').filter(e => e.trim());

    if (!titulo || !tema || !contenido) {
        alert('Por favor completa todos los campos obligatorios');
        return;
    }

    bitacoraEditando.titulo = titulo;
    bitacoraEditando.tema = tema;
    bitacoraEditando.contenido = contenido;
    if (imagen) bitacoraEditando.imagen = imagen;
    bitacoraEditando.enlaces = enlaces;

    localStorage.setItem(`bitacora_${bitacoraEditando.id}`, JSON.stringify(bitacoraEditando));

    alert('✅ Bitácora guardada correctamente');
    cargarBitacoras();
}

// Actualizar colores
function actualizarColores() {
    const colorPrincipal = document.getElementById('colorPrincipal').value;
    const colorSecundario = document.getElementById('colorSecundario').value;
    const colorFondo = document.getElementById('colorFondo').value;

    document.documentElement.style.setProperty('--color-principal', colorPrincipal);
    document.documentElement.style.setProperty('--color-secundario', colorSecundario);
    document.documentElement.style.setProperty('--color-fondo', colorFondo);

    localStorage.setItem('tema_colores', JSON.stringify({
        colorPrincipal,
        colorSecundario,
        colorFondo
    }));
}

// Cargar colores guardados
function cargarColoresSesion() {
    const coloresSesion = localStorage.getItem('tema_colores');
    if (coloresSesion) {
        const colores = JSON.parse(coloresSesion);
        document.getElementById('colorPrincipal').value = colores.colorPrincipal;
        document.getElementById('colorSecundario').value = colores.colorSecundario;
        document.getElementById('colorFondo').value = colores.colorFondo;
        actualizarColores();
    }
}

// Abrir panel del Copilot
function abrirCopilot() {
    document.getElementById('copilotPanel').classList.remove('hidden');
    document.getElementById('copilotInput').focus();
}
