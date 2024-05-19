import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import UserAPIservice from "../services/user-api.service";

const Container = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 20px 0;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Word = styled.h2`
  margin-bottom: 20px;
`;

const Input = styled.input`
  display: block;
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 0 auto;
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

const Message = styled.p`
  color: #999;
  font-style: italic;
`;

const Disclaimer = styled.div`
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #007bff;
  border-radius: 5px;
  background-color: #f9f9f9;
  color: #333;
`;

const AssociationInput = () => {
  const { id: experimentId } = useParams();
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(
    JSON.parse(localStorage.getItem('currentIndex')) || 0
  );
  const [association, setAssociation] = useState('');
  const [associations, setAssociations] = useState(
    JSON.parse(localStorage.getItem('associations')) || {}
  );
  const [message, setMessage] = useState('');
  const [startTime, setStartTime] = useState(Date.now());
  const [showDisclaimer, setShowDisclaimer] = useState(
    !localStorage.getItem('disclaimerShown')
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await UserAPIservice.GetExperiment(experimentId);
        const stimuses = result.experimentStimuses;
        setWords(stimuses);
      } catch (err) {
        console.error("Failed to fetch experiment data:", err);
        setMessage('Не удалось загрузить данные эксперимента.');
      }
    };

    fetchData();
  }, [experimentId]);

  useEffect(() => {
    localStorage.setItem('currentIndex', currentIndex);
    localStorage.setItem('associations', JSON.stringify(associations));
  }, [currentIndex, associations]);

  const handleStart = () => {
    setShowDisclaimer(false);
    localStorage.setItem('disclaimerShown', 'true');
    setStartTime(Date.now());
  };

  const handleSubmit = () => {
    if (association.trim() === '') {
      setMessage('Введите ассоциацию.');
      return;
    }

    const endTime = Date.now();
    const timeSpend = parseInt((endTime - startTime) / 1000); // время в секундах

    const updatedAssociations = {
      ...associations,
      [words[currentIndex].name]: {
        stimusWordId: words[currentIndex].id,
        assotiationWord: association,
        timeSpend
      },
    };

    setAssociations(updatedAssociations);
    setAssociation('');
    setMessage('');

    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setStartTime(Date.now());
    } else {
      sendResults(updatedAssociations);
    }
  };

  const sendResults = async (results) => {
    const answers = Object.values(results);
    const req = { experimentId, userId: 0, answers }; // assuming userId is 0, you can replace it with the actual userId if needed

    try {
      await UserAPIservice.СreateExperimentAnswer(req);
      setMessage('Все слова обработаны и результаты отправлены.');
      localStorage.removeItem('currentIndex');
      localStorage.removeItem('associations');
    } catch (err) {
      console.error('Failed to send results:', err);
      setMessage('Не удалось отправить результаты.');
    }
  };

  return (
    <Container>
      {showDisclaimer ? (
        <Disclaimer>
          <p>
            Ваша задача - свободно выражать первые мысли и ассоциации, которые приходят вам в голову в ответ на предложенные стимулы. Пожалуйста, будьте открытыми и честными в вашей реакции на каждый стимул.
          </p>
          <Button onClick={handleStart}>Начать</Button>
        </Disclaimer>
      ) : words.length > 0 && currentIndex < words.length ? (
        <>
          <Word>{words[currentIndex].name}</Word>
          <Input
            type="text"
            value={association}
            onChange={(e) => setAssociation(e.target.value)}
            placeholder="Введите ассоциацию"
          />
          <Button onClick={handleSubmit} disabled={!association}>
            Сохранить ассоциацию
          </Button>
          {message && <Message>{message}</Message>}
        </>
      ) : (
        <Message>{message || 'Загрузка данных...'}</Message>
      )}
    </Container>
  );
};

export default AssociationInput;
