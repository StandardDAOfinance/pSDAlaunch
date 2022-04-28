import headerBG from '../../assets/images/headerBG.svg';

const styles = {
  HeaderBG: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    minHeight: '100vh',
    zIndex: '-8',
    background: `url(${headerBG}) no-repeat center center / cover`,
  },
};

export const Header = () => {
  return <div style={styles.HeaderBG} />;
};
