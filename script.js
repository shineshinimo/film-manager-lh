let editIndex = null;

function parseJSON(name) {
    return JSON.parse(localStorage.getItem(name)) || [];
}

function stringify(name, arr) {
    localStorage.setItem(name, JSON.stringify(arr));
}

function handleFormSubmit(e) {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const genre = document.querySelector('#genre').value;
    const releaseYear = document.querySelector('#releaseYear').value;
    const isWatched = document.querySelector('#isWatched').checked;

    const film = {
        title,
        genre,
        releaseYear,
        isWatched,
    }

    if (editIndex === null) {
        addFilmToLocalStorage(film);
    } else {
        updateFilmInLocalStorage(film);
    }

    resetForm();
}

function addFilmToLocalStorage(film) {
    const films = parseJSON('films')
    films.push(film);
    stringify('films', films);

    renderTable();
}

function updateFilmInLocalStorage(updatedFilm) {
    const films = parseJSON('films');
    films[editIndex] = updatedFilm;
    stringify('films', films);

    renderTable();

    editIndex = null;
}

function deleteFilm(index) {
    const films = parseJSON('films');
    films.splice(index, 1);
    stringify('films', films);

    renderTable();
}

function editFilm(index) {
    const films = parseJSON('films');
    const film = films[index];

    document.querySelector('#title').value = film.title;
    document.querySelector('#genre').value = film.genre;
    document.querySelector('#releaseYear').value = film.releaseYear;
    document.querySelector('#isWatched').checked = film.isWatched;

    document.querySelector('#submitBtn').textContent = "Обновить";
    document.querySelector('#cancelBtn').style.display = "inline";

    editIndex = index;
}

function resetForm() {
    document.querySelector('#film-form').reset();
    document.querySelector('#submitBtn').textContent = "Добавить";
    document.querySelector('#cancelBtn').style.display = "none";
    editIndex = null;
}

function renderTable() {
    const films = parseJSON('films');
    const filmTableBody = document.querySelector('#film-tbody');

    filmTableBody.innerHTML = '';

    films.forEach((film, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.genre}</td>
            <td>${film.releaseYear}</td>
            <td>${film.isWatched ? 'Yes' : 'No'}</td>
            <td>
                <button onclick="editFilm(${index})">Редактировать</button>
                <button onclick="deleteFilm(${index})">Удалить</button>
            </td>
        `;

        filmTableBody.append(row);
    })
}

document.querySelector('#film-form').addEventListener('submit', handleFormSubmit);
document.querySelector('#cancelBtn').addEventListener('click', resetForm);

renderTable();