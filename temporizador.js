// Obtener referencias a los elementos del DOM
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');

// Acceder a la cámara y mostrar el flujo de video en el elemento <video>
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    // Iniciar el temporizador para la captura automática durante 5 segundos
    setTimeout(stopCapture, 5000);
  })
  .catch(error => {
    console.error('Error al acceder a la cámara: ', error);
  });

// Función para capturar una foto
function capturePhoto() {
  // Dibujar el fotograma actual del video en el elemento <canvas>
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

  // Obtener la URL de la imagen capturada
  const imageUrl = canvas.toDataURL();

  // Mostrar la imagen capturada en una nueva ventana o en el mismo documento
  const newWindow = window.open();
  newWindow.document.write('<img src="' + imageUrl + '" alt="Captured Photo"/>');
}

// Función para detener la captura
function stopCapture() {
  // Detener el flujo de video
  video.srcObject.getTracks().forEach(track => track.stop());
}

// Iniciar la captura automáticamente al cargar la página
window.addEventListener('load', () => {
  // Esperar 1 segundo antes de iniciar la captura
  setTimeout(() => {
    capturePhoto(); // Capturar la primera foto
    setInterval(capturePhoto, 2000); // Capturar fotos cada segundo
  }, 3000);
});
