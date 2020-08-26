import styled, { css } from 'styled-components';

interface CardProps {
  className: string;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  margin-top: -110px;
`;

export const Card = styled.div`
  padding: 22px 32px;
  border-radius: 5px;
  ${props =>
    props.className === 'income' &&
    css`
      color: #fff;
      background: #43cea2;
      background: -webkit-linear-gradient(to right, #185a9d, #43cea2);
      background: linear-gradient(to right, #185a9d, #43cea2);
    `}

  ${props =>
    props.className === 'outcome' &&
    css`
      color: #fff;
      background: #fe8c00;
      background: -webkit-linear-gradient(to right, #f83600, #fe8c00);
      background: linear-gradient(to right, #f83600, #fe8c00);
    `}

    ${props =>
      props.className === 'stock' &&
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

export const TableContainer = styled.section`
  margin-top: 64px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: #969cb3;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: #fff;
      font-size: 16px;
      font-weight: normal;
      color: #969cb3;

      &.title {
        color: #363f5f;
      }

      &.income {
        color: #12a454;
      }

      &.outcome {
        color: #e83f5b;
      }
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;