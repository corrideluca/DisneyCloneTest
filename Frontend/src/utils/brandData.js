import {
  getItemsCollection,
  getItemsFromBrand,
  getItemsFromStar,
  getItemsFromStarGenre,
  getItemsFromStarNew,
  getMoviesWaltDisney90s,
  getMoviesWaltDisneyActionAdventure,
  getMoviesWaltDisneyAnimations,
} from '../services/getDataFromAPI';
import trendingMovies from './trendingMovies';

const brandData = {
  marvel: {
    posterBrand: '/assets/img/categories/bg-marvel.jpg',
    videoBrand: '/assets/videos/bg-marvel.mp4',
    dataPage: [
      {
        call: Promise.resolve(trendingMovies.marvel),
        state: 'top3Marvel',
        title: 'Top 3 Hoy en Argentina',
      },
      {
        call: getItemsFromBrand('movie', '420'),
        state: 'moviesMarvel',
        title: 'Películas Marvel',
      },
      {
        call: getItemsFromBrand('tv', '420'),
        state: 'seriesMarvel',
        title: 'Series Marvel',
      },
      {
        call: getItemsCollection('86311'),
        state: 'moviesAvengers',
        title: 'Los Vengadores',
      },
      {
        call: getItemsCollection('531241'),
        state: 'moviesSpiderman',
        title: 'Spiderman',
      },
      {
        call: getItemsCollection('131295'),
        state: 'moviesCaptainAmerica',
        title: 'El Capitán América',
      },
      {
        call: getItemsCollection('131296'),
        state: 'moviesThor',
        title: 'Thor',
      },
    ],
  },

  disney: {
    posterBrand: '/assets/img/categories/bg-disney.jpg',
    videoBrand: '/assets/videos/bg-disney.mp4',
    dataPage: [
      {
        call: Promise.resolve(trendingMovies.disney),
        state: 'top3Disney',
        title: 'Top 3 Hoy en Argentina',
      },
      {
        call: getMoviesWaltDisneyAnimations(),
        state: 'moviesWaltDisney',
        title: 'En primer plano',
      },
      {
        call: getMoviesWaltDisney90s(),
        state: 'moviesWaltDisney90s',
        title: 'Hecho en los 90',
      },
      {
        call: getMoviesWaltDisneyActionAdventure(),
        state: 'moviesWaltDisneyActionAdventure',
        title: 'Walt Disney Animation Studios',
      },
      {
        call: getItemsCollection('8354'),
        state: 'moviesIceAge',
        title: 'Ice Age: La edad de hielo',
      },
    ],
  },

  pixar: {
    posterBrand: '/assets/img/categories/bg-pixar.jpg',
    videoBrand: '/assets/videos/bg-pixar.mp4',
    dataPage: [
      {
        call: Promise.resolve(trendingMovies.pixar),
        state: 'top3Pixar',
        title: 'Top 3 Hoy en Argentina',
      },
      {
        call: getItemsFromBrand('movie', '3'),
        state: 'moviesPixar',
        title: 'En primer plano',
      },
      {
        call: getItemsCollection('10194'),
        state: 'toyStoryMovies',
        title: 'Toy Story',
      },
      {
        call: getItemsCollection('87118'),
        state: 'carsMovies',
        title: 'Cars',
      },
    ],
  },

  nationalGeographic: {
    posterBrand: '/assets/img/categories/bg-national-geographic.jpg',
    videoBrand: '/assets/videos/bg-national-geographic.mp4',
    dataPage: [
      {
        call: Promise.resolve(trendingMovies.nationalGeographic),
        state: 'top3Geographic',
        title: 'Top 3 Hoy en Argentina',
      },
      {
        call: getItemsFromBrand('movie', '7521'),
        state: 'moviesGeographic',
        title: 'Documentales',
      },
      {
        call: getItemsFromBrand('tv', '7521'),
        state: 'seriesGeographic',
        title: 'Docuseries',
      },
    ],
  },

  starWars: {
    posterBrand: '/assets/img/categories/bg-star-wars.jpg',
    videoBrand: 'https://krhtrpwyzjpqnmxailto.supabase.co/storage/v1/object/public/brand-videos/star-wars-bg.mp4',
    dataPage: [
      {
        call: Promise.resolve(trendingMovies.starWars),
        state: 'top3StarWars',
        title: 'Top 3 Hoy en Argentina',
      },
      {
        call: getItemsFromBrand('movie', '1'),
        state: 'starWarsMovies',
        title: 'Películas Star Wars',
      },
      {
        call: getItemsFromBrand('tv', '1'),
        state: 'starWarsSeries',
        title: 'Series Star Wars',
      },
      {
        call: getItemsCollection('302331'),
        state: 'legoStarWarsMovies',
        title: 'Lego Star Wars',
      },
    ],
  },

  star: {
    posterBrand: '/assets/img/categories/bg-brand-star.jpg',
    videoBrand: '/assets/videos/bg-brand-star.mp4',
    dataPage: [
      {
        call: Promise.resolve(trendingMovies.star),
        state: 'top3Star',
        title: 'Top 3 Hoy en Argentina',
      },
      {
        call: getItemsFromStar('tv'),
        state: 'itemsStar',
        title: 'En primer plano',
      },
      {
        call: getItemsFromStarNew('movie'),
        state: 'newItemsStar',
        title: 'Añadidas recientemente',
      },
      {
        call: getItemsFromStarGenre('tv', '80'),
        state: 'seriesStarCrimes',
        title: 'Crímenes reales',
      },
      {
        call: getItemsFromStarGenre('movie', '28'),
        state: 'moviesStarAction',
        title: 'Películas de acción',
      },
      {
        call: getItemsFromStarGenre('tv', '18'),
        state: 'seriesStarDrama',
        title: 'Series dramáticas',
      },
    ],
  },
};

export default brandData;
