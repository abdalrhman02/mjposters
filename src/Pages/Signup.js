import { useState, useRef, useEffect } from "react";

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

    const accountDone = useRef();
    const passError = useRef();
    const emailError = useRef();

    const handleSignup = async (e) => {
        e.preventDefault();

        if(username.length < 4) {
            usernameInpRef.current.style.border = '2px solid red';
            return;
        } else {
            usernameInpRef.current.style.border = '1px solid #333333'
            setUsernameValid(true)
        }
        
        if (password.length < 8){
            passwordInpRef.current.style.border = '2px solid red';
            passError.current.style.display = 'block';
            return;
        } else {
            passwordInpRef.current.style.border = '1px solid #333333';
            passError.current.style.display = 'none';
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
            console.log('Account Createds Successfuly!')
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

                emailError.current.style.display = 'none';
                passError.current.style.display = 'none';
                accountDone.current.style.display = 'block';
                window.location.href = "/";
            }
            catch(error) {
                if (error.code === 'auth/email-already-in-use') {
                    emailError.current.style.display = 'block';
                    emailInpRef.current.style.border = '2px solid rgb(192, 3, 3)';
                } else {
                    alert(error.message)
                }
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
                            <p className="email-error" ref={emailError} style={{display: 'none'}}>يوجد حساب لهذا الايميل!</p>
                        </div>

                        <div>
                            <label htmlFor='password'>كلمة المرور: </label>
                            <input type='password' id='password' ref={passwordInpRef} onChange={(e) => setPassword(e.target.value)} required />
                            <p className="password-error" ref={passError} style={{display: 'none'}}>كلمة المرور يجب ان تحتوي على اكثر من 8 احرف او ارقام</p>
                        </div>

                        <p className="account-done" ref={accountDone} style={{display: 'none'}}>تم انشاء الحساب , انتظر لثواني.</p>
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