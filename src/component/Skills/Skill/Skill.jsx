import React from 'react';
import s from './Skill.module.css';

export const Skill = ({ title, description, icon }) => {
  return (
    <li className={s.skill_item}>
      <div className={s.skill_background}>
        <div className={s.skill_background2}>
          <img
            className={s.skill_img}
            src={icon}
            width={100}
            height={100}
            alt="skill"
          />
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </li>
  );
};
