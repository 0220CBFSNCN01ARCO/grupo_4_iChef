const input = document.getElementById('image_uploads');
const preview = document.querySelector('.preview');

input.addEventListener('change', updateImageDisplay);
input.style.opacity = 0;

function updateImageDisplay() {
  while(preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  const curFiles = input.files;
  if(curFiles.length === 0) {
    const para = document.createElement('p');
    para.textContent = 'No hay archivos seleccionados para cargar.';
    preview.appendChild(para);
  } else {
    const list = document.createElement('ol');
    preview.appendChild(list);

    for(const file of curFiles) {
      const listItem = document.createElement('li');

      if(validFileType(file)) {
        //para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
        const image = document.createElement('img');
        image.src = URL.createObjectURL(file);
        listItem.appendChild(image);
      } else {
          para.textContent = `Archivo: ${file.name}: No es un tipo de archivo válido. Actualiza tu selección.`;
          listItem.appendChild(para);
      }
      const para = document.createElement('p');
      para.textContent = `Archivo: ${file.name}.`;
      listItem.appendChild(para);

      list.appendChild(listItem);
    }
  }
}

const inputReceta = document.getElementById('pdfFile');
const previewReceta = document.querySelector('.previewReceta');

inputReceta.addEventListener('change', updatePdf);
inputReceta.style.opacity = 0;

function updatePdf(){
  while(previewReceta.firstChild) {
    previewReceta.removeChild(previewReceta.firstChild);
  }
  const curFiles = inputReceta.files;
  if(curFiles.length === 0) {
    const para = document.createElement('p');
    para.textContent = 'No hay ninguna receta para cargar.';
    previewReceta.appendChild(para);
  } else {
      for(const file of curFiles) {
        const para = document.createElement('p');
        para.textContent = `Receta: ${file.name}.`;
        previewReceta.appendChild(para);
      }
  }
}

// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
const fileTypes = [
    'image/apng',
    'image/bmp',
    'image/gif',
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/svg+xml',
    'image/tiff',
    'image/webp',
    `image/x-icon`
];

function validFileType(file) {
  return fileTypes.includes(file.type);
}

function returnFileSize(number) {
  if(number < 1024) {
    return number + 'bytes';
  } else if(number > 1024 && number < 1048576) {
    return (number/1024).toFixed(1) + 'KB';
  } else if(number > 1048576) {
    return (number/1048576).toFixed(1) + 'MB';
  }
}
