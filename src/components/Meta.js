/**
 * <head>태그 내의 SEO 처리 및 기본 참조 리소스 명시
 */

/** 패키지 참조 */
// 기본 참조 객체
import React from 'react';
// SEO 처리 기능 패키지
import Head from "next/head";
// 미리보기 이미지 샘플
//import sample from './assets/img/sample.png';

/** SEO 처리 컴포넌트 */
const Meta = (props) => {
    return (
        <Head>
            <meta charSet='utf-8' />
            <title>{props.title}</title>
            {/* SEO 태그 */}
            <meta name='description' content={props.description} />
            <meta name='keywords' content={props.keywords} />
            <meta name='author' content={props.author} />
            <meta name="subject" content={props.subject} />
            <meta name="copyright" content={props.copyright} />
            <meta name="content-language" content="ko" />
            <meta property='og:type' content='website' />
            <meta property='og:title' content={props.title} />
            <meta property='og:description' content={props.description} />
            <meta property='og:url' content={props.url} />
            <meta property='og:image' content={props.image} />
            <link rel="icon" href={props.icon} type="image/png" />
            <link rel="shortcut icon" href={props.shortcutIcon} type="image/png" />
            <link rel="apple-touch-icon" href={props.appleTouchIcon} type="image/png" />
        </Head>
    );
};

/** props에 대한 기본값 설정 */
Meta.defaultProps = {
    title: 'MySite Demo',
    description: 'Next.js 예제 입니다.',
    author: '호쌤',
    subject: 'Next.js Frontend Programming',
    copyright: 'Lee K.H',
    keywords: 'Next',
    url: null,
    image: null,
    icon: null,
    shortcutIcon: null,
    appleTouchIcon: null,
};

export default Meta;
