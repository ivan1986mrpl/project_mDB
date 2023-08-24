'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'),//(получаем все картинки рекламных блоков)
          poster = document.querySelector('.promo__bg'),//(получаем блок с задним фоном)
          genre = poster.querySelector('.promo__genre'),//(получаем блок с комедией)
          movieList = document.querySelector('.promo__interactive-list'),//(получаем блок-список фильмов)
          addForm = document.querySelector('form.add'),//(получаем класс формы)
          addInput = addForm.querySelector('.adding__input'),//(получаем инпут)
          checkbox = addForm.querySelector('[type="checkbox"]');//(поиск через атрибут)

    addForm.addEventListener('submit', (event) => { //(вешаем обработчик события submit на форму)
        event.preventDefault();//(отменяем стандартное поведение браузера)

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm) {//(проверка на пустую строку, она даст false)

            if (newFilm.length > 21) {//(если название больше 21 символа. заменяeм на ...)
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log('Добавляем любимый фильм');
            }

            movieDB.movies.push(newFilm);//(пушим фильм, который ввел пользователь)
            sortArr(movieDB.movies);//(отсортировать добавленный фильм по алфавиту)    
            createMovieList(movieDB.movies, movieList);
        } 

        event.target.reset();//(метод, который очищает форму)

    });

    const deleteAdv = (arr) => {
        arr.forEach(item => { //(удаляем все картинки рекламных блоков. это первый способ)
            item.remove();
        });
        // adv.forEach(function(item) { //(удаляем все картинки рекламных блоков. это второй способ с безымянной функцией)
        //     item.remove();
        // });
    };

    const makeChanges = () => {
        genre.textContent = 'драма';//(изменяем комедия на драма)    
        poster.style.backgroundImage = 'url("img/bg.jpg")';//(меняем фото на другое, указываем путь относительно html, прописываем url используя разные кавычки в комбинировании) 
    };

    const sortArr = (arr) => {
        arr.sort();//(сортировка названий фильма по алфавиту)
    };

    function createMovieList(films, parent) {
        parent.innerHTML = '';//(очищяем список фильмов, записываем туда просто ничего, пустую строку. Чтобы это работало, надо использовать для получения этого списка querySelector, а не querySelectorAll. в querySelectorAll список поместится в псевдо массив, у которого нет своих методов и innerHTML не сработает)
        
        sortArr(films); 
        
        // console.log(poster.innerHTML);//(так можно получить значение этого свойства)
        
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        }); //(+= дополнительное присваивание.(a = a + 1; равно а += 1;) )

        //3) При клике на мусорную корзину - элемент будет удаляться из списка
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();//(удаляем родительский элемент btn)
                movieDB.movies.splice(i, 1);//(вырезаем из базы данных. сначала в аргументах номер по порядку, второй аргумент - это сколько элементов нужно удалить)

                createMovieList(films, parent);
            });
        });
    }

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);

});



//==============================================================================================
//==============================================================================================
/* бывает, что скрипт начнет выполняться еще до того, как наша дом структура загрузится и тогда скрипт не сможет найти определенные элементы и мы получим ошибку.  В js ест два события, которые мы можем отлавливать, чтобы такого не случалось:
load = первое событие, оно срабатывает только тогда, когда страница полностью готова. 
dom content loated = Второе событие. мы дожидаемся не полностью построения страницы. а только построения дом структуры. Чтобы сказать js коду, чтобы он ждал загрузки дом дерева, необходимо выделить весь код, вырезать. потом обращаемся к документу, на него навешиваем обработчик события, событие 'DOMContentLoaded' и далее каллбэк функция, в которую помещаем весь наш код, который был до этого. выглядит так:
document.addEventListener('DOMContentLoaded', () => {
  //(сюда помещаем весь код скрипта)
});
*/


//==============================================================================================
//==============================================================================================
/* Задания на урок 1:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

/* 'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const adv = document.querySelectorAll('.promo__adv img'),//(получаем все картинки рекламных блоков)
      poster = document.querySelector('.promo__bg'),//(получаем блок с задним фоном)
      genre = poster.querySelector('.promo__genre'),//(получаем блок с комедией)
      movieList = document.querySelector('.promo__interactive-list');//(получаем блок-список фильмов)

adv.forEach(item => { //(удаляем все картинки рекламных блоков. это первый способ)
    item.remove();
});
// adv.forEach(function(item) { //(удаляем все картинки рекламных блоков. это второй способ с безымянной функцией)
//     item.remove();
// });

genre.textContent = 'драма';//(изменяем комедия на драма)

poster.style.backgroundImage = 'url("img/bg.jpg")';//(меняем фото на другое, указываем путь относительно html, прописываем url используя разные кавычки в комбинировании)

movieList.innerHTML = '';//(очищяем список фильмов, записываем туда просто ничего, пустую строку. Чтобы это работало, надо использовать для получения этого списка querySelector, а не querySelectorAll. в querySelectorAll список поместится в псевдо массив, у которого нет своих методов и innerHTML не сработает)

movieDB.movies.sort();//(сортировка названий фильма по алфавиту)

// console.log(poster.innerHTML);//(так можно получить значение этого свойства)

movieDB.movies.forEach((film, i) => {
    movieList.innerHTML += `
        <li class="promo__interactive-item">${i + 1} ${film}
            <div class="delete"></div>
        </li>
    `;
}); //(+= дополнительное присваивание.(a = a + 1; равно а += 1;) ) */
//==============================================================================================
//==============================================================================================
/* Задания на урок 2:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

/* 'use strict'; //(ОБРАЗЦОВЫЙ ВАРИАНТ)

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log("Добавляем любимый фильм");
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
    
            createMovieList(movieDB.movies, movieList);
        }

        event.target.reset();

    });

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    const makeChanges = () => {
        genre.textContent = 'драма';

        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    function createMovieList(films, parent) {
        parent.innerHTML = "";
        sortArr(films);
    
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent);
            });
        });
    }

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);

}); */

//==============================================================================================