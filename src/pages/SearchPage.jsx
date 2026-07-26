import React, { useState, useEffect, useRef } from 'react';
import { styles } from '../styles';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const SearchPage = ({ onCardClick }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetchingNext, setIsFetchingNext] = useState(false);
  
  const searchTimeoutRef = useRef(null);
  const loadMoreRef = useRef(null);

  const fetchData = async (filter, query, pageNum = 1, append = false) => {
    if (pageNum === 1) setLoading(true);
    else setIsFetchingNext(true);

    let mediaType = '';
    if (filter === 'films') mediaType = 'movie';
    else if (filter === 'tv') mediaType = 'tv';
    else mediaType = 'all';

    let url = '';
    if (!query.trim()) {
      url = `https://api.themoviedb.org/3/trending/${mediaType === 'all' ? 'all' : mediaType}/week?api_key=${API_KEY}&page=${pageNum}`;
    } else {
      const searchType = mediaType === 'all' ? 'multi' : mediaType;
      url = `https://api.themoviedb.org/3/search/${searchType}?api_key=${API_KEY}&query=${query}&page=${pageNum}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (append) {
        setResults(prev => [...prev, ...data.results]);
      } else {
        setResults(data.results || []);
      }
      setPage(pageNum);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      if (!append) setResults([]);
    } finally {
      if (pageNum === 1) setLoading(false);
      else setIsFetchingNext(false);
    }
  };

  useEffect(() => {
    if (loading || isFetchingNext || page >= totalPages) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData(activeFilter, searchTerm, page + 1, true);
        }
      },
      { threshold: 1.0, rootMargin: '100px' }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [loading, isFetchingNext, page, totalPages, activeFilter, searchTerm]);

  useEffect(() => {
    fetchData(activeFilter, searchTerm, 1, false);
  }, []);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setPage(1);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    fetchData(filter, searchTerm, 1, false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPage(1);

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = setTimeout(() => {
      fetchData(activeFilter, value, 1, false);
    }, 400);
  };

  const getTitle = (item) => {
    if (item.media_type === 'tv' || item.name) return item.name;
    return item.title;
  };

  return (
    <div style={styles.searchContainer}>
      <div style={styles.searchBarWrapper}>
        <div style={styles.searchInputWrapper}>
          <input 
            style={styles.searchInput} 
            placeholder="Enter the title" 
            value={searchTerm}
            onChange={handleInputChange}
          />
          <svg 
            style={styles.searchIcon} 
            onClick={() => fetchData(activeFilter, searchTerm, 1, false)}
            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        <div style={styles.filterButtonsWrapper}>
          <button 
            style={{...styles.filterBtn, ...(activeFilter === 'films' ? styles.filterBtnActive : {})}}
            onClick={() => handleFilterChange('films')}
          >Films</button>
          <button 
            style={{...styles.filterBtn, ...(activeFilter === 'tv' ? styles.filterBtnActive : {})}}
            onClick={() => handleFilterChange('tv')}
          >TV Shows</button>
          <button 
            style={{...styles.filterBtn, ...(activeFilter === 'all' ? styles.filterBtnActive : {})}}
            onClick={() => handleFilterChange('all')}
          >All</button>
        </div>
      </div>

      <div style={styles.searchGrid}>
        {loading && Array.from({ length: 12 }).map((_, index) => (
          <div key={index} style={{...styles.searchGridItem, backgroundColor: '#e0e0e0'}}></div>
        ))}

        {!loading && results.length > 0 && results.map((item) => {
          const posterPath = item.poster_path || item.backdrop_path;
          const mediaType = item.media_type || (activeFilter === 'films' ? 'movie' : 'tv');
          
          if (posterPath) {
            return (
              <div 
                key={item.id} 
                title={getTitle(item)} 
                style={{ ...styles.searchGridItem, backgroundImage: `url(${IMG_BASE_URL}${posterPath})` }}
                onClick={() => onCardClick({ ...item, media_type: mediaType })} 
              />
            );
          } 
          else {
            return (
              <div 
                key={item.id} 
                style={{...styles.searchGridItem, position: 'relative'}}
                onClick={() => onCardClick({ ...item, media_type: mediaType })} 
              >
                <div style={styles.placeholderImage}>{getTitle(item)}</div>
              </div>
            );
          }
        })}

        {!loading && searchTerm.trim() && results.length === 0 && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#888' }}>
            Ничего не найдено по запросу "{searchTerm}"
          </p>
        )}

        <div ref={loadMoreRef} style={{ gridColumn: '1 / -1', height: '20px', textAlign: 'center', padding: '20px' }}>
          {isFetchingNext && <span>Загрузка еще...</span>}
          {!loading && !isFetchingNext && page >= totalPages && totalPages > 1 && (
            <span style={{color: '#888'}}>— Конец списка —</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
