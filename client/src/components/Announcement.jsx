import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  font-style: 14px;
  justify-content: center;
  font-weight: 500;
`;
export const Announcement = () => {
  return <Container>Super Deal! Free shipping on orders over Rs.500</Container>;
};
