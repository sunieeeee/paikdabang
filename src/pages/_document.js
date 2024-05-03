/**
 * 웹 페이지의 전체 레이아웃을 구성하는 파일
 * <html><head></head><body></body></html>
 */
import { Html, Head, Main, NextScript } from "next/document";

/**
 * 화면 렌더링 함수 -> Html, Head, Main 첫 글자가 대문자임에 주의
 */
const Document = () => {
    return (
        <Html lang="ko">
            <Head>
                {/*
                        <head>는 순수 HTML태그.
                        <Head>는 next.js의 컴포넌트.
                        이 안에서 charset과 viewport 지정은 자동으로 이루어진다.
                        그 외에 개발자가 적용하고자 하는 외부 CSS나 JS리소스 참조, SEO 구현등을 처리할 수 있다.
                    */}
                {/* 구글 웹폰트 적용 */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap" rel="stylesheet" />

                {/* font awesome */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

                {/* (Node v20미만에서 적용...) getInitialProps에서 리턴한 styleTags를 출력한다. */}
                {/* {this.props.styleTags} */}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

Document.displayName ="Document";

export default Document;
