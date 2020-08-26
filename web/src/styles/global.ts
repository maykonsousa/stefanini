import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: 0;
  }

  body {
    background-color:#0063ac;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  border-top, input, button
  {
    font-family: 'Roboto Slab', serif;
    font-size: 16;
  }

  button{
    cursor: pointer;
  }

`;
