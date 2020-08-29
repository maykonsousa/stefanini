import styled, { css, keyframes } from 'styled-components';

import { shade } from 'polished';

interface CardProps {
  className: string;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 0px;
`;
const AppearRightToLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX(50px)
  }
  to{
    opacity: 1;
    transform: translateX(0)
  }
  `;
export const AnimatedContainer = styled.div`
  > a {
    text-align: center;
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: 0.2s;

    svg {
      margin-right: 16px;
    }
    :hover {
      color: ${shade(0.4, '#ff9000')};
    }
  }
  h1 {
    padding-bottom: 10px;
  }
  animation: ${AppearRightToLeft} 1s;
`;
export const Content = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
`;

export const UsersContainer = styled.div`
  margin-left: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;

export const CardUser = styled.div`
  width: 275px;
  height: 150px;
  border-radius: 10px;
  color: #3a3a3a;
  position: relative;
  background: #70c1b3;
  transition: 0.2s;
  &:hover {
    background: ${shade(0.2, '#70c1b3')};
  }
  div {
    position: absolute;
    top: 5px;
    right: 5px;
    button {
      background: none;
      border: 0;
      svg {
        font-size: 28px;
        padding: 2px;
      }
    }
    svg {
      font-size: 28px;
      padding: 2px;
    }
  }
  h1 {
    font-size: 26px;
    padding: 10px;
    padding-top: 30px;
  }
  p {
    padding-left: 10px;
  }
  strong {
    padding-left: 10px;
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin-top: -110px;
  a {
    text-decoration: none;
  }
`;

export const Card = styled.div`
  padding: 22px 32px;
  border-radius: 5px;
  ${props =>
    props.className === 'users' &&
    css`
      color: #fff;
      background: #43cea2;
      background: -webkit-linear-gradient(to right, #185a9d, #43cea2);
      background: linear-gradient(to right, #185a9d, #43cea2);
    `}

  ${props =>
    props.className === 'profiles' &&
    css`
      color: #fff;
      background: #fe8c00;
      background: -webkit-linear-gradient(to right, #f83600, #fe8c00);
      background: linear-gradient(to right, #f83600, #fe8c00);
    `}

    ${props =>
      props.className === 'functionalities' &&
      css`
        color: #fff;
        background: #4b6cb7;
        background: -webkit-linear-gradient(to right, #182848, #4b6cb7);
        background: linear-gradient(to right, #182848, #4b6cb7);
      `}

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 16px;
    }
  }

  h1 {
    margin-top: 14px;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
  }
`;
