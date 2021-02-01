import React from "react";
import styles from "./MenuToggle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const MenuToggle = (props) => {
  let isOpenStyle;
  if (props.isOpen) {
    isOpenStyle = "open";
  }
  return (
    <FontAwesomeIcon
      icon={props.isOpen ? faTimes : faBars}
      className={`${styles.MenuToggle} ${styles[isOpenStyle]}`}
      onClick={props.onToggle}
    />
  );
};

export default MenuToggle;
