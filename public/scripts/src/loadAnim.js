const getAnim = async () => {
  return await fetch('/api/animations').then((response) => response.json());
};

const form1 = document.getElementById('newAnim');
const container1 = document.getElementById('anims');
const template_anim = document.getElementById('anim');

document
  .getElementById('newAnim')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const animation = document.getElementById('animation').value;
    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);

    fetch('/api/animations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ latitude, longitude, animation }),
    })
      .then((response) => response.json())
      .then(() => {
        loadAnims();
      });
    form1.reset();
  });
const loadAnims = async () => {
  const data = await getAnim();
  container1.innerHTML = '';
  for (const item of data) {
    const anim = template_anim.content.cloneNode(true);
    const animRow = anim.querySelector('.anim_line');
    animRow.dataset.id = item.id;
    var td = anim.querySelectorAll('td');
    let a = td[0].querySelector('a');
    a.href = `https://drive.google.com/file/d/${item.animation}/view?usp=sharing`;
    td[1].textContent = item.latitude + ' ' + item.longitude;
    container1.appendChild(anim);
  }

  const deleteButtonsAnim = document.querySelectorAll('#delete-anim');

  deleteButtonsAnim.forEach((button) => {
    button.addEventListener('click', () => {
      const confirmation = confirm('Вы уверены, что хотите удалить анимацию?');

      if (confirmation) {
        const row = button.closest('tr');
        const dataId = row.getAttribute('data-id');

        fetch(`/api/animations/${dataId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }).then(() => loadAnims());
      }
    });
  });

  var modal = document.getElementById('myModal');

  const updateButtonsAnim = document.querySelectorAll('#edit-anim');
  updateButtonsAnim.forEach((button) => {
    button.addEventListener('click', () => {
      const row = button.closest('tr');

      modal.style.display = 'block';
      let editAnimSubmit = document.getElementById('editAnimSubmit');
      editAnimSubmit.addEventListener('click', () => {
        var text1 = parseFloat(document.getElementById('input1').value);
        var text2 = parseFloat(document.getElementById('input2').value);
        const dataId = row.getAttribute('data-id');

        fetch(
          `/api/animations/${dataId}?latitude=${text1}&longitude=${text2}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwtToken}`,
            },
          },
        ).then(() => loadAnims());

        modal.style.display = 'none';
      });
    });
  });
};
loadAnims();
