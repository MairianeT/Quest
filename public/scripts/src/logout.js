document.getElementById('logoutButton').addEventListener('click', function () {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('isAdmin');
  window.location.href = '/';
});
