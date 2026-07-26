import React, { useState, useEffect } from 'react';
import { styles } from '../styles';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const DetailsPage = ({ media, onClose, isInWatchlist, toggleWatchlist, addToWatched, handleUpdateEpisode, episodeProgress }) => {
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const [selectedSeason, setSelectedSeason] = useState(null);
  const [seasonsData, setSeasonsData] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!media) return;
      setLoading(true);
      try {
        const { id, media_type } = media;
        const [detailsRes, creditsRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${API_KEY}`)
        ]);

        const detailsData = await detailsRes.json();
        const creditsData = await creditsRes.json();

        setDetails(detailsData);
        setCredits(creditsData);

        if (media_type === 'tv' && detailsData.seasons) {
          const validSeasons = detailsData.seasons.filter(s => s.season_number > 0 && s.episode_count > 0);
          setSeasonsData(validSeasons);
          if (validSeasons.length > 0) setSelectedSeason(validSeasons[0].season_number);
        }

      } catch (error) {
        console.error('Ошибка загрузки деталей:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [media]);

  const toggleEpisodeWatched = (seasonNum, episodeNum) => {
    if (!details) return;
    const key = String(details.id);
    const current = episodeProgress[key] || [];
    
    let updated;
    if (current.includes(episodeNum)) {
      updated = current.filter(ep => ep !== episodeNum);
    } else {
      updated = [...current, episodeNum];
    }

    handleUpdateEpisode(details.id, updated, {
      id: details.id,
      title: details.name,
      poster_path: details.poster_path,
      media_type: media.media_type
    });
  };

  const isEpisodeWatched = (seasonNum, episodeNum) => {
    if (!details) return false;
    const key = String(details.id);
    return (episodeProgress[key] || []).includes(episodeNum);
  };

  const handleToggleAllEpisodes = () => {
    if (!selectedSeason || !details) return;
    const currentSeasonInfo = seasonsData.find(s => s.season_number === selectedSeason);
    if (!currentSeasonInfo) return;
    
    const totalEpisodes = currentSeasonInfo.episode_count;
    const key = String(details.id);
    const watchedList = episodeProgress[key] || [];
    let updated = [];

    if (watchedList.length === totalEpisodes) {
      updated = [];
    } else {
      updated = Array.from({ length: totalEpisodes }, (_, i) => i + 1);
    }

    handleUpdateEpisode(details.id, updated, {
      id: details.id,
      title: details.name,
      poster_path: details.poster_path,
      media_type: media.media_type
    });
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((i) => {
      const currentRating = hoveredRating !== 0 ? hoveredRating : userRating;
      let fillWidth = 0;
      if (currentRating >= i) fillWidth = 100;
      else if (currentRating >= i - 0.5 && currentRating < i) fillWidth = 50;

      return (
        <div
          key={i}
          style={styles.starWrapper}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const isHalf = x < rect.width / 2;
            const newRating = isHalf ? i - 0.5 : i;
            setUserRating(newRating);
            
            if (newRating > 0) {
              addToWatched({
                id: media.id,
                title: details?.title || details?.name,
                poster_path: details?.poster_path,
                release_date: details?.release_date || details?.first_air_date,
                media_type: media.media_type
              });
            }
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const isHalf = x < rect.width / 2;
            setHoveredRating(isHalf ? i - 0.5 : i);
          }}
          onMouseLeave={() => setHoveredRating(0)}
        >
          <svg style={styles.starSvg} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.2253 32.6792L22.0003 29.1958L27.7753 32.725L26.2628 26.125L31.3503 21.725L24.6587 21.1292L22.0003 14.8958L19.342 21.0833L12.6503 21.6792L17.7378 26.125L16.2253 32.6792ZM10.6795 40.3333L13.6587 27.4542L3.66699 18.7917L16.867 17.6458L22.0003 5.5L27.1337 17.6458L40.3337 18.7917L30.342 27.4542L33.3212 40.3333L22.0003 33.5042L10.6795 40.3333Z" fill="none" stroke="#1D1B20" strokeWidth="2"/>
          </svg>
          <div style={{ ...styles.starFilledOverlay, width: `${fillWidth}%` }}>
            <svg style={styles.starSvg} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.2253 32.6792L22.0003 29.1958L27.7753 32.725L26.2628 26.125L31.3503 21.725L24.6587 21.1292L22.0003 14.8958L19.342 21.0833L12.6503 21.6792L17.7378 26.125L16.2253 32.6792ZM10.6795 40.3333L13.6587 27.4542L3.66699 18.7917L16.867 17.6458L22.0003 5.5L27.1337 17.6458L40.3337 18.7917L30.342 27.4542L33.3212 40.3333L22.0003 33.5042L10.6795 40.3333Z" fill="#FFCD44" stroke="#1D1B20" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      );
    });
  };

  if (loading || !details) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Загрузка информации...</div>;
  }

  const title = details.title || details.name;
  const posterUrl = details.poster_path ? `${IMG_BASE_URL}${details.poster_path}` : 'https://placehold.co/300x450/333/fff?text=No+Image';
  
  const getCrewByJobs = (jobList) => {
    if (!credits.crew) return 'N/A';
    const foundNames = credits.crew.filter(c => jobList.includes(c.job)).map(c => c.name);
    return foundNames.length > 0 ? foundNames.join(', ') : 'N/A';
  };

  const directors = getCrewByJobs(['Director']);
  const writers = getCrewByJobs(['Writer', 'Screenplay', 'Story']);
  const producers = getCrewByJobs(['Producer']);
  const genres = details.genres?.map(g => g.name).join(', ') || 'N/A';
  const releaseYear = details.release_date?.slice(0, 4) || details.first_air_date?.slice(0, 4) || 'N/A';
  
  const status = details.status || 'N/A';
  const language = details.spoken_languages?.map(l => l.english_name).join(', ') || 'N/A';
  const budget = details.budget ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(details.budget) : 'N/A';
  const revenue = details.revenue ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(details.revenue) : 'N/A';
  const tmdbScore = details.vote_average ? `${details.vote_average.toFixed(1)} / 10` : 'N/A';
  const displayScore = (userRating * 2).toFixed(1);
  const inWatchlist = isInWatchlist(media);

  return (
    <div style={styles.detailsContainer}>
      <button onClick={() => onClose(null)} style={{ alignSelf: 'flex-start', cursor: 'pointer', border: 'none', background: 'transparent', color: '#7A204A', fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>← Back</button>

      <div style={styles.detailsHeaderContainer}>
        <div style={styles.detailsPosterContainer}><img src={posterUrl} alt={title} style={styles.detailsPoster} /></div>
        <div style={styles.detailsInfoBox}>
          <div style={styles.detailsInfoInner}>
            <div style={styles.detailsLeftCol}>
              <h1 style={styles.detailsTitle}>{title}</h1>
              <p style={styles.detailsSlogan}>{details.tagline}</p>
              <div style={styles.detailsMeta}>
                <div><b>Year:</b> {releaseYear}</div>
                <div><b>Genre:</b> {genres}</div>
                <div><b>Country:</b> {details.production_countries?.[0]?.name || 'N/A'}</div>
                <div><b>Director:</b> {directors}</div>
                <div><b>Screenwriter:</b> {writers}</div>
                <div><b>Producer:</b> {producers}</div>
                <div style={{ marginTop: '15px', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '15px' }}>
                  <div><b>Status:</b> {status}</div>
                  <div><b>Language:</b> {language}</div>
                  <div><b>TMDB Score:</b> {tmdbScore}</div>
                  <div><b>Budget:</b> {budget}</div>
                  <div><b>Revenue:</b> {revenue}</div>
                </div>
              </div>
            </div>
            <div style={styles.detailsRightCol}>
              <div style={styles.detailsSummaryBox}>
                <h4 style={{ margin: '0 0 15px 0', fontSize: '18px', fontWeight: 'bold' }}>Summary</h4>
                <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.6', color: '#333' }}>{details.overview || 'Описание отсутствует.'}</p>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div style={styles.detailsRatingRow}>
              <div style={styles.ratingStarsContainer}>{renderStars()}</div>
              {userRating > 0 && <span style={styles.ratingScore}>{displayScore}</span>}
            </div>

            <button 
              onClick={() => toggleWatchlist({
                id: media.id,
                title: details.title || details.name,
                poster_path: details.poster_path,
                media_type: media.media_type
              })}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: inWatchlist ? '#7A204A' : '#333',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {inWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
            </button>
          </div>
        </div>
      </div>

      {credits.cast?.length > 0 && (
        <div style={styles.castWrapper}>
          <h3 style={styles.castTitle}>Actors</h3>
          <div style={styles.castCarousel}>
            {credits.cast.slice(0, 12).map(actor => {
              const imgUrl = actor.profile_path ? `${IMG_BASE_URL}${actor.profile_path}` : 'https://placehold.co/100x140/fff/333?text=No+Img';
              return (<div key={actor.id} style={styles.castCard}><img src={imgUrl} alt={actor.name} style={styles.castImage} /><span style={styles.castName}>{actor.name}</span></div>);
            })}
          </div>
        </div>
      )}

      {media.media_type === 'tv' && (
        <div style={styles.seasonSection}>
          <h3 style={styles.seasonTitle}>Seasons</h3>
          <div style={styles.seasonLayout}>
            <div style={styles.seasonList}>
              {seasonsData.map(season => (
                <div key={season.id} style={{ ...styles.seasonListItem, ...(selectedSeason === season.season_number ? styles.seasonListItemActive : {}) }} onClick={() => setSelectedSeason(season.season_number)}>
                  Season {season.season_number}
                </div>
              ))}
            </div>
            <div style={styles.episodeListContainer}>
              <div style={styles.episodeListHeader}>
                <span style={{ fontWeight: 'bold' }}>Episodes</span>
                <button style={styles.btnMarkAll} onClick={handleToggleAllEpisodes}>All</button>
              </div>
              <div>
                {(() => {
                  const currentSeasonData = seasonsData.find(s => s.season_number === selectedSeason);
                  if (!currentSeasonData) return <div>Выберите сезон</div>;
                  return Array.from({ length: currentSeasonData.episode_count }).map((_, idx) => {
                    const epNum = idx + 1;
                    const watched = isEpisodeWatched(selectedSeason, epNum);
                    return (<div key={epNum} style={styles.episodeRow}><span style={{ color: '#888', fontSize: '14px' }}>{epNum}</span><span style={watched ? styles.episodeWatched : { fontSize: '14px' }}>Episode {epNum}</span><input type="checkbox" style={styles.episodeCheckbox} checked={watched} onChange={() => toggleEpisodeWatched(selectedSeason, epNum)} /></div>);
                  });
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
