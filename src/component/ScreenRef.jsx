import React from 'react';

const ScreenRef = () => {
  const styles = {
    container: {
      fontFamily: 'sans-serif',
      backgroundColor: '#f2f2f2',
      padding: '20px',
      maxWidth: '600px',
      margin: 'auto',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.2)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px'
    },
    characterCard: {
      backgroundColor: '#fff',
      padding: '15px',
      borderRadius: '8px',
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    },
    characterImg: {
      width: '80px',
      height: '80px',
      borderRadius: '5px',
      objectFit: 'cover'
    },
    stats: {
      fontSize: '14px'
    },
    menu: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px'
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      flex: 1,
      margin: '0 5px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Granblue Fantasy UI - Sederhana</h2>
        <p>Selamat datang, Captain!</p>
      </div>

      <div style={styles.characterCard}>
        <img
          src="https://via.placeholder.com/80x80"
          alt="Hero"
          style={styles.characterImg}
        />
        <div style={styles.stats}>
          <h3>Lyria</h3>
          <p>Level: 20</p>
          <p>HP: 1500 / 1500</p>
          <p>ATK: 320</p>
        </div>
      </div>

      <div style={styles.menu}>
        <button style={styles.button}>Quest</button>
        <button style={styles.button}>Party</button>
        <button style={styles.button}>Battle</button>
      </div>
    </div>
  );
};

export default ScreenRef;
