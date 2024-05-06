import React, {memo} from 'react';
import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #ffffff;
  border: none;
  width: 60px;
  height: 60px;
  font-size: 15px;
  background-color: color(srgb 0.9992 0.9013 0.0094);
  color: #333;
  cursor: pointer;
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
  transition: opacity 0.3s ease;

  > div {
    display: inline-block;
    font-size: 10px;
  }
`;

const TopBtn = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button isVisible={isVisible} onClick={scrollToTop} aria-label="Scroll to top">
      <div>&#9650;</div>
      <p>TOP</p>
    </Button>
  );
});

TopBtn.displayName ="TopBtn";

export default TopBtn;