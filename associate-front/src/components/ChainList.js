import React, { useState } from 'react';

// Компонент, принимающий массив объектов через пропсы
const ChainList = ({ longestChains }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      {isVisible && (
        <div>
          <h2>Наиболее длинные ассоциации:</h2>
          {longestChains.map((chain, index) => (
            <div key={index} style={styles.chainContainer}>
              <h3>Цепочка {index + 1}</h3>
              <div style={styles.wordsContainer}>
                {chain.words.map((word, wordIndex) => (
                  <React.Fragment key={wordIndex}>
                    <span style={styles.word}>{word}</span>
                    {wordIndex < chain.words.length - 1 && (
                      <span style={styles.arrow}>→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <p>Общее: {chain.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Стили для контейнера цепочек и слов
const styles = {
  chainContainer: {
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9'
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
  }
};

export default ChainList;