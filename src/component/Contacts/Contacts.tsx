import React from 'react'
import s from "./Contacts.module.css"

export const Contacts = () => {
    return (
        <div className={s.contacts}>
            <h3>Контакты</h3>
            <form className={s.contacts_form}>
                <input type="text"/>
                <input type="text"/>
                <textarea rows={5}></textarea>
                <button>Отправить</button>
            </form>
        </div>
    )
}