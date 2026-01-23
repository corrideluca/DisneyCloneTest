import { useParams } from 'react-router-dom';
import { useState } from 'react';

import Spinner from '../../components/Spinner';
import Tabs from '../../components/Tabs';

import useMyList from '../../hooks/useMyList';

import {
  Background,
  Container,
  Title,
  Genres,
  Sinopsis,
  ContainerButtons,
  ButtonPrimary,
  ButtonSecondary,
  RoundedButton,
  VideoPlayer,
  VideoOverlay,
  CloseButton,
} from './styles';

import getHoursAndMinutes from '../../helpers/getHoursAndMinutes';

function Detail({ type }) {
  const { id } = useParams();
  const [showVideo, setShowVideo] = useState(false);

  // Custom hook que muestra los detalles de la película o serie
  const {
    handleSaveMyList, selected, itemDetail, isLoading,
  } = useMyList({ id, type });

  // Check if backdrop_path is a full URL or a TMDB path
  const getBackdropUrl = (backdropPath) => {
    if (!backdropPath) return '';
    if (backdropPath.startsWith('http://') || backdropPath.startsWith('https://')) {
      return backdropPath;
    }
    return `https://image.tmdb.org/t/p/original${backdropPath}`;
  };

  return (
    // Cuando termine de cargar muestro todos los detalles de la película o serie
    isLoading
      ? (
        <Spinner />
      ) : (
        <main>
          <Background
            // ref={background}
            bgImg={getBackdropUrl(itemDetail.backdrop_path)}
          />

          <Container>
            <Title>{itemDetail.title || itemDetail.name}</Title>

            <p>
              {itemDetail.release_date?.split('-')[0] || itemDetail.first_air_date?.split('-')[0]}

              {' - '}

              {type === 'movie' && (getHoursAndMinutes(itemDetail?.runtime))}

              {type === 'tv' && `${itemDetail.number_of_seasons} temporadas`}
            </p>

            <Genres>
              {itemDetail.genres?.map((genre) => genre.name).join(', ')}
            </Genres>

            <ContainerButtons>
              <ButtonPrimary
                type="button"
                onClick={() => itemDetail.video_url && setShowVideo(true)}
              >
                <img src="/assets/img/play.svg" alt="" />
                <span>Ver</span>
              </ButtonPrimary>

              <ButtonSecondary type="button">
                Tráiler
              </ButtonSecondary>

              <RoundedButton
                type="button"
                onClick={handleSaveMyList}
                aria-selected={selected}
              />
            </ContainerButtons>

            <Sinopsis>{itemDetail.overview}</Sinopsis>

          </Container>

          <Tabs item={itemDetail} id={id} type={type} />

          {showVideo && itemDetail.video_url && (
            <VideoOverlay onClick={() => setShowVideo(false)}>
              <CloseButton onClick={() => setShowVideo(false)}>✕</CloseButton>
              <VideoPlayer
                controls
                autoPlay
                onClick={(e) => e.stopPropagation()}
              >
                <source src={itemDetail.video_url} type="video/mp4" />
                Your browser does not support the video tag.
              </VideoPlayer>
            </VideoOverlay>
          )}
        </main>
      )
  );
}

export default Detail;
