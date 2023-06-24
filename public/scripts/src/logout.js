document.getElementById('logoutButton').addEventListener('click', function () {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('isAdmin');
  localStorage.removeItem('startTime');
  localStorage.removeItem('myMap');
  window.location.href = '/';
});
