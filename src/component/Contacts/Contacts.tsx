import React from 'react'
import s from "./Contacts.module.css"
import {useFormik} from "formik";
import github from "../../image/github.svg"
import linkedin from "../../image/linkedin.svg"
import telegram from "../../image/telegram.svg"

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
            <h2>Contacts</h2>
            <div className={s.contacts_container}>
                <div className={s.contacts_block}>
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
                    <ul className={s.social_list}>
                        <li className={s.social_item}>
                            <img src={github} alt="github" width={50} height={50}/>
                        </li>
                        <li className={s.social_item}>
                            <img src={telegram} alt="telegram" width={50} height={50}/>
                        </li>
                        <li className={s.social_item}>
                            <img src={linkedin} alt="linkedin" width={50} height={50}/>
                        </li>
                    </ul>
                </div>

                <form onSubmit={formik.handleSubmit} className={s.contacts_form}>
                    <h3>Contact form</h3>

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
                              rows={5}
                              {...formik.getFieldProps('message')}>
                    </textarea>

                    <button type="submit">Отправить</button>
                </form>
            </div>
        </div>
    )
}