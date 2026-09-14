// Integración con Claude API
// Este archivo maneja la comunicación con Claude para asistencia en la edición

const CLAUDE_API_KEY = "YOUR_CLAUDE_API_KEY"; // Reemplazar con tu API Key
const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";

// Función para enviar mensaje a Claude
async function enviarMensajeCopilot() {
    const input = document.getElementById('copilotInput');
    const mensaje = input.value.trim();
    
    if (!mensaje) return;

    agregarMensajeCopilot('user', mensaje);
    input.value = '';

    // Mostrar indicador de carga
    agregarMensajeCopilot('assistant', '⏳ Claude está pensando...');

    try {
        const respuesta = await llamarClaudeAPI(mensaje);
        
        // Remover mensaje de carga
        const chat = document.getElementById('copilotChat');
        const ultimoMensaje = chat.lastChild;
        if (ultimoMensaje && ultimoMensaje.textContent.includes('⏳')) {
            ultimoMensaje.remove();
        }
        
        agregarMensajeCopilot('assistant', respuesta);
    } catch (error) {
        console.error('Error llamando a Claude:', error);
        
        // Remover mensaje de carga
        const chat = document.getElementById('copilotChat');
        const ultimoMensaje = chat.lastChild;
        if (ultimoMensaje && ultimoMensaje.textContent.includes('⏳')) {
            ultimoMensaje.remove();
        }
        
        // Respuesta de fallback
        agregarMensajeCopilot('assistant', 'Lo siento, tuve un problema conectándome con Claude. Por favor, verifica tu API Key en el archivo copilot.js');
    }
}

// Llamar a la API de Claude
async function llamarClaudeAPI(mensajeUsuario) {
    // Obtener contexto de la bitácora actual si está editando
    let contexto = "";
    if (bitacoraEditando) {
        contexto = `Estoy editando esta bitácora:
        Título: ${bitacoraEditando.titulo}
        Tema: ${bitacoraEditando.tema}
        Contenido: ${bitacoraEditando.contenido}
        `;
    }

    const prompt = `${contexto}

El usuario dice: ${mensajeUsuario}

Responde de manera concisa y útil para ayudar con la edición de una bitácora académica sobre Literatura Argentina. 
Si el usuario pide ayuda con colores, sugiere paletas de colores. 
Si pide ayuda redactando, mejora el texto. 
Si pide sugerencias de contenido, proporciona ideas relevantes para Literatura Argentina.`;

    const body = {
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        messages: [
            {
                role: "user",
                content: prompt
            }
        ]
    };

    const response = await fetch(CLAUDE_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": CLAUDE_API_KEY,
            "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error(`Error de API: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;
}

// Funciones auxiliares para integración con Copilot

// Ayuda con colores
function abrirCopilotColores() {
    document.getElementById('copilotPanel').classList.remove('hidden');
    agregarMensajeCopilot('assistant', '🎨 ¡Hola! Soy Claude, tu asistente de diseño. Puedo ayudarte a elegir colores para tu bitácora.\n\nTe sugiero algunas opciones:\n\n📌 Elegante: Negro (#1a1a1a) + Dorado (#d4af37)\n📌 Moderno: Azul oscuro (#1e3a8a) + Cyan (#06b6d4)\n📌 Académico: Gris (#374151) + Verde (#10b981)\n📌 Clásico: Marrón (#92400e) + Crema (#fef3c7)\n\n¿Cuál te gusta o quieres una combinación personalizada?');
}

// Ayuda para mejorar redacción
function pedirAyudaRedaccion() {
    const contenido = document.getElementById('editContenido').value;
    if (!contenido) {
        alert('Por favor, escribe algo primero');
        return;
    }
    
    document.getElementById('copilotPanel').classList.remove('hidden');
    document.getElementById('copilotInput').value = `Mejora esta redacción: "${contenido}"`;
    enviarMensajeCopilot();
}

// Ayuda para generar contenido sobre un tema
function pedirIdeaContenido(tema) {
    document.getElementById('copilotPanel').classList.remove('hidden');
    document.getElementById('copilotInput').value = `Genera ideas para escribir una bitácora académica sobre ${tema} en Literatura Argentina`;
    enviarMensajeCopilot();
}

// Ayuda para análisis de autor
function pedirAnalisisAutor(autor) {
    document.getElementById('copilotPanel').classList.remove('hidden');
    document.getElementById('copilotInput').value = `Dame puntos clave para analizar la obra de ${autor} desde una perspectiva estética y sensorial`;
    enviarMensajeCopilot();
}

// Corregir ortografía y gramática
function corregirTexto() {
    const contenido = document.getElementById('editContenido').value;
    if (!contenido) {
        alert('Por favor, escribe algo primero');
        return;
    }
    
    document.getElementById('copilotPanel').classList.remove('hidden');
    document.getElementById('copilotInput').value = `Corrige los errores de ortografía y gramática en: "${contenido}"`;
    enviarMensajeCopilot();
}

// Expandir idea
function expandirIdea() {
    const contenido = document.getElementById('editContenido').value;
    if (!contenido) {
        alert('Por favor, escribe algo primero');
        return;
    }
    
    document.getElementById('copilotPanel').classList.remove('hidden');
    document.getElementById('copilotInput').value = `Expande esta idea académica con más detalles: "${contenido}"`;
    enviarMensajeCopilot();
}

// Resumir texto
function resumirTexto() {
    const contenido = document.getElementById('editContenido').value;
    if (!contenido) {
        alert('Por favor, escribe algo primero');
        return;
    }
    
    document.getElementById('copilotPanel').classList.remove('hidden');
    document.getElementById('copilotInput').value = `Resume en 2-3 líneas este análisis: "${contenido}"`;
    enviarMensajeCopilot();
}

// Sugerir enlaces relevantes
function sugerirEnlaces(autor) {
    document.getElementById('copilotPanel').classList.remove('hidden');
    document.getElementById('copilotInput').value = `Sugiere enlaces académicos relevantes sobre ${autor} y su obra en Literatura Argentina`;
    enviarMensajeCopilot();
}

// Agregar mensaje al chat del Copilot
function agregarMensajeCopilot(tipo, mensaje) {
    const chat = document.getElementById('copilotChat');
    const div = document.createElement('div');
    div.className = `copilot-message ${tipo}`;
    div.innerHTML = mensaje.replace(/\n/g, '<br>'); // Permitir saltos de línea
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

// Cerrar panel del Copilot
function cerrarCopilot() {
    document.getElementById('copilotPanel').classList.add('hidden');
}

// Inicializar después de cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Agregar botones para atajos de Copilot
    const btnCopilotColores = document.getElementById('btnCopilotColores');
    if (btnCopilotColores) {
        btnCopilotColores.addEventListener('click', abrirCopilotColores);
    }

    const btnCerrarCopilot = document.getElementById('btnCerrarCopilot');
    if (btnCerrarCopilot) {
        btnCerrarCopilot.addEventListener('click', cerrarCopilot);
    }

    const btnEnviarCopilot = document.getElementById('btnEnviarCopilot');
    if (btnEnviarCopilot) {
        btnEnviarCopilot.addEventListener('click', enviarMensajeCopilot);
    }

    // Enter para enviar mensaje
    const copilotInput = document.getElementById('copilotInput');
    if (copilotInput) {
        copilotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                enviarMensajeCopilot();
            }
        });
    }
});

// Exportar funciones para uso global
window.copilotFunctions = {
    abrirCopilotColores,
    pedirAyudaRedaccion,
    pedirIdeaContenido,
    pedirAnalisisAutor,
    corregirTexto,
    expandirIdea,
    resumirTexto,
    sugerirEnlaces,
    cerrarCopilot
};
