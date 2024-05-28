import React from 'react';
import { Work } from './Work/Work';
import s from './Works.module.css';
import packs from './../../image/Packs.png';

import socialN from './../../image/network.jpg';
import menu from './../../image/menu.jpg';
import memes from './../../image/mem.jpg';
import todo from './../../image/todo.png';
import prometeus from './../../image/prometeus.jpg';
import listOfbooks from './../../image/ListOfBooks.jpg';
import inProgress from './../../image/projectInProgress.jpg';
import { Zoom } from 'react-awesome-reveal';

export const Works = () => {
  return (
    <div className={s.works}>
      <h2>My works</h2>
      <Zoom>
        <ul className={s.works_list}>
          <Work
            title={'Menu and Groceries'}
            img={menu}
            link={'https://FeraVerto.github.io/menu-and-groceries'}
            description={'Menu for home use. In progress.'}
          />

          <Work
            title={'Social network'}
            img={socialN}
            link={'http://FeraVerto.github.io/Social-Network'}
            description={'project on class component and typescript'}
          />

          <Work
            title={'Mini test about mems'}
            img={memes}
            link={'https://feraverto.github.io/millionaire'}
            description={
              'classic todolist written with the material ui library'
            }
          />

          <Work
            title={'Todo'}
            img={todo}
            link={'http://FeraVerto.github.io/todo'}
            description={'Just Todo'}
          />

          <Work
            title={'List of books'}
            img={listOfbooks}
            link={'https://feraverto.github.io/books/#/'}
            description={
              'application for saving a list of books in localStorage'
            }
          />

          <Work
            title={'Prometeus-viewer'}
            img={prometeus}
            link={'https://feraverto.github.io/prometeus-viewer/'}
            description={'tool for convenient display of metrics in a table'}
          />

          <Work
            title={'Project in progress...'}
            img={inProgress}
            link={''}
            description={'Project in progress...'}
          />
        </ul>
      </Zoom>
    </div>
  );
};
