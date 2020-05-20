import React from "react";
import { NavLink } from "react-router-dom";

export default function HeaderLinks() {
  return (
    <div className="layoutDasboardHeaderLinks">
      <ul>
        <li>
          <NavLink to="/">Về trang chủ</NavLink>
        </li>

        <li>
          <NavLink to="/about">Về trang about</NavLink>
        </li>
      </ul>
    </div>
  );
}
