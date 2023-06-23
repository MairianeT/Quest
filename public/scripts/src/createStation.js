const form = document.getElementById('newMarker');
const fileInput = document.getElementById('markerinput');

const jwtToken = localStorage.getItem('jwtToken');
if (!jwtToken) {
  window.location.href = '/';
}
document
  .getElementById('newMarker')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const file = fileInput.files[0];
    const markerName = file.name;
    const text = document.getElementById('marker-text-input').value;
    if (!file) {
      alert('Выберите файл маркера');
      return;
    }
    if (!text) {
      alert('Введите подсказку для станции');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/stations/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: formData,
    });
    if (response.ok) {
      const markerPath = await response.text();

      fetch('/api/stations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ markerName, markerPath, text }),
      })
        .then((response) => response.json())
        .then(() => {
          loadMarkers();
        });
    }

    form.reset();
  });
