import React, {useContext, useEffect, useState} from 'react';
import { IdMovieContext }  from './../contexts/IdMovieContext';
import { LightDarkModeContext } from '../contexts/LightDarkModeContext';

const MovieDetails = () => {

  const { idMovie } = useContext(IdMovieContext);
  const { isDarkMode } = useContext(LightDarkModeContext);

 const [movieDetails, setMovieDatails] = useState("");

  async function getMovieDetails(id) { 
    let response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=ab72c6b9`);
    let data = await response.json();
    console.log(data);
    if(data.Response !== "False") setMovieDatails(data);    
  };

  useEffect( () => {  
    if(!movieDetails) getMovieDetails(idMovie)
  });

  const toRender = () => {
    if(!movieDetails) return <h1 className={`mt-5 pt-3 ${isDarkMode? 'text-white' : '' }`}>Movie not found!</h1>
    return(
      <div className='mt-5 pt-3 container'>
        <div className='row justify-content-center'>
          <div className="col-12 col-lg-6">
            <h1 className={isDarkMode? 'text-white': ''}>{movieDetails.Title} ({movieDetails.Year})</h1>
            <p className={isDarkMode? 'text-white': ''}>{movieDetails.Plot}</p>
          </div>

          <div className="col-12 col-lg-6 d-flex justify-content-center">
            <img src={movieDetails.Poster} alt={`${movieDetails.Title} poster`} className="img-thumbnail"/>
          </div>
        </div>
      </div>





      
        

     
    )
  }

  return (
    <div>
      { toRender() }
    </div>
  );
}
 
export default MovieDetails;