import React from 'react';
import s from './MobileMenu.module.css';
import { Link } from 'react-scroll/modules';

export const MobileMenu = ({ onClose }) => {
  return (
    <div className={s.mobile_menu_container}>
      <div className={s.mobile_menu_position}>
        <button className={s.button_close} onClick={onClose}>
          <div className={s.button_el}></div>
          <div className={s.button_el}></div>
        </button>
        <ul className={s.mobile_menu_list}>
          <li className={s.mobile_menu_item}>
            <Link
              onClick={onClose}
              className={s.item_link}
              to="about-me"
              duration={800}
              spy={true}
              smooth={true}
            >
              Home
            </Link>
          </li>
          <li className={s.mobile_menu_item}>
            <Link
              onClick={onClose}
              className={s.item_link}
              to="skills"
              duration={800}
              spy={true}
              smooth={true}
            >
              Skills
            </Link>
          </li>
          <li className={s.mobile_menu_item}>
            <Link
              onClick={onClose}
              className={s.item_link}
              to="works"
              duration={800}
              spy={true}
              smooth={true}
            >
              Works
            </Link>
          </li>
          <li className={s.mobile_menu_item}>
            <Link
              onClick={onClose}
              className={s.item_link}
              to="contacts"
              duration={800}
              spy={true}
              smooth={true}
            >
              Contacts
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
