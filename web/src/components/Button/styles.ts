import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  margin-top: 20px;
  width: 100%;
  height: 45px;
  border-radius: 10px;
  background: #00e3ed;
  border: 0;
  font-size: 24px;
  color: #312e38;
  font-weight: 500;
  transition: 0.2s;
  &:hover {
    background: ${shade(0.2, '#00e3ed')};
    color: #fff;
  }
`;
