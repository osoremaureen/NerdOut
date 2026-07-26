import React, { useState, useRef } from 'react';
import { styles } from '../styles';

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const ProfilePage = ({ watchlist, watchedItems, inProgressItems, episodeProgress, profileData, updateProfile }) => {
  const [activeTab, setActiveTab] = useState('watched');
  const [isEditing, setIsEditing] = useState(false);
  
  const avatarInputRef = useRef(null);
  const backdropInputRef = useRef(null);

  const totalEpisodes = Object.values(episodeProgress).reduce((sum, arr) => sum + arr.length, 0);
  const tvShowIds = new Set();
  Object.keys(episodeProgress).forEach(id => tvShowIds.add(id));
  watchedItems.filter(item => item.media_type === 'tv').forEach(item => tvShowIds.add(String(item.id)));
  const tvShowsCount = tvShowIds.size;
  const filmsCount = watchedItems.filter(item => item.media_type === 'movie').length;

  let gridBg = '#7A204A';
  let activeStyle = styles.tabActiveWatched;
  if (activeTab === 'watchlist') {
    gridBg = '#1A3B7B';
    activeStyle = styles.tabActiveWatchlist;
  } else if (activeTab === 'inprogress') {
    gridBg = '#7A65D8';
    activeStyle = styles.tabActiveProgress;
  }

  let displayItems = [];
  if (activeTab === 'watched') displayItems = watchedItems;
  else if (activeTab === 'watchlist') displayItems = watchlist;
  else if (activeTab === 'inprogress') displayItems = inProgressItems;

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateProfile({ [type]: imageUrl });
    }
  };

  const containerStyles = profileData.backdropUrl 
    ? { 
        ...styles.profileContainer, 
        backgroundImage: `url(${profileData.backdropUrl})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        position: 'relative'
      } 
    : styles.profileContainer;

  return (
    <div style={containerStyles}>
      {profileData.backdropUrl && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: '30px',
          zIndex: 0
        }}></div>
      )}

      <input type="file" ref={avatarInputRef} style={{ display: 'none' }} accept="image/*" onChange={(e) => handleImageUpload(e, 'avatarUrl')} />
      <input type="file" ref={backdropInputRef} style={{ display: 'none' }} accept="image/*" onChange={(e) => handleImageUpload(e, 'backdropUrl')} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} style={{ padding: '8px 20px', background: '#fff', color: '#7A204A', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>✎ Edit Profile</button>
          ) : (
            <button onClick={handleSaveProfile} style={{ padding: '8px 20px', background: '#7A204A', color: '#fff', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>💾 Save Changes</button>
          )}
        </div>

        <div style={{ ...styles.profileCard, backgroundColor: profileData.cardColor }}>
          
          <div style={styles.profileInfo}>
            <div style={{ position: 'relative' }}>
              <div style={{ ...styles.avatar, backgroundImage: profileData.avatarUrl ? `url(${profileData.avatarUrl})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              {isEditing && (
                <button onClick={() => avatarInputRef.current.click()} style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: '#7A204A', border: '2px solid #fff', borderRadius: '50%', width: '25px', height: '25px', color: '#fff', cursor: 'pointer', fontSize: '12px' }}>🖊</button>
              )}
            </div>
            
            <div>
              {!isEditing ? (
                <>
                  <h2 style={styles.profileName}>{profileData.name}</h2>
                  <p style={styles.profileDesc}>{profileData.bio}</p>
                </>
              ) : (
                <>
                  <input type="text" value={profileData.name} onChange={(e) => updateProfile({ name: e.target.value })} style={{ display: 'block', fontSize: '28px', fontWeight: 'bold', color: '#fff', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '5px', padding: '5px 10px', marginBottom: '10px', width: '100%', outline: '2px solid #fff' }} />
                  <input type="text" value={profileData.bio} onChange={(e) => updateProfile({ bio: e.target.value })} style={{ display: 'block', fontSize: '14px', color: '#e0e0e0', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '5px', padding: '5px 10px', width: '100%', outline: '1px solid #fff' }} />
                </>
              )}
            </div>

            {isEditing && (
              <div style={{ position: 'absolute', top: '-10px', right: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                <button onClick={() => backdropInputRef.current.click()} style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid #ccc', borderRadius: '5px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', color: '#333' }}>Change Cover</button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.6)', padding: '4px 8px', borderRadius: '5px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#333' }}>BG Color:</span>
                  <input type="color" value={profileData.cardColor} onChange={(e) => updateProfile({ cardColor: e.target.value })} style={{ border: 'none', width: '22px', height: '22px', cursor: 'pointer', background: 'transparent', padding: 0 }} />
                </div>
              </div>
            )}
          </div>
          
          <div style={styles.profileStats}>
            <div style={styles.statBox}><span style={styles.statNum}>{totalEpisodes}</span><span style={styles.statLabel}>episodes</span></div>
            <div style={styles.statBox}><span style={styles.statNum}>{tvShowsCount}</span><span style={styles.statLabel}>tv shows</span></div>
            <div style={styles.statBox}><span style={styles.statNum}>{filmsCount}</span><span style={styles.statLabel}>films</span></div>
          </div>
        </div>

        <div style={styles.tabsContainer}>
          <div style={{ ...styles.tab, ...(activeTab === 'watched' ? activeStyle : styles.tabInactive) }} onClick={() => setActiveTab('watched')}>Watched</div>
          <div style={{ ...styles.tab, ...(activeTab === 'watchlist' ? activeStyle : styles.tabInactive) }} onClick={() => setActiveTab('watchlist')}>Watchlist</div>
          <div style={{ ...styles.tab, ...(activeTab === 'inprogress' ? activeStyle : styles.tabInactive) }} onClick={() => setActiveTab('inprogress')}>In progress</div>
        </div>

        <div style={{ ...styles.gridContainer, backgroundColor: gridBg }}>
          {displayItems.length > 0 ? (
            displayItems.map((item) => {
              const posterPath = item.poster_path;
              if (posterPath) {
                return <div key={`${item.media_type}_${item.id}`} style={{ ...styles.searchGridItem, backgroundImage: `url(${IMG_BASE_URL}${posterPath})` }} />;
              } else {
                return <div key={`${item.media_type}_${item.id}`} style={{...styles.searchGridItem, position: 'relative'}}><div style={styles.placeholderImage}>{item.title || item.name || 'No Name'}</div></div>;
              }
            })
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0', color: '#eee', fontWeight: 'bold' }}>
              List is empty
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;