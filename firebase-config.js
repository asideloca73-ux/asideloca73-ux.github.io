// Configuración de Firebase
// ⚠️ IMPORTANTE: Reemplaza estos valores con tu propia configuración de Firebase

const firebaseConfig = {
    apiKey: "AIzaSyDemoAPIKey1234567890", // Reemplazar con tu API Key
    authDomain: "bitacorarg-demo.firebaseapp.com", // Reemplazar
    projectId: "bitacorarg-demo", // Reemplazar
    storageBucket: "bitacorarg-demo.appspot.com", // Reemplazar
    messagingSenderId: "123456789", // Reemplazar
    appId: "1:123456789:web:abcdef1234567890" // Reemplazar
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Obtener referencia a Firestore
const db = firebase.firestore();

// Colección donde se guardarán las bitácoras
const COLECCION_BITACORAS = "bitacoras";
