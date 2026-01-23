import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TitleOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 50%, transparent 100%);
  padding: 2rem 1rem 1rem 1rem;
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;

  span {
    color: white;
    font-size: 1rem;
    font-weight: 600;
    display: block;
    text-align: center;
  }

  @media screen and (max-width: 468px){
    display: none;
  }
`;

const LinkStyled = styled(Link)`
  padding: 0.25rem;
  flex: 0 0 calc(100% / var(--items-per-screen));

  ${(props) => ((props.width === 'max-content')
    ? 'max-width: max-content'
    : 'max-width: calc(100% / var(--items-per-screen));')}

  &:first-of-type{
    padding-left: 0;
  }

  &:last-of-type{
    padding-right: 0;
  }

  &:hover ${TitleOverlay} {
    transform: translateY(0);
  }

`;

const CardWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
`;

const ImageStyled = styled.img`
  display: block;
  border: 3px solid #161824;
  transform: scale(1);
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px;
  border-radius: 0.5rem;
  transition: all .3s ease-in-out;
  width: 100%;
  object-fit: cover;
  background-color: #171822;

  ${(props) => ((props.height === 'no-carousel')
    ? 'height: auto;'
    : 'height: var(--items-height);')}


  &:hover{
    border: 3px solid #D7DEE8;
    transform: scale(1.05);
  }

  @media screen and (max-width: 468px){
    border: none;

    ${(props) => ((props.height === 'no-carousel')
    ? 'height: auto;'
    : 'height: 15rem;')}

    &:hover{
      border: none;
      transform: none;
    }
  }
`;

export { ImageStyled, LinkStyled, CardWrapper, TitleOverlay };
