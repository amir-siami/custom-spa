// src/components/Header.tsx
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

interface HeaderProps {
  title: string;
  boldText: string;
}

const Header: React.FC<HeaderProps> = ({ title, boldText }) => {
  return (
    <h1 css={styles.h1}>
      <span css={styles.bold}>{boldText}</span> {title}
    </h1>
  );
};

const styles = {
  h1: css`
    font-size: 48px;
    font-weight: 200;
    text-align: center;
    margin: 1rem 0 4.5rem;
  `,
  bold: css`
    font-weight: 600;
  `,
};

export default Header;
