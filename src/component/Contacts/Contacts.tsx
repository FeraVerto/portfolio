import React from 'react'
import s from "./Contacts.module.css"
import {useFormik} from "formik";
import {SocialIcon} from "./socialIcon/sociallcon";

export const Contacts = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: ''
        },
        onSubmit: values => {
            console.log("values", values)
        },
    });

    return (
        <div className={s.contacts}>
            <div className={s.contacts_position}>
                <h2>Contacts</h2>
                <div className={s.contacts_container}>
                    <div className={s.contacts_block}>
                        <h3 className={s.h3}>Get in Touch</h3>
                        <ul className={s.contact_list}>
                            <li className={s.contact_item}>
                            <span>
                                <a href="tel:89920149906">
                                    +7-992-014-99-06
                                </a>
                            </span>
                            </li>
                            <li className={s.contact_item}>
                            <span>
                                <a href="mailto:klevakina.maria.ekb@gmail.com">
                                    klevakina.maria.ekb@gmail.com
                                </a>
                            </span>
                            </li>
                        </ul>

                    </div>

                    <form onSubmit={formik.handleSubmit} className={s.contacts_form}>

                        <div className={s.contacts_form_data}>
                            <input id={"name"}
                                   placeholder={"Your name *"}
                                   type="text"
                                   {...formik.getFieldProps('name')}
                            />
                            <input id={"email"}
                                   placeholder={"Your email *"}
                                   type="text"
                                   {...formik.getFieldProps('email')}/>
                        </div>

                        <textarea id={"message"}
                                  placeholder={"Your message"}
                                  rows={6}
                                  {...formik.getFieldProps('message')}>
                    </textarea>

                        <button type="submit">Отправить</button>
                    </form>
                </div>
            </div>

        </div>
    )
}