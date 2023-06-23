const getMarkers = async () => {
  return await fetch('/api/stations').then((response) => response.json());
};

const container = document.getElementById('markers');
const template_functions = document.getElementById('marker');

const loadMarkers = async () => {
  const data = await getMarkers();
  container.innerHTML = '';
  for (const item of data) {
    const marker = template_functions.content.cloneNode(true);
    const markerRow = marker.querySelector('.marker_line');
    markerRow.dataset.id = item.id;
    var td = marker.querySelectorAll('td');
    td[0].textContent = item.markerName;
    td[1].textContent = item.text;
    container.appendChild(marker);
  }

  const deleteButtons = document.querySelectorAll('#delete-station');

  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const confirmation = confirm('Вы уверены, что хотите удалить элемент?');

      if (confirmation) {
        const row = button.closest('tr');
        const dataId = row.getAttribute('data-id');

        fetch(`/api/stations/${dataId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }).then(() => loadMarkers());
      }
    });
  });

  const updateButtons = document.querySelectorAll('#edit-station');
  updateButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const row = button.closest('tr');
      const userInput = prompt('Введите текст:');
      const dataId = row.getAttribute('data-id');
      fetch(`/api/stations/${dataId}?text=${userInput}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      }).then(() => loadMarkers());
    });
  });
};
loadMarkers();
