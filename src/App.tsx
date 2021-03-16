import { useEffect, useState } from 'react';

import { api } from './services/api';

import MovieProps from './models/Movie';
import GenreResponseProps from './models/Genre';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      
      <SideBar selectedGenreId={selectedGenreId} setSelectedGenreId={setSelectedGenreId} />

      <Content movies={movies} selectedGenre={selectedGenre} />
      
    </div>
  )
}