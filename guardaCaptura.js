// Obtener referencias a los elementos del DOM
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photoContainer = document.getElementById('photo-container');

let intervalId; // Variable para almacenar el ID del intervalo
let capturedImages = []; // Array para almacenar las imágenes capturadas

// Función para capturar una foto
function capturePhoto() {
  // Dibujar el fotograma actual del video en el elemento <canvas>
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

  // Obtener la URL de la imagen capturada
  const imageUrl = canvas.toDataURL();

  // Almacenar la imagen capturada en el array
  capturedImages.push(imageUrl);
  
  // Crear un nuevo elemento de imagen y agregarlo al contenedor de fotos
  const img = document.createElement('img');
  img.src = imageUrl;
  photoContainer.appendChild(img);
}

// Función para detener la captura
function stopCapture() {
  // Detener el flujo de video
  video.srcObject.getTracks().forEach(track => track.stop());

  // Detener el intervalo
  clearInterval(intervalId);

  // Realizar el reconocimiento facial en las imágenes capturadas
}

// Iniciar la captura automáticamente al cargar la página
window.addEventListener('load', () => {
  // Esperar 3 segundos antes de iniciar la captura
  setTimeout(() => {
    // Acceder a la cámara y mostrar el flujo de video en el elemento <video>
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream;
        // Iniciar el temporizador para detener la captura después de 10 segundos
        setTimeout(stopCapture, 6000);
        // Iniciar el intervalo para la captura automática cada 5 segundos
        intervalId = setInterval(capturePhoto, 1000);
      })
      .catch(error => {
        console.error('Error al acceder a la cámara: ', error);
      });
  }, 3000);
});
