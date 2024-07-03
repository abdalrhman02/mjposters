
// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Home() {
    return(
        <div className="home">
            <Header />

            <div className='intro'>
                <div className='text'>
                    <p className='website-name'>MJPOSTERS</p>
                    <h1>زين غرفتك <br></br> و ابرز اهتماماتك <br></br> مع بوستراتنا المميزة</h1>
                    
                    <div className='btn-socials'>
                        <a href="Store"><button className='btn'>تسوق الان</button></a>
                        <a href="#"><img src={require('../Images/Icons/whatsapp.png')} /></a>
                        <a href="https://www.instagram.com/mjposters/"><img src={require('../Images/Icons/instagram.png')} /></a>
                    </div>
                </div>

                <div className='images'>
                    <img src={require('../Images/Posters/p1.png')} />
                    <img src={require('../Images/Posters/p2.png')} />
                    <img src={require('../Images/Posters/p3.png')} />
                </div>
            </div>

            <div className='top-sales'>
                <div className='center-title'>
                    <h2>البوسترات الاكثر مبيعا</h2>
                    <div className='title-line'></div>
                </div>

                <div className='posters'>
                    <div className='poster'>
                        <img src={require('../Images/Posters/p2.png')} />
                        <h3 className='poster-name'>بوستر والتر وايت</h3>
                    </div>

                    <div className='poster'>
                        <img src={require('../Images/Posters/p5.png')} />
                        <h3 className='poster-name'>بوستر هجوم العمالقة</h3>
                    </div>

                    <div className='poster'>
                        <img src={require('../Images/Posters/p4.png')} />
                        <h3 className='poster-name'>بوستر ليونيل ميسي</h3>
                    </div>
                </div>
            </div>

            <div className='some-sections'>
                <div className='container'>
                    <div className='title'>
                        <h2>بعض الاقسام المتوفرة في متجرنا</h2>
                        <p>نعمل دائما على اضافة العديد من البوسترات و الاقسام الجديدة في متجرنا ليتناسب مع اهتمامات الجميع</p>
                    </div>

                    <div className='sections'>
                        <a href="#">
                            <div className='section'>
                                <h4>رياضة</h4>
                            </div>
                        </a>

                        <a href="#">
                            <div className='section'>
                                <h4>سيارات</h4>
                            </div>
                        </a>

                        <a href="#">
                            <div className='section'>
                                <h4>انمي</h4>
                            </div>
                        </a>

                        <a href="#">
                            <div className='section'>
                                <h4>العاب</h4>
                            </div>
                        </a>
                    </div>

                    <button className='btn'><a href="#">جميع الاقسام</a></button>
                </div>
            </div>

            <div className='posters-types'>
                <div className='title'>
                    <h2>ثلاثة انواع من البوسترات <b>يقدمها متجرنا</b></h2>
                </div>

                <div className='types'>
                    <div className='type'>
                        <div className='text'>
                            <h3><b>1.</b> بوستر من تصاميمنا</h3>
                            <p>بوستر من تصاميمنا الجاهزة و التي قد عملنا عليها من قبل المعروضة في الموقع في قسم تصاميمنا.</p>
                            <p>ما عليك سوا اختيار التصميم و اترك الباقي علينا!</p>

                            <h5 className='price'>السعر: <span>130₪</span></h5>
                                
                            <a href="#"><button className='btn'>تصفح البوسترات</button></a>
                        </div>

                        <div className='images'>
                            <img src={require('../Images/Posters/p9.png')} />
                            <img src={require('../Images/Posters/p12.png')} />
                            <img src={require('../Images/Posters/p6.png')} />
                        </div>
                    </div>

                    <div className='type'>
                        <div className='images'>
                            <img src={require('../Images/Posters/p8.png')} />
                            <div className='empty-poster'>
                                <h4>صورتك الخاصة هنا</h4>
                            </div>
                            <img src={require('../Images/Posters/p15.png')} />
                        </div>
                        
                        <div className='text'>
                            <h3><b>2.</b> صورة من اختيارك</h3>
                            <p>يمكنك ارسال اي صورة تريدها لنرسلها اليك كبوستر خاص بك.</p>
                            <p>من المهم ان تكون الصورة بجودة جيدة و مقاسات مناسبة لنقدم لك افضل خدمة ممكنة!</p>

                            <h5 className='price'>السعر: <span>200₪</span></h5>
                                
                            <a href="#"><button className='btn'>تصفح البوسترات</button></a>
                        </div>
                    </div>

                    <div className='type'>
                        <div className='text'>
                            <h3><b>3.</b> بوستر من تصاميمنا</h3>
                            <p>ان كنت ترغب في شيء مميز اكثر فيمكنك طلب تصميم خاص, نعمل على ان نجعل فكرتك واقعا.</p>
                            <p>بامكانك طلب التعديل على التصميم الى ان نصل للنتيجة المرضية لك.</p>

                            <h5 className='price'>السعر: <span>250₪</span></h5>
                                
                            <a href="#"><button className='btn'>تصفح البوسترات</button></a>
                        </div>

                        <div className='images'>
                            <img src={require('../Images/Posters/p18.png')} />
                            <div className='empty-poster'>
                                <h4>تصميمك هنا</h4>
                            </div>
                            <img src={require('../Images/Posters/p19.png')} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='some-sections-posters'>
                <div className='sec'>
                    <div className='center-title'>
                        <h2>من قسم الانمي</h2>
                        <div className='title-line'></div>
                    </div>

                    <div className='posters'>
                        <div className='poster'>
                            <img src={require('../Images/Posters/p7.png')} />
                            <h3 className='poster-name'>لوفي</h3>
                        </div>

                        <div className='poster'>
                            <img src={require('../Images/Posters/p3.png')} />
                            <h3 className='poster-name'>فينلاند ساغا</h3>
                        </div>

                        <div className='poster'>
                            <img src={require('../Images/Posters/p9.png')} />
                            <h3 className='poster-name'>دراغون بول</h3>
                        </div>
                    </div>
                </div>

                <div className='sec'>
                    <div className='center-title'>
                        <h2>من قسم السيارات</h2>
                        <div className='title-line'></div>
                    </div>

                    <div className='posters'>
                        <div className='poster'>
                            <img src={require('../Images/Posters/p8.png')} />
                            <h3 className='poster-name'>اودي</h3>
                        </div>

                        <div className='poster'>
                            <img src={require('../Images/Posters/p10.png')} />
                            <h3 className='poster-name'>فيراري 458</h3>
                        </div>

                        <div className='poster'>
                            <img src={require('../Images/Posters/p11.png')} />
                            <h3 className='poster-name'>بورش 911</h3>
                        </div>
                    </div>
                </div>

                <div className='sec'>
                    <div className='center-title'>
                        <h2>من قسم الرياضة</h2>
                        <div className='title-line'></div>
                    </div>

                    <div className='posters'>
                        <div className='poster'>
                            <img src={require('../Images/Posters/p6.png')} />
                            <h3 className='poster-name'>كريستيانو رونالدو</h3>
                        </div>

                        <div className='poster'>
                            <img src={require('../Images/Posters/p4.png')} />
                            <h3 className='poster-name'>ليونيل ميسي</h3>
                        </div>

                        <div className='poster'>
                            <img src={require('../Images/Posters/p6.png')} />
                            <h3 className='poster-name'>كريستيانو رونالدو</h3>
                        </div>
                    </div>
                </div>

                <div className='sec'>
                    <div className='center-title'>
                        <h2>من قسم الالعاب</h2>
                        <div className='title-line'></div>
                    </div>

                    <div className='posters'>
                        <div className='poster'>
                            <img src={require('../Images/Posters/Games/minecraft1.jpg')} />
                            <h3 className='poster-name'>ماينكرافت</h3>
                        </div>

                        <div className='poster'>
                            <img src={require('../Images/Posters/Games/journey1.jpg')} />
                            <h3 className='poster-name'>جورني</h3>
                        </div>

                        <div className='poster'>
                            <img src={require('../Images/Posters/Games/zelda2.jpg')} />
                            <h3 className='poster-name'>اسطورة زيلدا</h3>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Home;