import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}
export const Container = styled.div<ContainerProps>`
background:#128ae2;
border-radius: 10px;
border: 2px solid #232129;
width: 100%;
height: 45px;
padding: 16px;
color: #fff;
display: flex;
align-items: center;
& + div {
  margin-top: 8px;
}
${props =>
  props.isErrored &&
  css`
    border-color: #c53030;
  `}
${props =>
  props.isFocused &&
  css`
    color: #ff9000;
    border-color: #ff9000;
  `}

${props =>
  props.isFilled &&
  css`
    color: #ff9000;
  `}


input{
  background: transparent;
  flex:1;
  border: 0;
  color:#f4ede8;


  &::placeholder {
    color:#fff
  }


}

svg {
  margin-right : 16px;

}
`;
