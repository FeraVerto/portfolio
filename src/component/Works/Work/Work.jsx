import React from 'react';
import s from './Work.module.css';

export const Work = ({ title, description, link, img, ghLink }) => {
  return (
    <li className={s.work}>
      <div className={s.work_background}>
        <a href={link}>
          <div className={s.work_info_block}>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className={s.work_img}>
              <img src={img} alt={title} />
            </div>
          </div>
        </a>
      </div>
    </li>
  );
};
