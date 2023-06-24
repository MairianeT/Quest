const jwtToken = localStorage.getItem('jwtToken');
const getResults = async () => {
  return await fetch('/api/results', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.sort((a, b) => {
        if (a.numberOfStations > b.numberOfStations) {
          return -1;
        } else if (a.numberOfStations < b.numberOfStations) {
          return 1;
        }
        return a.time - b.time;
      });
      return data;
    });
};

const container = document.getElementById('results');
const template_functions = document.getElementById('result');

const loadResults = async () => {
  const data = await getResults();
  container.innerHTML = '';
  for (const item of data) {
    const res = template_functions.content.cloneNode(true);
    const resRow = res.querySelector('.result_line');
    resRow.dataset.id = item.id;
    var td = res.querySelectorAll('td');
    td[0].textContent = await GetNameById(item.userId);
    td[1].textContent = item.numberOfStations;
    td[2].textContent = item.time;
    container.appendChild(res);
  }
};

function GetNameById(userId) {
  const url = `/api/users/${userId}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data.name.toString();
    });
}

loadResults();
