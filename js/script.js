const tbody = document.querySelector('.table__body-wrapper'),
      titleBtn = document.querySelector('#title'),
      bodyBtn = document.querySelector('#body'),
      searchInput = document.querySelector('#searchInput'),
      sortStatus = {
        column: 'title',
        status: 'asc'
      };

let savedData = [];

[titleBtn, bodyBtn].forEach(btn => {
    btn.addEventListener('click', () => {
        convertStatus(btn.id);
        renderData();
    });
})

searchInput.addEventListener('input', () => {
    renderData();
});

function convertStatus(target) {
    if (sortStatus.column === target) {
        sortStatus.status = sortStatus.status === 'asc' ? 'desc' : 'asc';
    } else {
        sortStatus.column = target;
        sortStatus.status = 'asc';
    }

    console.log(sortStatus);
}

function sortObject(data) {
    const {column, status} = sortStatus;


    data.sort((a, b) => {
        const lengthA = a[column].length,
              lengthB = b[column].length;

        return (status === 'asc' ? lengthA - lengthB : lengthB - lengthA);
    });
}

function filterData(data) {
    const inputValue = searchInput.value.toLowerCase();

    if (inputValue.length < 3) {
        return data;
    }

    return data.filter(item => item.title.toLowerCase().includes(inputValue) || item.body.toLowerCase().includes(inputValue));
}

function renderData() {
    const filteredData = filterData([...savedData]);

    sortObject(filteredData);

    tbody.innerHTML = '';

    filteredData.forEach(obj => {
        const { title, body } = obj,
            element = document.createElement('tr');

        element.classList.add('table__body-row');

        element.innerHTML = `
            <th class="table__body-title">${title}</th>
            <th class="table__body-content">${body}</th>
        `;

        tbody.appendChild(element);
    });
}

function loadData() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            savedData = data;
            renderData();
        })
        .catch(error => console.error(error));
}

loadData();