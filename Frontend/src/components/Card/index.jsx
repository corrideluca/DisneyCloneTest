/* eslint-disable react/prop-types */
import { ImageStyled, LinkStyled, CardWrapper, TitleOverlay } from './styles';

function Card({
  item, type, width = '', height = '',
}) {
  // Check if poster_path is a full URL (starts with http/https) or a TMDB path
  const getPosterUrl = (posterPath) => {
    if (!posterPath) return '/assets/img/no-picture-available.png';
    if (posterPath.startsWith('http://') || posterPath.startsWith('https://')) {
      return posterPath;
    }
    return `https://image.tmdb.org/t/p/w200${posterPath}`;
  };

  return (
    <LinkStyled to={`/${type}/${item.id || item.item_id}`} width={width} draggable={false}>
      <CardWrapper>
        {item.poster_path !== null
          ? (
            <ImageStyled
              src={getPosterUrl(item.poster_path)}
              alt={item.title || item.name}
              loading="lazy"
              height={height}
              draggable={false}
            />
          ) : (
            <ImageStyled
              src="/assets/img/no-picture-available.png"
              alt="No available"
              loading="lazy"
              height={height}
              draggable={false}
            />
          )}
        <TitleOverlay>
          <span>{item.title || item.name}</span>
        </TitleOverlay>
      </CardWrapper>
    </LinkStyled>
  );
}

export default Card;
