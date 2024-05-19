import React, { useState } from 'react';

// Компонент, принимающий карту (map) через пропсы
const ChainsMap = ({ map }) => {
  // Состояние для отслеживания видимости цепочек для каждого слова
  const [visibleChains, setVisibleChains] = useState({});

  // Функция для переключения видимости цепочек для данного слова
  const toggleVisibility = (word) => {
    setVisibleChains(prevState => ({
      ...prevState,
      [word]: !prevState[word]
    }));
  };

  return (
    <div>
      <h2>Цепочки ассоциаций для выбранных слов:</h2>
      {Object.keys(map).map((word, index) => (
        <div key={index} style={styles.wordContainer}>
          <h3 onClick={() => toggleVisibility(word)} style={styles.wordHeader}>
            {word} {visibleChains[word] ? '▲' : '▼'}
          </h3>
          {visibleChains[word] && map[word] && map[word].chains && (
            <div>
              {map[word].chains.map((chain, chainIndex) => (
                <div key={chainIndex} style={styles.chainContainer}>
                  <div style={styles.wordsContainer}>
                    {chain.words.map((chainWord, wordIndex) => (
                      <React.Fragment key={wordIndex}>
                        <span style={styles.word}>{chainWord}</span>
                        {wordIndex < chain.words.length - 1 && (
                          <span style={styles.arrow}>→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <p style={styles.total}>Длина: {chain.total}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Стили для контейнера слов и цепочек
const styles = {
  wordContainer: {
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    backgroundColor: '#f0f0f0'
  },
  chainContainer: {
    border: '1px solid #ddd',
    padding: '5px',
    margin: '5px 0',
    borderRadius: '3px',
    backgroundColor: '#fff'
  },
  wordsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  word: {
    margin: '0 5px',
    fontSize: '14px'
  },
  arrow: {
    margin: '0 5px',
    fontSize: '14px',
    color: '#888'
  },
  wordHeader: {
    cursor: 'pointer'
  },
  total: {
    marginTop: '10px',
    fontSize: '12px',
    color: '#555'
  }
};

export default ChainsMap;
