/** @jsxImportSource @emotion/react */
import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { css, SerializedStyles } from "@emotion/react";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  css?: SerializedStyles; // Allow css prop
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, css: customCss }) => {
  return (
    <RouterNavLink
      to={to}
      css={[styles.link, customCss]} // Apply styles
      className={({ isActive }) => (isActive ? "active" : "")}
    >
      {children}
    </RouterNavLink>
  );
};

const styles = {
  link: css`
    padding: 8px 35px;
    text-decoration: none;
    color: #767676;

    &.active {
      border-bottom: 2px solid #3b3b3b; /* Active link styling */
      color: #242424;
    }
  `,
};

export default NavLink;
