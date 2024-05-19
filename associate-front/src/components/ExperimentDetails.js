import React from 'react';
import styled from 'styled-components';

// Styled-components для стилизации
const ExperimentContainer = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 20px 0;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Description = styled.p`
  margin: 10px 0;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0;
`;

const InfoItem = styled.li`
  margin-bottom: 5px;
`;

const AssociationList = styled.ul`
  list-style: none;
  padding: 0;
`;

const AssociationItem = styled.li`
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
`;

const AssociationWord = styled.span`
  font-weight: bold;
`;

const TimeSpend = styled.span`
  color: #999;
`;

const NoData = styled.p`
  color: #999;
  font-style: italic;
`;

// Компонент ExperimentDetails
const ExperimentDetails = ({ experiment }) => {
  if (!experiment) {
    return <NoData>Данные эксперимента недоступны.</NoData>;
  }

  return (
    <ExperimentContainer>
      <Title>{experiment.name}</Title>
      <Description>{experiment.description}</Description>
      <InfoList>
        <InfoItem><strong>Требуемое количество:</strong> {experiment.requiredAmount}</InfoItem>
        <InfoItem><strong>Проведенные эксперименты:</strong> {experiment.conductedExperiments}</InfoItem>
        <InfoItem><strong>Эксперимент пройден:</strong> {experiment.experimentPassed ? 'Да' : 'Нет'}</InfoItem>
      </InfoList>
      <h3>Стимвулы эксперимента:</h3>
      <AssociationList>
        {experiment.experimentStimuses.map((assoc, index) => (
          <AssociationItem key={index}>
            <AssociationWord>{assoc.name}</AssociationWord>
            {assoc.limitedResponseTime &&
            <TimeSpend>{assoc.limitedResponseTime} секунд</TimeSpend>}
          </AssociationItem>
        ))}
      </AssociationList>
    </ExperimentContainer>
  );
};

export default ExperimentDetails;
