import React from "react";
import "./spinner.styles.css";

export const Spinner = ({ msg }) => (
  <div className="spinner-container">
    <h4>{msg}</h4>
    <div className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
