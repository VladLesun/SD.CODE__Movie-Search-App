const URL = 'https://www.omdbapi.com/',
	OMDb_API_KEY = 'apikey=e810fced';

const params = new URLSearchParams(location.search),
	id = params.get('i');

const filmInnerNode = document.getElementById('js-film-inner');

const preloaded = () => {
	const preloaded = document.createElement('p');
	preloaded.classList.add('preloaded');
	preloaded.textContent = 'Загрузка';
	filmInnerNode.append(preloaded);

	return preloaded;
};

const createPageTitle = name => {
	const pageTitle = document.querySelector('title');
	pageTitle.innerText = name;

	return pageTitle;
};

const getDataFilm = dataFilm => {
	createPageTitle(dataFilm.Title);

	filmInnerNode.innerHTML = `
	<img
			class="film__img"
			src="${dataFilm.Poster}"
			alt="${dataFilm.Title}"
		/>

		<div class="film__box">
			<h2 class="film__title">${dataFilm.Title}</h2>
			<p class="film__desc">
				Год: <span class="film__desc-span">${dataFilm.Year}</span>
			</p>
			<p class="film__desc">
				Рейтинг:
				<span class="film__desc-span">${dataFilm.Rated}</span>
			</p>
			<p class="film__desc">
				Дата выхода:
				<span class="film__desc-span">${dataFilm.Released}</span>
			</p>
			<p class="film__desc">
				Продолжительность:
				<span class="film__desc-span">${dataFilm.Runtime}</span>
			</p>
			<p class="film__desc">
				Жанр: <span class="film__desc-span">${dataFilm.Genre}</span>
			</p>
			<p class="film__desc">
				Режиссер:
				<span class="film__desc-span">${dataFilm.Director}</span>
			</p>
			<p class="film__desc">
				Сценарий:
				<span class="film__desc-span">${dataFilm.Writer}</span>
			</p>
			<p class="film__desc">
				Актеры:
				<span class="film__desc-span">${dataFilm.Actors}</span>
			</p>
		</div>
		<p class="film__about">${dataFilm.Plot}</p>
`;
};

const getFilmFetch = async () => {
	const filmFetch = await fetch(`${URL}?i=${id}&${OMDb_API_KEY}`)
		.then(response => response.json())
		.then(json => getDataFilm(json));

	return filmFetch;
};

const createPageForFilm = () => {
	preloaded();
	getFilmFetch();
};

createPageForFilm();

/*
! Actors: "Ben Affleck, Henry Cavill, Amy Adams"
Awards: "14 wins & 33 nominations"
BoxOffice: "$330,360,194"
Country: "United States, Morocco"
DVD: "N/A"
! Director: "Zack Snyder"
! Genre: "Action, Adventure, Sci-Fi"
Language: "English"
Metascore: "44"
! Plot: "Batman is manipulated by Lex Luthor to fear Superman. Superman´s existence is meanwhile dividing the world and he is framed for murder during an international crisis. The heroes clash and force the neutral Wonder Woman to reemerge."
! Poster: "https://m.media-amazon.com/images/M/MV5BZTJkYjdmYjYtOGMyNC00ZGU1LThkY2ItYTc1OTVlMmE2YWY1XkEyXkFqcGc@._V1_SX300.jpg"
Production: "N/A"
! Rated: "R"
Ratings: (3) [{…}, {…}, {…}]
! Released: "25 Mar 2016"
Response: "True"
! Runtime: "151 min"
! Title: "Batman v Superman: Dawn of Justice"
Type: "movie"
Website: "N/A"
! Writer: "Bob Kane, Bill Finger, Jerry Siegel"
! Year: "2016"
imdbID: "tt2975590"
imdbRating: "6.5"
imdbVotes: "761,081"
*/
