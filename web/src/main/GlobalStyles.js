import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

    @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        height: 100%;
    }

    body {
        background: #f5f5f5;
        color: #464e47;
        font: 400 14px Roboto, Arial, Helvetica, sans-serif;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }

    body, input, button, textarea {
        font: 400 18px Roboto, Arial, Helvetica, sans-serif;
    }

    button {
        cursor: pointer;
    }
`;