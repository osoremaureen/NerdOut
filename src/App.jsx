import React, { useState, useRef, useEffect } from 'react';
import { styles } from './styles';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import DetailsPage from './pages/DetailsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedMedia, setSelectedMedia] = useState(null);
  
  const filmsRef = useRef(null);
  const tvRef = useRef(null);

  const [watchlist, setWatchlist] = useState([]);
  const [watchedItems, setWatchedItems] = useState([]);
  const [inProgressItems, setInProgressItems] = useState([]);
  const [episodeProgress, setEpisodeProgress] = useState({}); 

  const [profileData, setProfileData] = useState({
    name: 'Cool Name',
    bio: 'TWD fan',
    avatarUrl: null,
    backdropUrl: null,
    cardColor: '#6F6F6F' 
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('nerdout_profile');
    if (savedProfile) {
      try {
        setProfileData(JSON.parse(savedProfile));
      } catch (e) {
        console.error('Ошибка загрузки профиля');
      }
    }
  }, []);

  const updateProfile = (newData) => {
    const updated = { ...profileData, ...newData };
    setProfileData(updated);
    localStorage.setItem('nerdout_profile', JSON.stringify(updated));
  };

  const toggleWatchlist = (item) => {
    const key = `${item.media_type}_${item.id}`;
    setWatchlist(prev => {
      const exists = prev.some(i => `${i.media_type}_${i.id}` === key);
      if (exists) return prev.filter(i => `${i.media_type}_${i.id}` !== key);
      return [...prev, item];
    });
  };

  const isInWatchlist = (item) => {
    return watchlist.some(i => `${i.media_type}_${i.id}` === `${item.media_type}_${item.id}`);
  };

  const addToWatched = (item) => {
    const key = `${item.media_type}_${item.id}`;
    setWatchedItems(prev => {
      const exists = prev.some(i => `${i.media_type}_${i.id}` === key);
      if (exists) return prev;
      return [...prev, item];
    });
  };

  const addToInProgress = (item) => {
    const key = `${item.media_type}_${item.id}`;
    setInProgressItems(prev => {
      const exists = prev.some(i => `${i.media_type}_${i.id}` === key);
      if (exists) return prev;
      return [...prev, item];
    });
  };

  const removeFromInProgress = (showId) => {
    setInProgressItems(prev => prev.filter(item => String(item.id) !== String(showId)));
  };

  const handleUpdateEpisode = (showId, updatedEpisodes, showObj) => {
    const prevEpisodes = episodeProgress[String(showId)] || [];
    setEpisodeProgress(prev => ({ ...prev, [String(showId)]: updatedEpisodes }));
    
    if (prevEpisodes.length === 0 && updatedEpisodes.length > 0) {
      addToInProgress(showObj);
    }
    if (prevEpisodes.length > 0 && updatedEpisodes.length === 0) {
      removeFromInProgress(showId);
    }
  };

  // Навигация
  const handleHomeClick = () => { setSelectedMedia(null); setCurrentPage('home'); };
  const handleFilmsClick = () => { setSelectedMedia(null); setCurrentPage('home'); setTimeout(() => filmsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100); };
  const handleTvClick = () => { setSelectedMedia(null); setCurrentPage('home'); setTimeout(() => tvRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100); };
  const handleSearchClick = () => { setSelectedMedia(null); setCurrentPage('search'); };
  const handleProfileClick = () => { setSelectedMedia(null); setCurrentPage('profile'); };

  const handleCardClick = (mediaItem) => {
    setSelectedMedia(mediaItem);
    setCurrentPage('details');
  };

  return (
    <div style={styles.app}>
      <Navbar 
        onHomeClick={handleHomeClick}
        onFilmsClick={handleFilmsClick}
        onTvClick={handleTvClick}
        onSearchClick={handleSearchClick}
        onProfileClick={handleProfileClick}
      />
      
      {currentPage === 'details' && selectedMedia ? (
        <DetailsPage 
          media={selectedMedia} 
          onClose={() => setCurrentPage('home')} 
          onCardClick={handleCardClick}
          isInWatchlist={isInWatchlist}
          toggleWatchlist={toggleWatchlist}
          addToWatched={addToWatched}
          handleUpdateEpisode={handleUpdateEpisode}
          episodeProgress={episodeProgress}
        />
      ) : (
        <>
          {currentPage === 'home' && <HomePage filmsRef={filmsRef} tvRef={tvRef} onCardClick={handleCardClick} />}
          {currentPage === 'search' && <SearchPage onCardClick={handleCardClick} />}
          {currentPage === 'profile' && (
            <ProfilePage 
              watchlist={watchlist}
              watchedItems={watchedItems}
              inProgressItems={inProgressItems}
              episodeProgress={episodeProgress}
              profileData={profileData}
              updateProfile={updateProfile}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;