import React, { useState } from 'react';
import s from './Contacts.module.css';
import { SocialIcon } from './socialIcon/sociallcon';
import emailjs from 'emailjs-com';

export const Contacts = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageSuccess, setMessageSuccess] = useState('');
  const [messageSend, setMessageSend] = useState(false);

  function sendEmail(e) {
    e.preventDefault();
    setMessageSend(true);
    emailjs
      .sendForm(
        'my_gmail',
        'template_6n7yx7c',
        e.target,
        'user_8vLqnU8YPNZSCB5TMid6X',
      )
      .then(
        (result) => {
          setName('');
          setEmail('');
          setMessage('');
          setMessageSend(false);
          setMessageSuccess('email sent!');
        },
        (error) => {
          setMessageSuccess(error.text);
        },
      );
  }

  return (
    <div className={s.contacts}>
      <h2>Contacts</h2>
      <div className={s.contacts_container}>
        <div className={s.contacts_width}>
          <h3>Get in Touch</h3>

          <div className={s.contacts_mobile}>
            <SocialIcon />
          </div>

          <ul className={s.contact_list}>
            <li className={s.contact_item}>
              <span>
                <a href="https://t.me/Mariya_Klevakina">Телеграм</a>
              </span>
            </li>
            <li className={s.contact_item}>
              <span>
                <a href="mailto:mariya.klevakina.ekb@gmail.com">
                  mariya.klevakina.ekb@gmail.com
                </a>
              </span>
            </li>
            <li className={s.contact_item}>
              <span>
                <a href="https://disk.yandex.ru/i/170FEkwcUgKlSw">
                  Download CV
                </a>
              </span>
            </li>
          </ul>
        </div>

        <form onSubmit={sendEmail} className={s.contacts_form}>
          <h3>Or send me message</h3>
          <div className={s.contacts_form_data}>
            <input
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder={'Your name *'}
              type="text"
            />
            <input
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder={'Your email *'}
              type="email"
            />
          </div>

          <textarea
            value={message}
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            placeholder={'Your message'}
            rows={6}
          ></textarea>
          {messageSend && (
            <div className={s.contacts_form_loader}>Loading...</div>
          )}
          {messageSuccess}
          <button type="submit" value="Send" disabled={messageSend}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
