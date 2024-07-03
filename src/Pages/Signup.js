import { useState, useRef } from "react";

// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';

// Firebase imports 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebaseconfig";
import { doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'; // For User Information

function Signup() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");

    const usernameInpRef = useRef();
    const passwordInpRef = useRef();
    const emailInpRef = useRef();

    const [usernameValid, setUsernameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();

        if(username.length < 4) {
            usernameInpRef.current.style.border = '2px solid red';
            return;
        } else {
            usernameInpRef.current.style.border = '1px solid #333333'
            setUsernameValid(true)
        }
        
        if (password.length < 10){
            passwordInpRef.current.style.border = '2px solid red';
            return;
        } else {
            passwordInpRef.current.style.border = '1px solid #333333'
            setPasswordValid(true)
        }

        const emailEx = 'example@gmail.com';
        if(!/\S+@\S+\.\S+/.test(emailEx)) {
            emailInpRef.current.style.border = '2px solid red';
            return;
        } else {
            emailInpRef.current.style.border = '1px solid #333333'
            setEmailValid(true)
        }    
        
        
        if (usernameValid && passwordValid && emailValid) {
            console.log('DONE!')
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
    
                const user = userCredential.user;
                await updateProfile(user, { displayName: username });

                // Store user data in Firestore
                await setDoc(doc(db, "users", user.uid), {
                    username: username,
                    email: email,
                    role: "User",
                });
            }
            catch(error) {
                alert(error.message)
            }
        } else {
            console.log("There is Error!")
        }
    };


    const [user] = useAuthState(auth); // For User Information

    return (
        <div className="signup-page">
            <Header />

            <div className='container'>
                
                <div className='form'>
                    <div className='form-title'>
                        <h1>انشاء حساب</h1>
                        <p>انشئ حساب جديد لتتمكن من طلب طلبياتك بسهولة</p>
                    </div>

                    <form onSubmit={handleSignup}>
                        <div>
                            <label htmlFor='username'>اسم المستخدم: </label>
                            <input type='text' id='username' ref={usernameInpRef} onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor='email'>البريد الالكتروني: </label>
                            <input type='email' id='email' ref={emailInpRef} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div>
                            <label htmlFor='password'>كلمة المرور: </label>
                            <input type='password' id='password' ref={passwordInpRef} onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <input className='btn' type='submit' value='سجل دخولك' />
                    </form>

                    <p className='no-account'>لديك حساب مسبقا ؟  <a href="Login">سجل دخولك من هنا</a></p>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Signup;