import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';

// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Home() {

    const [formData, setFormData] = useState({
        name: '',
        number: '',
        msg: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const errorNoti = useRef();
    const successNoti = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();

        const templateParams = {
            name: formData.name,
            number: formData.number,
            msg: formData.msg,
        };

        emailjs.send(
            'service_yqzbvoi', 'template_5l32m2g', templateParams , 'VbqH9pjNBo8llwQFr'
        ).then((response) => {
            successNoti.current.classList.add('disFlex');
            successNoti.current.classList.remove('disNone');
            setTimeout(() => {
            successNoti.current.classList.remove('disFlex');
            successNoti.current.classList.add('disNone');
            window.location.reload()
            }, 3000)
        }).catch((err) => {
            errorNoti.current.classList.add('disFlex');
            errorNoti.current.classList.remove('disNone');
            setTimeout(() => {
                errorNoti.current.classList.remove('disFlex');
                errorNoti.current.classList.add('disNone');
            }, 3000)
        });
    };

    return (
        <div className="c">
            <Header />

            <div className='contact'>
                <div className='noti'>
                    <div className="success disNone" ref={successNoti}>
                        <img src={require('../Images/Icons/success.png')} alt="Success" />
                        <h3>تم الارسال, سنعاود الاتصال بك باسرع وقت ممكن</h3>
                    </div>

                    <div className="error disNone" ref={errorNoti}>
                        <img src={require('../Images/Icons/error.png')} alt="Error" />
                        <h3>حدث خطأ ما , عليك تعبئة جميع البيانات   </h3>
                    </div>
                </div>
      
                <div className='contact-intro'>
                    <div className='title'>
                        <div>
                            <h1>تواصل معنا</h1>
                            <p>يسعدنا تواصلكم معنا و نحن نقوم بالرد على رسائلكم باسرع وقت ممكن</p>
                        </div>
                    </div>
                </div>

                <div className='form'>
                    <p>MJPOSTERS</p>
                    <h2>ارسل لنا رسالة</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='inp-gr'>
                            <label htmlFor='name'>الاسم:</label>
                            <input type='text' id='name' value={formData.name} onChange={handleChange} />
                        </div>

                        <div className='inp-gr'>
                            <label htmlFor='number'>رقم الهاتف:</label>
                            <input type='text' id='number' value={formData.number} onChange={handleChange} />
                        </div>

                        <div className='inp-gr'>
                            <label htmlFor='msg'>رسالتك هنا</label>
                            <input type='text' id='msg' value={formData.msg} onChange={handleChange} />
                        </div>

                        <input type='submit' value="ارسال" className='btn' />
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Home;