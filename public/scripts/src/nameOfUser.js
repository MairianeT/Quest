const userId = localStorage.getItem('userId');

let UserName;
if (userId) {
  const url = `/api/users/${userId}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const name = data.name;
      const usernameElement = document.getElementById('name_of_user');
      usernameElement.textContent = name;
      UserName = name;
    })
    .catch((error) => {
      console.error('Error: GET request failed', error);
    });
}
