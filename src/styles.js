export const styles = {
  app: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '0 40px',
    maxWidth: '1400px',
    margin: '0 auto',
    color: '#1a1a1a'
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0',
    marginBottom: '20px'
  },
  logo: {
    fontSize: '32px',
    fontWeight: '900',
    color: '#7A204A',
    letterSpacing: '1px',
    cursor: 'pointer',
    fontFamily: 'sans-serif'
  },
  navLinks: {
    display: 'flex',
    gap: '25px',
    fontWeight: '600',
    fontSize: '14px',
    color: '#7A204A'
  },
  navLink: {
    cursor: 'pointer'
  },
  heroBanner: {
    position: 'relative',
    borderRadius: '30px',
    height: '380px',
    marginBottom: '40px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
  },
  heroBgVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1,
    pointerEvents: 'none'
  },
  heroBgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)',
    zIndex: 2
  },
  heroContentRow: {
    position: 'relative',
    zIndex: 3,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0 50px'
  },
  heroTextBlock: {
    flex: 1,
    paddingRight: '30px',
    cursor: 'pointer'
  },
  heroTitleBig: {
    color: '#fff',
    fontSize: '48px',
    fontWeight: '900',
    margin: '0 0 10px 0',
    textShadow: '0 2px 10px rgba(0,0,0,0.6)',
    transition: 'color 0.2s'
  },
  heroMeta: {
    color: '#ccc',
    fontSize: '18px',
    marginBottom: '20px'
  },
  heroBtn: {
    backgroundColor: '#fff',
    color: '#7A204A',
    padding: '10px 25px',
    borderRadius: '30px',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'transform 0.2s, background 0.2s',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
  },
  heroPosterWrap: {
    flex: '0 0 200px',
    height: '300px',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
    cursor: 'pointer',
    transition: 'transform 0.3s',
    backgroundColor: '#2c2c2c'
  },
  heroPosterImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  sectionWrapper: {
    marginBottom: '40px'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#7A204A',
    borderRadius: '20px',
    padding: '8px 25px',
    marginBottom: '20px',
    color: '#fff'
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold'
  },
  tabPill: {
    backgroundColor: '#b77893',
    padding: '4px 25px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#fff'
  },
  carouselContainer: {
    display: 'flex',
    overflowX: 'auto',
    gap: '20px',
    padding: '10px 5px 20px 5px',
    scrollSnapType: 'x mandatory',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none'
  },
  carouselItem: {
    flex: '0 0 220px',
    height: '320px',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    scrollSnapAlign: 'start',
    cursor: 'pointer',
    color: '#fff',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  movieTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 5px 20px',
    textShadow: '1px 1px 5px rgba(0,0,0,0.8)'
  },
  movieYear: {
    fontSize: '12px',
    margin: '0 0 20px 20px',
    textShadow: '1px 1px 5px rgba(0,0,0,0.8)'
  },
  searchContainer: {
    padding: '20px 0 60px 0',
  },
  searchBarWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '40px',
    flexWrap: 'wrap',
    width: '100%'
  },
  searchInputWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#b3d9ff',
    borderRadius: '40px',
    padding: '0 25px 0 30px',
    height: '60px',
    minWidth: '200px'
  },
  searchInput: {
    flex: 1,
    border: 'none',
    background: 'transparent',
    fontSize: '18px',
    outline: 'none',
    padding: '0 10px 0 0',
    color: '#333',
  },
  searchIcon: {
    cursor: 'pointer',
    fontSize: '22px',
    color: '#1a1a1a'
  },
  filterButtonsWrapper: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  filterBtn: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#333',
    transition: 'all 0.2s',
    fontWeight: '500'
  },
  filterBtnActive: {
    borderColor: '#7A204A',
    color: '#7A204A',
    fontWeight: '700',
    backgroundColor: '#fff5f8'
  },
  searchGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '20px',
    marginTop: '20px'
  },
  searchGridItem: {
    paddingTop: '150%',
    borderRadius: '8px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    backgroundColor: '#dcdcdc'
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#2c2c2c',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    textAlign: 'center',
    padding: '10px',
    fontWeight: 'bold',
    fontSize: '14px',
    boxSizing: 'border-box',
    fontFamily: 'sans-serif'
  },
  detailsContainer: {
    padding: '20px 0 60px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px'
  },
  detailsHeaderContainer: {
    display: 'flex',
    gap: '30px',
    alignItems: 'stretch',
    minHeight: '500px'
  },
  detailsPosterContainer: {
    flex: '0 0 320px'
  },
  detailsPoster: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '15px',
    backgroundColor: '#ccc'
  },
  detailsInfoBox: {
    flex: 1,
    backgroundColor: '#dce8fa',
    borderRadius: '30px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  detailsInfoInner: {
    display: 'flex',
    gap: '30px',
    flex: 1
  },
  detailsLeftCol: {
    flex: '0.6'
  },
  detailsRightCol: {
    flex: '0.4',
    display: 'flex'
  },
  detailsSummaryBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '30px',
    padding: '25px 30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%'
  },
  detailsTitle: {
    color: '#7A204A',
    fontSize: '36px',
    fontWeight: '900',
    margin: '0 0 5px 0',
    textTransform: 'uppercase'
  },
  detailsSlogan: {
    color: '#555',
    fontStyle: 'italic',
    fontSize: '18px',
    margin: '0 0 20px 0'
  },
  detailsMeta: {
    fontSize: '16px',
    lineHeight: '2.0',
    color: '#1a1a1a'
  },
  detailsRatingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginTop: '20px'
  },
  ratingStarsContainer: {
    display: 'flex',
    gap: '0px',
    marginLeft: '-4px'
  },
  starWrapper: {
    position: 'relative',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    margin: '0 4px'
  },
  starSvg: {
    width: '40px',
    height: '40px',
    position: 'absolute',
    top: 0,
    left: 0
  },
  starFilledOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
    width: '0%',
    height: '40px'
  },
  ratingScore: {
    color: '#3d5a18',
    fontWeight: 'bold',
    fontSize: '28px'
  },
  castWrapper: {
    backgroundColor: '#7A204A',
    borderRadius: '20px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column'
  },
  castTitle: {
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 20px 0',
    textAlign: 'center'
  },
  castCarousel: {
    display: 'flex',
    overflowX: 'auto',
    gap: '15px',
    padding: '5px 5px 20px 5px',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none'
  },
  castCard: {
    flex: '0 0 140px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px'
  },
  castImage: {
    width: '100px',
    height: '140px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    objectFit: 'cover',
    border: '2px solid #fff'
  },
  castName: {
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#fff',
    textAlign: 'center'
  },
  seasonSection: {
    backgroundColor: '#dce8fa',
    borderRadius: '20px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column'
  },
  seasonTitle: {
    textAlign: 'center',
    color: '#000',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 25px 0'
  },
  seasonLayout: {
    display: 'flex',
    gap: '25px',
    height: '400px'
  },
  seasonList: {
    flex: '0 0 200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    overflowY: 'auto',
    paddingRight: '10px'
  },
  seasonListItem: {
    backgroundColor: '#fff',
    padding: '12px 15px',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: 'all 0.2s',
    color: '#1a1a1a'
  },
  seasonListItemActive: {
    borderColor: '#7A204A',
    backgroundColor: '#7A204A',
    color: '#fff'
  },
  episodeListContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: '15px',
    padding: '15px 20px',
    overflowY: 'auto'
  },
  episodeListHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #7A204A',
    paddingBottom: '10px',
    marginBottom: '10px'
  },
  btnMarkAll: {
    backgroundColor: '#7A204A',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 12px',
    fontWeight: 'bold',
    fontSize: '12px',
    cursor: 'pointer'
  },
  episodeRow: {
    display: 'grid',
    gridTemplateColumns: '40px 1fr 40px',
    gap: '15px',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #eee'
  },
  episodeCheckbox: {
    width: '18px',
    height: '18px',
    justifySelf: 'center',
    cursor: 'pointer',
    accentColor: '#7A204A'
  },
  episodeWatched: {
    textDecoration: 'line-through',
    color: '#888'
  },
  profileContainer: {
    backgroundColor: '#eaf3fa',
    borderRadius: '30px',
    padding: '25px',
    marginTop: '30px',
    position: 'relative',
    minHeight: '400px'
  },
  profileCard: {
    backgroundColor: '#6F6F6F',
    borderRadius: '20px',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    position: 'relative'
  },
  profileInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  avatar: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: '#dcdcdc'
  },
  profileName: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#fff',
    margin: '0'
  },
  profileDesc: {
    fontSize: '14px',
    color: '#e0e0e0',
    margin: '0'
  },
  profileStats: {
    display: 'flex',
    gap: '15px'
  },
  statBox: {
    backgroundColor: '#dcdcdc',
    borderRadius: '10px',
    padding: '5px 15px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: '50px'
  },
  statNum: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0'
  },
  statLabel: {
    fontSize: '11px',
    margin: '0'
  },
  tabsContainer: {
    display: 'flex',
    gap: '0'
  },
  tab: {
    flex: 1,
    padding: '15px',
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: '500',
    cursor: 'pointer',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
    transition: 'background 0.3s'
  },
  tabActiveWatched: {
    backgroundColor: '#7A204A',
    color: '#fff'
  },
  tabActiveWatchlist: {
    backgroundColor: '#1A3B7B',
    color: '#fff'
  },
  tabActiveProgress: {
    backgroundColor: '#7A65D8',
    color: '#fff'
  },
  tabInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: 'rgba(255, 255, 255, 0.7)'
  },
  gridContainer: {
    padding: '20px',
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '15px'
  },
  gridItem: {
    backgroundColor: '#dcdcdc',
    paddingTop: '120%',
    borderRadius: '5px'
  }
};