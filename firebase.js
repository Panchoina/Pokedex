// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js";
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, getDoc, getDocs, query, where, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// DOCUMENTACIÓN
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_I-AEQT_QvbRxZjKe6Vcy5oNfuxxatqs",
    authDomain: "paada-233db.firebaseapp.com",
    projectId: "paada-233db",
    storageBucket: "paada-233db.appspot.com",
    messagingSenderId: "75977304155",
    appId: "1:75977304155:web:b91a2b6166d49d6ddf777e"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export const checkarNombre = async (num) => {
    const q = query(collection(db, 'pokemon'), where('numero', '==', num));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
}
export const save = (poke) => {
    addDoc(collection(db, 'pokemon'), poke)
}
export const getAll = (data) => {
    onSnapshot(collection(db, 'pokemon'), data)
}
export const remove = (id) => {
    deleteDoc(doc(db, 'pokemon', id))
}
export const selectOne = (id) => getDoc(doc(db, 'pokemon', id))
export const edit = (id, poke) => {
    updateDoc(doc(db, 'pokemon', id), poke)
}

// aca es donde se ejecuta la pokedex
const imageList = document.getElementById('imageList');
const fotosCollection = collection(db, 'pokemon');
onSnapshot(collection(db, 'pokemon'), (snapshot) => {
    const pokeData = [];
    snapshot.forEach(doc => {
        pokeData.push(doc.data());
    });
    mostrarImagenesEnLista(pokeData); // Llama a la función para mostrar las imágenes
});

// aca es donde se sube la imagen a firestore
export async function subirImagen() {
    const fileInput = document.getElementById('foto');
    const nombrepoke = document.getElementById('nombre');
    if (fileInput && fileInput.files.length > 0) {
        try {
            //URL de descarga
            const file = fileInput.files[0];
            const fileName = file.name;
            const storageRef = ref(storage, `pokemon/${nombrepoke}/${fileName}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            alert('Error al subir la imagen');
        }
    } else {
        alert('Por favor, selecciona una imagen');
    }
}
// aca se muestra la imagen en la pokedex
export async function mostrarImagenesEnLista(pokee) {
    // Obtener el elemento imageList
    const imageList = document.getElementById('imageList');
    imageList.innerHTML = '';
    pokee.forEach(poke => {
        if (poke && poke.url) {
            const container = document.createElement('div');
            container.classList.add('image-container');

            // Crear el elemento de imagen
            const imgElement = document.createElement('img');
            imgElement.src = poke.url;
            imgElement.classList.add('uploaded-image');

            // Agregar la imagen al contenedor
            container.appendChild(imgElement);

            // Agregar el contenedor al imageList
            imageList.appendChild(container);
        } else {
            console.error('Objeto poke no válido:', poke);
        }
    });
}
