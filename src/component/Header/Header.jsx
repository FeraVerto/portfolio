import React from 'react';
import { Menu } from './Menu/Menu';
import s from './Header.module.css';
import './../../App.css';
import { SocialIcon } from '../Contacts/socialIcon/sociallcon';

export const Header = () => {
  return (
    <div className={s.header}>
      <SocialIcon />
      <Menu />
    </div>
  );
};
