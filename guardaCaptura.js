const registerButton = document.getElementById('register-button');
registerButton.addEventListener('click', startCapture);
const downloadButton = document.getElementById('download-button');
downloadButton.addEventListener('click', downloadAllImages);
// Obtener referencias a los elementos del DOM
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photoContainer = document.getElementById('photo-container');

let intervalId; // Variable para almacenar el ID del intervalo
let capturedImages = []; // Array para almacenar las imágenes capturadas
let personName = '';

// Función para capturar una foto
function capturePhoto() {
  // Dibujar el fotograma actual del video en el elemento <canvas>
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

  // Obtener la URL de la imagen capturada
  const imageUrl = canvas.toDataURL();
  // Generar un nombre único para la imagen (por ejemplo, usando la marca de tiempo actual)
  const imageName = personName.toString();

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

// Función para iniciar la captura
function startCapture() {
  const nameInput = document.getElementById('name-input');
  personName = nameInput.value; // Obtener el valor del campo de entrada de texto
  // Validar que se haya ingresado un nombre
  if (personName.trim() === '') {
    alert('Por favor, ingrese su nombre.');
    return;
  }
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
}

// Función para descargar todas las imágenes
function downloadAllImages() {
  // Verificar si hay imágenes capturadas
  if (capturedImages.length === 0) {
    alert('No hay imágenes capturadas.');
    return;
  }

  // Crear un elemento <a> para descargar las imágenes
  const zipLink = document.createElement('a');
  zipLink.href = '#';
  zipLink.download = 'captured_images.zip';

  // Crear un objeto ZIP
  const zip = new JSZip();

  // Recorrer todas las imágenes capturadas
  capturedImages.forEach((imageUrl, index) => {
    // Obtener el nombre de la imagen
    const imageName = personName + '_' + index + '.jpg';

    // Agregar la imagen al objeto ZIP
    zip.file(imageName, imageUrl.split(',')[1], { base64: true });
  });

  // Generar el archivo ZIP y establecer el enlace de descarga
  zip.generateAsync({ type: 'blob' }).then(function (blob) {
    zipLink.href = URL.createObjectURL(blob);
    zipLink.click();
  });
}
