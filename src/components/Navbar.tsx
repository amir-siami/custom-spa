/** @jsxImportSource @emotion/react */
import React from "react";
import NavLink from "./NavLink"; // Adjust the path as necessary
import { css } from "@emotion/react";

const Navbar: React.FC = () => {
  return (
    <div css={styles.navbar}>
      <NavLink to="/list-item">List Item</NavLink>
      <NavLink to="/fibonacci">Fibonacci</NavLink>
      <NavLink to="/collatz">Collatz Conjecture</NavLink>
    </div>
  );
};

const styles = {
  navbar: css`
    display: flex;
    justify-content: center;
    gap: 12px;
    padding: 0 8px;
    border-bottom: 1px solid #ababab;
  `,
};

export default Navbar;
