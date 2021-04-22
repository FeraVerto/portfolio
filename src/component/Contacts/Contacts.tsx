import React from 'react'
import s from "./Contacts.module.css"

export const Contacts = () => {
    return (
        <div className={s.contacts}>
            <h2>Contacts</h2>
            <div className={s.contacts_container}>
                <div>
                    <ul className={s.social_list}>
                        <li className={s.social_item}>Инст</li>
                        <li className={s.social_item}>Телеграм</li>
                        <li className={s.social_item}>Гитхаб</li>
                        <li className={s.social_item}>Линкедин</li>
                    </ul>
                </div>
                
                <form className={s.contacts_form}>
                    <h3>Contact form</h3>
                    <input placeholder={"Your name *"} type="text"/>
                    <input placeholder={"Your email *"} type="text"/>
                    <textarea placeholder={"Your message"} rows={5}></textarea>
                    <button>Отправить</button>
                </form>
            </div>
        </div>
    )
}