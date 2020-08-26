import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ContainerProps {
  type: 'error' | 'success' | 'info';
}
export const Container = styled(animated.div)<ContainerProps>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  display: flex;
  background: #ebf8ff;
  color: #3172b7;

  ${props =>
    props.type === 'success' &&
    css`
      background: #e6fffa;
      color: #2e656a;
    `}

  ${props =>
    props.type === 'error' &&
    css`
      background: #fddede;
      color: #c53030;
    `}
  & + div {
    margin-top: 8px;
  }
  > svg {
    margin: 4px 12px 0 0;
  }
  div {
    flex: 1;
    p {
      margin-top: 4px;
      font-size: 14px;
      line-height: 20px;
      opacity: 0.8;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background-color: transparent;
    color: inherit;
  }
`;
