const URL = 'https://www.omdbapi.com',
	OMDb_API_KEY = 'apikey=e810fced';
// ('http://www.omdbapi.com/?i=tt3896198&apikey=e810fced');

const searchInputNode = document.getElementById('js-name-film'),
	searchBtnNode = document.getElementById('js-search-btn'),
	searchListNode = document.getElementById('js-movie-list');

//! получение данных от пользователя
const getNameFilmFromUser = () => {
	if (!searchInputNode.value) return null;
	const getNameFilmFromUser = searchInputNode.value;

	return getNameFilmFromUser;
};
//! функция PRELOADED
const preloaded = () => {
	searchListNode.innerHTML = '';
	const preloaded = document.createElement('li');
	preloaded.classList.add('preloaded');
	preloaded.textContent = 'Загрузка';
	searchListNode.append(preloaded);

	return preloaded;
};
const clearInput = () => {
	searchInputNode.value = '';
};
//! функция фильм не найден
const getFilmUndefined = filmsArray => {
	if (filmsArray === undefined) {
		const undefinedItem = document.createElement('li');
		undefinedItem.classList.add('item-undefined');
		undefinedItem.textContent = 'Фильмы не найдены';
		searchListNode.append(undefinedItem);
		return;
	}
};
//! функция создание списка фильмов
const getFilmItem = filmsArray => {
	let elementListHTML = '';
	filmsArray.forEach(element => {
		elementListHTML += `
		<li class="movie-app__item item">
				<a href="film.html?i=${element.imdbID}" class="item__link">
					<img
						class="item__img"
						src="${element.Poster}"
						alt="${element.Title}"
					/>
					<h2 class="item__title">${element.Title}</h2>
					<p class="item__year">${element.Year}</p>
					<p class="item__type">${element.Type}</p>
				</a>
			</li>
		`;
	});

	return elementListHTML;
};
//! функция отрисовка списка фильмов
const renderFilmList = elementListHTML => {
	searchListNode.innerHTML = elementListHTML;
};
//! функция fetch
const getFetch = async filmName => {
	const getFetch = await fetch(`${URL}/?s=${filmName}&${OMDb_API_KEY}`)
		.then(response => response.json())
		.then(json => {
			searchListNode.innerHTML = '';
			const filmsArray = json.Search;
			getFilmUndefined(filmsArray);
			renderFilmList(getFilmItem(filmsArray));
		});

	return getFetch;
};
const searchFilmsButtonHandler = () => {
	const newResponseFormUser = getNameFilmFromUser();
	if (!getNameFilmFromUser()) return;
	preloaded();
	getFetch(newResponseFormUser);
	clearInput();
};

searchBtnNode.addEventListener('click', searchFilmsButtonHandler);

/*
.then(json => console.log(json.Search[0].Year));
Poster: "https://m.media-amazon.com/images/M/MV5BODIyMDdhNTgtNDlmOC00MjUxLWE2NDItODA5MTdkNzY3ZTdhXkEyXkFqcGc@._V1_SX300.jpg"
Title: "Batman Begins"
Type: "movie"
Year: "2005"
imdbID: "tt0372784"
*/
