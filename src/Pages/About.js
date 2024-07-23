// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function About() {
    return (
        <div className='about'>
            <Header />

            <div className='intro'>
                <img src={require('../Images/aboutBG.png')} className='background' />

                <div className='content'>
                    <h3>من نحن</h3>
                    <h1>تعرف على متجر</h1>
                    <img src={require('../Images/Logo/white-logo.png')} />
                </div>
            </div>

            <div className='container'>
                <div className='question'>
                    <div className='title purple'>
                        <h3>ماذا  يقدم متجرنا لكم؟</h3>
                    </div>
                    <p>متجر  MJPOSTERS يساعدك في تزيين غرفتك من خلال تقديم انواع مختلفة من البوسترات بجودة ممتازة و في مجالات كثيرة مثل: السيارات/الانمي/الطبيعة/ لاعبين .... و الكثير الكثير في اي شيء يخطر على بالك!</p>
                </div>

                <div className='question'>
                    <div className='title yellow'>
                        <h3>كيف اطلب بوستر و ما انواع البوسترات ؟</h3>
                    </div>
                    <p>اولا: نوفر في موقعنا العديد من البوسترات المختلفة و الجاهزة للطلب في أي وقت من خلال الموقع نفسه (تأكد من تعبئة معلوماتك بشكل صحيح).</p>
                    <p>ثانيا: ان كان لديك صورة جاهزة و تريدها كبوستير فيمكنك طلبها بنفس طريقة طلب اي بوستير اخر و لكن كل ما عليك هو اضافة صورتك الخاصة معها.ملاحظة مهمة: تأكد ان تكون الصورة بقياسات و جودة ملائمة لنقدمها لك بافضل شكل ممكن!</p>
                    <p>ثالثا: نقدم ايضا خدمة بوستير تصميم خاص , كيف؟ كل ما عليك هو التواصل معناعلى الانستغرام و طلب تصميمك الخاص ايا كان و سنعمل عليه .</p>
                </div>

                <div className='question'>
                    <div className='title purple'>
                        <h3>طريقة الدفع و التوصيل ؟</h3>
                    </div>
                    <p>يتم التوصيل لجميع المناطق في الداخل و الضفة و القدس و نوفر لكم العديد من طرق الدفع كتحويل بنكية و الدفع عند الاستلام </p>
                </div>

                <div className='question'>
                    <div className='title yellow'>
                        <h3>مقاس البوستير</h3>
                    </div>
                    <img src={require('../Images/PDimen.png')} />
                </div>
            </div>
        
            <Footer />
        </div>  
    )
}

export default About;