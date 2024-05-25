import React from 'react';
import s from './ButtonMenu.module.css';

export const ButtonMenu = ({ setMenu }) => {
  return (
    <button className={s.g_button_menu} onClick={() => setMenu(true)}>
      <div className={s.g_button_el}></div>
      <div className={s.g_button_el}></div>
      <div className={s.g_button_el}></div>
    </button>
  );
};
