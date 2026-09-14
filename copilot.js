// Sistema de Copilot (Asistente de IA)
// Este archivo maneja la interacción con el panel del Copilot

class CopilotAssistant {
    constructor() {
        this.conversacion = [];
        this.inicializar();
    }

    inicializar() {
        const btnEnviar = document.getElementById('btnEnviarCopilot');
        const inputCopilot = document.getElementById('copilotInput');

        if (btnEnviar) {
            btnEnviar.addEventListener('click', () => this.enviarMensaje());
        }

        if (inputCopilot) {
            inputCopilot.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.enviarMensaje();
                }
            });
        }
    }

    agregarMensaje(tipo, mensaje) {
        const chatDiv = document.getElementById('copilotChat');
        if (!chatDiv) return;

        const msgDiv = document.createElement('div');
        msgDiv.className = `copilot-message ${tipo}`;
        msgDiv.textContent = mensaje;
        chatDiv.appendChild(msgDiv);
        chatDiv.scrollTop = chatDiv.scrollHeight;

        this.conversacion.push({ tipo, mensaje });
    }

    enviarMensaje() {
        const input = document.getElementById('copilotInput');
        if (!input) return;

        const mensaje = input.value.trim();
        if (!mensaje) return;

        this.agregarMensaje('user', mensaje);
        input.value = '';

        // Simular respuesta del asistente
        setTimeout(() => {
            const respuesta = this.generarRespuesta(mensaje);
            this.agregarMensaje('assistant', respuesta);
        }, 500);
    }

    generarRespuesta(mensaje) {
        const mensajeLower = mensaje.toLowerCase();

        // Respuestas predefinidas para diferentes tipos de solicitudes
        if (mensajeLower.includes('color') || mensajeLower.includes('paleta')) {
            return this.sugerenciasColores();
        } else if (mensajeLower.includes('redacción') || mensajeLower.includes('escribir')) {
            return this.ayudaRedaccion();
        } else if (mensajeLower.includes('corregir') || mensajeLower.includes('error')) {
            return this.sugerenciasCorreccion();
        } else if (mensajeLower.includes('expandir') || mensajeLower.includes('más')) {
            return this.sugerenciasExpansion();
        } else if (mensajeLower.includes('resumir') || mensajeLower.includes('resumen')) {
            return this.sugerenciasResumen();
        } else if (mensajeLower.includes('literatura') || mensajeLower.includes('autor')) {
            return this.infoLiteratura();
        } else if (mensajeLower.includes('ayuda') || mensajeLower.includes('help')) {
            return this.mostrarAyuda();
        } else {
            return this.respuestaGeneral();
        }
    }

    sugerenciasColores() {
        return `🎨 Sugerencias de paletas de colores para tu bitácora:\n\n1. Elegante Clásica: Negro (#1a1a1a) + Dorado (#d4af37)\n2. Moderna: Gris (#333333) + Cian (#00bcd4)\n3. Literaria: Granate (#722f37) + Beige (#f5e6d3)\n4. Minimalista: Blanco (#ffffff) + Azul marino (#003366)\n5. Vibrante: Púrpura (#6f42c1) + Naranja (#ff9800)\n\n¿Cuál te parece que mejor refleja tu estilo?`;
    }

    ayudaRedaccion() {
        return `✍️ Consejos para mejorar tu redacción:\n\n1. Sé claro y conciso: Evita palabras innecesarias\n2. Estructura: Introduce la idea → desarrolla → concluye\n3. Párrafos: Cada uno debe tener una idea principal\n4. Variedad: Alterna oraciones largas y cortas\n5. Activa la voz: Prefiere "El autor escribe" sobre "Fue escrito por"\n6. Evita repeticiones: Usa sinónimos cuando sea posible\n\n¿Hay algún párrafo específico que quieras mejorar?`;
    }

    sugerenciasCorreccion() {
        return `✏️ Revisa estos puntos en tu texto:\n\n1. Ortografía: Usa una herramienta de corrección\n2. Gramática: Verifica concordancia de género y número\n3. Puntuación: Las comas separan ideas, no abuses\n4. Tildes: Revisa palabras esdrújulas y sobreesdrújulas\n5. Coherencia: ¿El texto tiene sentido de inicio a fin?\n6. Tono: ¿Mantiene un registro consistente?\n\nConsejo: Lee tu texto en voz alta para detectar errores.`;
    }

    sugerenciasExpansion() {
        return `📖 Ideas para expandir tu contenido:\n\n1. Añade contexto histórico del tema\n2. Incluye citas o referencias bibliográficas\n3. Desarrolla ejemplos con más detalle\n4. Compara o contrasta con otros autores\n5. Analiza las implicaciones de las ideas\n6. Sugiere conexiones con obras relacionadas\n7. Incluye análisis crítico o personal\n\n¿Qué aspecto de tu bitácora deseas profundizar?`;
    }

    sugerenciasResumen() {
        return `📋 Para crear un buen resumen:\n\n1. Identifica las ideas principales (no los detalles)\n2. Sé fiel al contenido original\n3. Mantén el mismo tono y perspectiva\n4. Elimina ejemplos innecesarios\n5. Reduce a 25-33% del original\n6. Verifica que fluya correctamente\n7. Revisa que no falte información esencial\n\nTip: Subraya lo importante, luego redacta basándote en eso.`;
    }

    infoLiteratura() {
        return `📚 Información sobre Literatura Argentina:\n\nLos autores en tu bitácora son:\n• Jorge Luis Borges: Innovador del cuento moderno\n• Alfonsina Storni: Pionera del feminismo literario\n• Julio Cortázar: Revolucionario de la novela experimental\n• Macedonio Fernández: Precursor de la metaficción\n• Haroldo Conti: Explorador de nuevas narrativas\n• Leopoldo Lugones: Introductor del modernismo\n\n¿Deseas información sobre alguno específicamente?`;
    }

    mostrarAyuda() {
        return `🤖 Puedo ayudarte con:\n\n📝 Redacción: Mejora y corrección de textos\n🎨 Colores: Sugerencias de paletas cromáticas\n📚 Literatura: Información sobre los autores\n💡 Ideas: Sugerencias para expandir contenido\n📋 Resúmenes: Síntesis de información\n🔍 Análisis: Ayuda con análisis literario\n✏️ Edición: Correcciones y mejoras\n\nEscribe tu pregunta o solicitud. ¡Estoy aquí para ayudarte!`;
    }

    respuestaGeneral() {
        const respuestas = [
            'Interesante pregunta. Para ayudarte mejor, podrías ser más específico sobre qué necesitas?',
            '¿Puedes darme más detalles? Así podré brindarte una mejor respuesta.',
            'Entiendo. ¿Hay algún aspecto particular de tu bitácora en el que pueda ayudarte?',
            'Buena observación. Consideraré eso para mis sugerencias futuras.',
            '¿Necesitas ayuda con redacción, colores, o análisis literario?'
        ];
        return respuestas[Math.floor(Math.random() * respuestas.length)];
    }
}

// Funciones para atajos de Copilot desde el editor
function abrirCopilot() {
    document.getElementById('copilotPanel').classList.remove('hidden');
    document.getElementById('copilotInput').focus();
}

function cerrarCopilot() {
    document.getElementById('copilotPanel').classList.add('hidden');
}

function pedirAyudaRedaccion() {
    abrirCopilot();
    setTimeout(() => {
        document.getElementById('copilotInput').value = 'Ayuda con redacción';
        document.getElementById('btnEnviarCopilot').click();
    }, 300);
}

function corregirTexto() {
    abrirCopilot();
    setTimeout(() => {
        document.getElementById('copilotInput').value = 'Corregir mi texto';
        document.getElementById('btnEnviarCopilot').click();
    }, 300);
}

function expandirIdea() {
    abrirCopilot();
    setTimeout(() => {
        document.getElementById('copilotInput').value = 'Cómo expandir mi contenido';
        document.getElementById('btnEnviarCopilot').click();
    }, 300);
}

function resumirTexto() {
    abrirCopilot();
    setTimeout(() => {
        document.getElementById('copilotInput').value = 'Resumir mi bitácora';
        document.getElementById('btnEnviarCopilot').click();
    }, 300);
}

function enviarMensajeCopilot() {
    if (typeof copilot !== 'undefined') {
        copilot.enviarMensaje();
    }
}

// Inicializar Copilot cuando la página carga
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.copilot = new CopilotAssistant();
    });
} else {
    window.copilot = new CopilotAssistant();
}
