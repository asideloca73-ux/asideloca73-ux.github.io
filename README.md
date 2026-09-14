# 📚 Bitácora de Literatura Argentina

Una aplicación web interactiva para gestionar y explorar bitácoras académicas sobre Literatura Argentina. Diseñada con dos modos: **Lector** (público) y **Editor** (protegido con contraseña).

## ✨ Características

### Modo Lector
- 📖 Visualiza 6 bitácoras predefinidas sobre autores argentinos
- 🎨 Interfaz elegante y responsiva
- 📸 Soporte para imágenes, videos y audio
- 🔗 Enlaces adicionales a recursos
- 🎨 Tema oscuro y elegante

### Modo Editor
- ✏️ Edita bitácoras existentes
- 🔐 Protegido con contraseña (081624)
- 💾 Guarda cambios en Firebase
- 🤖 Asistencia de Claude (Copilot)
- 🎨 Personaliza colores de la interfaz

### Copilot (Asistente de IA)
- 🤖 Integración con Claude API
- 💡 Ayuda con redacción y contenido
- 🎨 Sugerencias de paletas de colores
- 📝 Corrección de ortografía y gramática
- 🔍 Ideas para análisis literario

## 🚀 Instalación

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/asideloca73-ux/asideloca73-ux.github.io.git
cd asideloca73-ux.github.io
```

### Paso 2: Configurar Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Ve a **Project Settings** y copia tu configuración de Firebase
4. Abre `firebase-config.js` y reemplaza los valores:

```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};
```

### Paso 3: Configurar Claude API (Opcional)
1. Obtén tu API Key de [Claude API](https://www.anthropic.com/api)
2. Abre `copilot.js` y reemplaza:

```javascript
const CLAUDE_API_KEY = "tu-api-key-aqui";
```

**Nota:** Sin la API Key de Claude, el Copilot mostrará respuestas de demostración.

### Paso 4: Desplegar
La aplicación está lista para ser alojada en GitHub Pages. Solo sube los archivos a tu repositorio `username.github.io`.

## 📁 Estructura de Archivos

```
asideloca73-ux.github.io/
├── index.html              # HTML principal
├── styles.css              # Estilos CSS
├── app.js                  # Lógica principal
├── copilot.js              # Integración con Claude
├── firebase-config.js      # Configuración de Firebase
└── README.md               # Este archivo
```

## 🔐 Credenciales de Acceso

- **Contraseña del Editor:** `081624`
- Puedes cambiarla en `app.js` línea 4: `const PASSWORD_EDITOR = "081624";`

## 📖 Autores Incluidos

Las 6 bitácoras incluyen análisis sobre:

1. **Jorge Luis Borges** - El cuento y el infinito
2. **Alfonsina Storni** - Feminismo y poesía
3. **Julio Cortázar** - La novela experimental
4. **Macedonio Fernández** - La metaficción
5. **Haroldo Conti** - La narrativa moderna
6. **Leopoldo Lugones** - La estética modernista

## 🎨 Personalización de Colores

En el Modo Editor, puedes cambiar:
- 🎨 **Color Principal:** Afecta el header y elementos principales
- 🎨 **Color Secundario:** Detalles y acentos
- 🎨 **Color de Fondo:** Fondo general de la aplicación

Los colores se guardan en `localStorage` del navegador.

## 🤖 Usando el Copilot

1. Accede al Modo Editor (contraseña: 081624)
2. Haz clic en el botón 🤖 "Copilot"
3. Pide ayuda con:
   - 📝 Redacción y contenido
   - 🎨 Selección de colores
   - 📚 Análisis literario
   - ✏️ Corrección de textos

## 🔄 Sincronización con Firebase

Todas las ediciones se guardan automáticamente en Firebase Firestore. Para sincronizar con múltiples dispositivos:

1. Asegúrate de tener una conexión a internet
2. Los cambios se guardan en tiempo real
3. Se mantiene un historial de cambios en Firestore

## 🛠️ Desarrollo

Para modificar la aplicación:

1. **HTML:** Edita `index.html` para cambiar la estructura
2. **Estilos:** Modifica `styles.css` para el diseño
3. **Lógica:** Actualiza `app.js` para funcionalidades
4. **IA:** Personaliza `copilot.js` para el asistente

## 🐛 Solución de Problemas

### Firebase no conecta
- Verifica que tu `firebase-config.js` tenga las credenciales correctas
- Abre la consola del navegador (F12) para ver errores
- Asegúrate de que las reglas de Firestore permiten lectura/escritura

### Copilot no responde
- Verifica que tu API Key de Claude sea válida
- Revisa la consola del navegador para errores de CORS
- Asegúrate de que tienes saldo en tu cuenta de Anthropic

### Colores no se guardan
- Limpia el cache del navegador
- Abre DevTools (F12) y borra localStorage

## 📝 Licencia

Este proyecto está bajo licencia MIT. Siéntete libre de modificarlo y compartirlo.

## 👤 Autor

Creado por **asideloca73-ux** como herramienta para explorar Literatura Argentina.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Haz un Fork del proyecto
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -am 'Agrega mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

## 📞 Contacto

Para preguntas o sugerencias, abre un issue en el repositorio.

---

**¡Disfruta explorando la Literatura Argentina! 📚✨**
