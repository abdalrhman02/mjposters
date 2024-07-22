import React, { useState } from 'react';
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const templateParams = {
            name: formData.name,
            number: formData.number,
            msg: formData.msg,
        };

        emailjs.send(
            'service_yqzbvoi', 'template_5l32m2g', templateParams,
        ).then((response) => {
            console.log('تم ارسال الرسالة!');
        }).catch((err) => {
            console.error('حدث خطأ...', err);
        });
    };

    return (
        <div className="c">
            <Header />

            <div className='contact'>
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