import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    /** reset.css */
    ${reset}

    :root {
        --color-black: #000000;
        --color-white: #ffffff;
        --color-gray: #999999;
        --color-blue: #283E8F;
        /* 구글 웹 폰트에서 설정한 글꼴 이름 */
        --font-sans: 'Noto Sans KR';
    }

    * {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    *:not(.fa-refular):not(.fa-solid) {
        font-family: var(--font-sans);
    }
`;

export default GlobalStyle;