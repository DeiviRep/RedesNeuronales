// Obtener referencias a los elementos del DOM
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');

// Acceder a la cámara y mostrar el flujo de video en el elemento <video>
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    // Llamar a la función capturePhoto cada segundo (1000 milisegundos)
    setInterval(capturePhoto, 1000);
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
