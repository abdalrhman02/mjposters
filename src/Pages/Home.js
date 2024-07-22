
// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { CartProvider } from '../Components/CartContext';

function Home() {
    return(
        <CartProvider>
            <div className="home">
            <Header />

            <div className='intro'>
                <div className='text'>
                    <p className='website-name'>MJPOSTERS</p>
                    <h1>زين غرفتك <br></br> و ابرز اهتماماتك <br></br> مع بوستراتنا المميزة</h1>
                    
                    <div className='btn-socials'>
                        <a href="Store"><button className='btn'>تسوق الان</button></a>
                        <a href="https://www.instagram.com/mjposters/"><img src={require('../Images/Icons/instagram.png')} /></a>
                    </div>
                </div>

                <div className='images'>
                    <img src={require('../Images/Posters/c3.jpg')} />
                    <img src={require('../Images/Posters/p2.jpg')} />
                    <img src={require('../Images/Posters/a1.jpg')} />
                </div>
            </div>

            <div className='top-sales'>
                <div className='center-title'>
                    <h2>البوسترات الاكثر مبيعا</h2>
                    <div className='title-line'></div>
                </div>

                <div className='posters'>
                    <a href="https://mjposters.vercel.app/product/TPa0fe0dlGRcBL8EdFud">
                        <div className='poster'>
                            <img src={require('../Images/Posters/p2.jpg')} />
                            <h3 className='poster-name'>بوستر والتر وايت</h3>
                        </div>
                    </a>

                    <a href="https://mjposters.vercel.app/product/Qs6z7grUDhKf38tHDHLO">
                        <div className='poster'>
                            <img src={require('../Images/Posters/p5.jpg')} />
                            <h3 className='poster-name'>بوستر هجوم العمالقة</h3>
                        </div>                    
                    </a>

                    <a href='https://mjposters.vercel.app/product/SX3hrbNaSLm6hGijDZHr'>
                        <div className='poster'>
                            <img src={require('../Images/Posters/f1.jpg')} />
                            <h3 className='poster-name'>بوستر ليونيل ميسي</h3>
                        </div>
                    </a>
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

                    <button className='btn'><a href="Store">جميع الاقسام</a></button>
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
                            <img src={require('../Images/Posters/f2.jpg')} />
                            <img src={require('../Images/Posters/s1.jpg')} />
                            <img src={require('../Images/Posters/a2.jpg')} />
                        </div>
                    </div>

                    <div className='type'>
                        <div className='images'>
                            <img src={require('../Images/Posters/Custom1.jpg')} />
                            <div className='empty-poster'>
                                <h4>صورتك الخاصة هنا</h4>
                            </div>
                            <img src={require('../Images/Posters/Custom2.jpg')} />
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
                            <h3><b>3.</b> بوستر بتصميم خاص</h3>
                            <p>ان كنت ترغب في شيء مميز اكثر فيمكنك طلب تصميم خاص بك, نعمل على ان نجعل فكرتك واقعا.</p>
                            <p>بامكانك طلب التعديل على التصميم الى ان نصل للنتيجة المرضية لك.</p>

                            <h5 className='price'>السعر: <span>250₪</span></h5>
                                
                            <a href="#"><button className='btn'>تصفح البوسترات</button></a>
                        </div>

                        <div className='images'>
                            <img src={require('../Images/Posters/Design1.jpg')} />
                            <div className='empty-poster'>
                                <h4>تصميمك هنا</h4>
                            </div>
                            <img src={require('../Images/Posters/Design2.jpg')} />
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
                        <a href="https://mjposters.vercel.app/product/W53HhhbIe5HDLGIWfZqY">
                            <div className='poster'>
                                <img src={require('../Images/Posters/a3.jpg')} />
                                <h3 className='poster-name'>لوفي</h3>
                            </div>
                        </a>

                        <a href="https://mjposters.vercel.app/product/ZMa1qgmLcsGCoO57CoHR">
                            <div className='poster'>
                                <img src={require('../Images/Posters/a1.jpg')} />
                                <h3 className='poster-name'>فينلاند ساغا</h3>
                            </div> 
                        </a>

                        <a href="https://mjposters.vercel.app/product/LvxODAC3Dh4Ykb4qTTSJ">
                            <div className='poster'>
                                <img src={require('../Images/Posters/a2.jpg')} />
                                <h3 className='poster-name'>دراغون بول</h3>
                            </div>                            
                        </a>
                    </div>
                </div>

                <div className='sec'>
                    <div className='center-title'>
                        <h2>من قسم السيارات</h2>
                        <div className='title-line'></div>
                    </div>

                    <div className='posters'>
                        <a href="https://mjposters.vercel.app/product/oBbN1Arwocr7efAeFYbT">
                            <div className='poster'>
                                <img src={require('../Images/Posters/c1.jpg')} />
                                <h3 className='poster-name'>سوبرا</h3>
                            </div>
                        </a>
                        
                        <a href="https://mjposters.vercel.app/product/f2BfcXS3chshXdrNmFWe">
                            <div className='poster'>
                                <img src={require('../Images/Posters/c4.jpg')} />
                                <h3 className='poster-name'>فيراري 458</h3>
                            </div>
                        </a>

                        <a href="https://mjposters.vercel.app/product/F3g3oclhNOdaF4hE4J2o">
                            <div className='poster'>
                                <img src={require('../Images/Posters/c2.jpg')} />
                                <h3 className='poster-name'>اودي</h3>
                            </div>                            
                        </a>
                    </div>
                </div>

                <div className='sec'>
                    <div className='center-title'>
                        <h2>من قسم الرياضة</h2>
                        <div className='title-line'></div>
                    </div>

                    <div className='posters'>
                        <a href="https://mjposters.vercel.app/product/HzcbaXLn6HIdgO1jK1y8">
                            <div className='poster'>
                                <img src={require('../Images/Posters/f2.jpg')} />
                                <h3 className='poster-name'>كريستيانو رونالدو</h3>
                            </div>                            
                        </a>

                        <a href="https://mjposters.vercel.app/product/SX3hrbNaSLm6hGijDZHr">
                            <div className='poster'>
                                <img src={require('../Images/Posters/f1.jpg')} />
                                <h3 className='poster-name'>ليونيل ميسي</h3>
                            </div>
                        </a>

                        <a href="#">
                            <div className='poster'>
                                <img src={require('../Images/Posters/f3.jpg')} />
                                <h3 className='poster-name'>ريال مدريد</h3>
                            </div>                            
                        </a>
                    </div>
                </div>

                <div className='sec'>
                    <div className='center-title'>
                        <h2>من قسم الالعاب</h2>
                        <div className='title-line'></div>
                    </div>

                    <div className='posters'>
                        <a href="https://mjposters.vercel.app/product/L73UVuppyPYZii3WZh6o">
                            <div className='poster'>
                                <img src={require('../Images/Posters/g2.jpg')} />
                                <h3 className='poster-name'>ماينكرافت</h3>
                            </div>
                        </a>

                        <a href="https://mjposters.vercel.app/product/9sI6vdUTaFZHdNmRMo37">
                            <div className='poster'>
                                <img src={require('../Images/Posters/g4.jpg')} />
                                <h3 className='poster-name'>اسيسن كريد</h3>
                            </div>                            
                        </a>

                        <a href="https://mjposters.vercel.app/product/X0eluoYNfqF8VlHTV88d">
                            <div className='poster'>
                                <img src={require('../Images/Posters/g1.jpg')} />
                                <h3 className='poster-name'>اسطورة زيلدا</h3>
                            </div>                            
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
        </CartProvider>
    )
}

export default Home;