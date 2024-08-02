import { useRef, useState } from "react";

// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';

// Fireabase
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseconfig";

function Login() {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const forgotPass = useRef()
    const errorNoti = useRef();

    const login = async (e) => {
        e.preventDefault()
        try {
            console.log("Login Success!!")
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            window.location.href = "/";
        }
        catch(error) {
            errorNoti.current.style.display = "block"
        }
    }

    const [resetEmail, setResetEmail] = useState(""); 
    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, resetEmail);
        } catch (error) {
            return;
        }
    };
    
    return (
        <div className="login-page">
            <Header />

            <div className='container'>
                
                <div className='form'>
                    <div className='form-title'>
                        <h1>تسجيل الدخول</h1>
                        <p>لديك حساب في موقعنا ؟ سجل دخولك و تسوق من عشرات البوسترات المتوفرة لدينا!</p>
                    </div>

                    <form onSubmit={login}>
                        <div>
                            <label htmlFor='email'>البريد الالكتروني: </label>
                            <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </div>

                        <div>
                            <label htmlFor='password'>كلمة المرور: </label>
                            <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <a href='#' onClick={() => document.getElementById('forgot-password-form').style.display = 'block'}>
                                <p className="forgot-password" ref={forgotPass}>نسيت كلمة المرور الخاصة بك؟</p>
                             </a>
                        </div>

                        <p className="error" ref={errorNoti}>هنالك خطأ في الايميل او كلمة المرور...</p>

                        <input className='btn' type='submit' value='سجل دخولك' />
                    </form>

                    <p className='no-account'>لا تمتلك حساب على MJPosters ؟  <a href="Signup">انشئ حسابك من هنا</a></p>
                </div>

                <div id="forgot-password-form" style={{ display: 'none' }}>
                    <h2>إعادة تعيين كلمة المرور</h2>
                    <form onSubmit={resetPassword}>
                        <div>
                            <label htmlFor='reset-email'>البريد الالكتروني: </label>
                            <input type='email' id='reset-email' value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required />
                        </div>
                        <input className='btn' type='submit' value='إرسال' />
                        <p style={{marginTop:'5px', fontSize:'14px'}}>عليك تفقد ايميلك بعد الارسال</p>
                    </form>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Login;