import { useState } from "react";

// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';

// Fireabase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseconfig";

function Login() {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const login = async (e) => {
        e.preventDefault()
        try {
            console.log("Done!!")
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
        }
        catch(error) {
            console.log(error.message)
        }
    }
    
    return (
        <div className="signup-page">
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
                            <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor='password'>كلمة المرور: </label>
                            <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <input className='btn' type='submit' value='سجل دخولك' />
                    </form>

                    <p className='no-account'>لا تمتلك حساب على MJPosters ؟  <a href="Signup">انشئ حسابك من هنا</a></p>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Login;