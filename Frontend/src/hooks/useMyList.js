/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getItemDetail } from '../services/getDataFromAPI';
import addItemToDB from '../services/addItemToDB';
import addItemToMyList from '../services/addItemToMyList';
import getItemFromMyList from '../services/getItemFromMyList';
import deleteItemFromMyList from '../services/deleteItemFromMyList';
import trendingMovies from '../utils/trendingMovies';

function useMyList({ id, type }) {
  const { currentUser } = useAuth();

  const [itemDetail, setItemDetail] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Check if this is a custom cat movie
    if (id.startsWith('cat-')) {
      // Find the cat movie in trendingMovies
      let catMovie = null;
      Object.values(trendingMovies).forEach((brandMovies) => {
        const found = brandMovies.find((movie) => movie.id === id);
        if (found) {
          catMovie = found;
        }
      });

      if (catMovie) {
        setItemDetail(catMovie);
        setLoading(false);
        return;
      }
    }

    // Obtengo los detalles de la película o serie
    getItemDetail(id, type)
      .then((data) => {
        setItemDetail(data);
      });

    // Compruebo si la película o serie está guardada en la lista del usuario actual
    if (currentUser?.id) {
      getItemFromMyList({ idItem: id, userId: currentUser.id })
        .then((data) => {
          if (data.length > 0) {
            setSelected(true);
          } else {
            setSelected(false);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSaveMyList = async () => {
    if (selected) {
      setSelected(false);

      // Eliminar la película o serie de la lista del usuario actual
      await deleteItemFromMyList({ idItem: id, userId: currentUser.id });
    } else {
      setSelected(true);

      // Añadir la película o serie a la base de datos
      await addItemToDB({
        item_id: id,
        poster_path: itemDetail.poster_path,
        type,
      });

      // Relacionar la película o serie añadida con el usuario actual
      await addItemToMyList({
        user_id: currentUser.id,
        item_id: id,
      });
    }
  };

  return {
    handleSaveMyList, selected, itemDetail, isLoading,
  };
}

export default useMyList;
