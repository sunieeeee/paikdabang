import React, {memo} from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
    background-color: #333;
    color: #fff;
    padding: 10px;
    text-align: center;
`;

const Footer = memo(() => {
    return (
        <FooterContainer>
            copyright&copy;2024. megastudy-it
        </FooterContainer>
    );
});

export default Footer;