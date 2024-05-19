import React, { useState } from 'react';
import styled from 'styled-components';
import UserAPIservice from "../services/user-api.service";

// Структура для стилей
const Container = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 20px 0;
  max-width: 600px;
  margin: 0 auto;
`;

const Input = styled.input`
  display: block;
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PathList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const PathItem = styled.li`
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
`;

const PathWord = styled.span`
  font-weight: bold;
`;

const Message = styled.p`
  color: #999;
  font-style: italic;
`;

const SearchPaths = ({ experimentId }) => {
  const [word1, setWord1] = useState('');
  const [word2, setWord2] = useState('');
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const findPaths = async () => {
    setLoading(true);
    setError('');
    setPaths([]);

    try {
      const response = await UserAPIservice.FindPaths(experimentId, word1, word2); // Предполагается, что userAPI.FindPaths - это асинхронная функция, которая возвращает объект с массивом путей
      setPaths(response.paths);
    } catch (err) {
      setError('Не удалось найти связи. Попробуйте еще раз.');
    }

    setLoading(false);
  };

  return (
    <Container>
      <h2>Поиск связей в графе</h2>
      <Input
        type="text"
        value={word1}
        onChange={(e) => setWord1(e.target.value)}
        placeholder="Введите первое слово"
      />
      <Input
        type="text"
        value={word2}
        onChange={(e) => setWord2(e.target.value)}
        placeholder="Введите второе слово"
      />
      <Button onClick={findPaths} disabled={loading || !word1 || !word2}>
        {loading ? 'Поиск...' : 'Найти связи'}
      </Button>
      {error && <Message>{error}</Message>}
      {!error && paths.length === 0 && !loading && <Message>Связи не найдены.</Message>}
      <PathList>
        {paths.map((path, index) => (
          <PathItem key={index}>
            <PathWord>{path.words.join(' -> ')}</PathWord>
            <span>Длина: {path.total}</span>
          </PathItem>
        ))}
      </PathList>
    </Container>
  );
};

export default SearchPaths;
