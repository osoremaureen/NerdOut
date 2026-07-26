import React, { useState, useEffect } from 'react';
import { styles } from '../styles';

const API_KEY = '37bc12cc2f38ac3da9847d8b729e3ae6'; 
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const HomePage = ({ filmsRef, tvRef, onCardClick }) => {
  const [films, setFilms] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [heroMovie, setHeroMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [moviesResponse, tvResponse] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`)
        ]);
        const moviesData = await moviesResponse.json();
        const tvData = await tvResponse.json();
        setFilms(moviesData.results);
        setTvShows(tvData.results);

        const topMovie = moviesData.results[0];
        if (topMovie) {
          setHeroMovie(topMovie);
          
          const videoRes = await fetch(`https://api.themoviedb.org/3/movie/${topMovie.id}/videos?api_key=${API_KEY}`);
          const videoData = await videoRes.json();
          const trailer = videoData.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
          if (trailer) setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error('Ошибка при загрузке HomePage:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const heroBackdrop = heroMovie?.backdrop_path 
    ? `${IMG_BASE_URL}${heroMovie.backdrop_path}` 
    : null;

  const heroPosterUrl = heroMovie?.poster_path 
    ? `${IMG_BASE_URL}${heroMovie.poster_path}` 
    : null;

  const handleHeroClick = () => {
    if (heroMovie) {
      onCardClick({ ...heroMovie, media_type: 'movie' });
    }
  };

  return (
    <>
      <div style={styles.heroBanner}>
        {trailerKey ? (
          <iframe 
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&playlist=${trailerKey}&controls=0&showinfo=0&rel=0`}
            style={styles.heroBgVideo}
            title="Movie Trailer"
            allowFullScreen
          />
        ) : (
          heroBackdrop && <div style={{...styles.heroBgImage, backgroundImage: `url(${heroBackdrop})`}}></div>
        )}
        
        <div style={styles.heroOverlay}></div>

        <div style={styles.heroContentRow}>
          
          <div style={styles.heroTextBlock} onClick={handleHeroClick}>
            <h1 style={styles.heroTitleBig}>
              {heroMovie?.title || 'The Backrooms'}
            </h1>
            <div style={styles.heroMeta}>
              {heroMovie?.release_date?.slice(0, 4) || '2026'} · Trending Now
            </div>
            <button 
              style={styles.heroBtn}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              View Details
            </button>
          </div>

          <div style={styles.heroPosterWrap} onClick={handleHeroClick}>
            {heroPosterUrl ? (
              <img src={heroPosterUrl} alt={heroMovie?.title} style={styles.heroPosterImg} />
            ) : (
              <div style={{...styles.heroPosterImg, background: '#2c2c2c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px', fontWeight: 'bold'}}>
                No Image
              </div>
            )}
          </div>
        </div>
      </div>

      <div ref={filmsRef} style={styles.sectionWrapper}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTitle}>Trending</span>
          <span style={{ ...styles.tabPill, backgroundColor: '#b77893' }}>Films</span>
        </div>
        
        <div style={styles.carouselContainer}>
          {loading ? <p style={{padding: '20px', color: '#888'}}>Загрузка фильмов...</p> : (
            films.map((movie) => {
              const imageUrl = movie.poster_path 
                ? `${IMG_BASE_URL}${movie.poster_path}` 
                : (movie.backdrop_path ? `${IMG_BASE_URL}${movie.backdrop_path}` : '#2c2c2c');
              
              return (
                <div 
                  key={movie.id} 
                  style={{ ...styles.carouselItem, backgroundImage: `url(${imageUrl})` }}
                  onClick={() => onCardClick({ ...movie, media_type: 'movie' })}
                >
                  <h3 style={styles.movieTitle}>{movie.title}</h3>
                  <span style={styles.movieYear}>{movie.release_date?.slice(0, 4) || '2024'}</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div ref={tvRef} style={styles.sectionWrapper}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTitle}>Trending</span>
          <span style={{ ...styles.tabPill, backgroundColor: '#b77893' }}>TV Shows</span>
        </div>
        
        <div style={styles.carouselContainer}>
          {loading ? <p style={{padding: '20px', color: '#888'}}>Загрузка сериалов...</p> : (
            tvShows.map((show) => {
              const imageUrl = show.poster_path 
                ? `${IMG_BASE_URL}${show.poster_path}` 
                : (show.backdrop_path ? `${IMG_BASE_URL}${show.backdrop_path}` : '#2c2c2c');

              return (
                <div 
                  key={show.id} 
                  style={{ ...styles.carouselItem, backgroundImage: `url(${imageUrl})` }}
                  onClick={() => onCardClick({ ...show, media_type: 'tv' })}
                >
                  <h3 style={styles.movieTitle}>{show.name}</h3>
                  <span style={styles.movieYear}>{show.first_air_date?.slice(0, 4) || '2024'}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
      
      <div style={{ marginTop: '40px', padding: '20px 0', borderTop: '1px solid #ccc', fontWeight: 'bold' }}>
        OSOREMORI
      </div>
    </>
  );
};

export default HomePage;