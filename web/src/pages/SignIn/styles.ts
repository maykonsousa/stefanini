import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import BgImg from '../../assets/images/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  align-items: center;

  img {
    width: 350px;
    align-items: center;
  }

  form {
    margin-top: 80px;
    width: 340px;
    text-align: center;
    h1 {
      margin-bottom: 16px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: 0.2s;
      :hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
`;

const appearFromleft = keyframes`
from {
opacity:0;
transform: translateX(-50px)

}
to{
  opacity:1;
transform: translateX(0)
}
`;

export const AnimatedContainer = styled.div`
  align-items: center;
  animation: ${appearFromleft} 1s;
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
`;

export const Background = styled.div`
  flex: 1;
  background: url(${BgImg}) no-repeat center;
  background-size: cover;
`;
