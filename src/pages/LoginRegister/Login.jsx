import { useEffect } from 'react';
import styles from './LoginRegister.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    const farmerSubmit = (event) => {
        const data = {
            farmerCode: event.target.farmerId.value,
            password: event.target.farmerPassword.value
        };
        event.preventDefault();
        axios.post('http://localhost:6996/farmer/login', data)
            .then(res => {
                if (res.data === "Success") {
                    localStorage.setItem('farmerCode',data.farmerCode)
                    navigate('/farmer');
                } else {
                    alert("Enter valid credentials");
                }
            })
            .catch(err => {
                console.error("An error occurred:", err);
            });
    };

    const userSubmit = (event) => {
        const data = {
            email: event.target.userEmail.value,
            password: event.target.userPassword.value
        };
        event.preventDefault();
        axios.post('http://localhost:6996/User/login', data)
            .then(res => {
                if (res.data === "Success") {
                    localStorage.setItem('userEmail',data.email);
                    navigate('/');
                } else {
                    alert("Enter valid credentials");
                }
            })
            .catch(err => {
                console.error("An error occurred:", err);
            });
    };


    useEffect(() => {
        const container = document.getElementById('container');
        const handleSignUp = () => {
            container.classList.add(styles.rightPanelActive);
            console.log("Sign-Up button clicked");
        };
        const handleSignIn = () => {
            container.classList.remove(styles.rightPanelActive);
            console.log("Sign-In button clicked");
        };
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        signUpButton.addEventListener('click', handleSignUp);
        signInButton.addEventListener('click', handleSignIn);
        return () => {
            signUpButton.removeEventListener('click', handleSignUp);
            signInButton.removeEventListener('click', handleSignIn);
        };
    }, []);

    return (
        <div className={`${styles.container}`} id="container">
            <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
                <form action="" onSubmit={farmerSubmit}>
                    <h1 className={styles.head}>Farmer Login</h1>
                    <span className={styles.sub}>Use your Farmer ID for login</span>
                    <input type="text" placeholder="Farmer ID" name='farmerId' />
                    <input type="password" placeholder="Password" name='farmerPassword' />
                    <button className={styles.btn} type="submit">Sign In</button>
                    <Link to='/register' className={styles.account}>Don't have an account?</Link>
                </form>
            </div>
            <div className={`${styles.formContainer} ${styles.signInContainer}`}>
                <form action="" onSubmit={userSubmit}>
                    <h1 className={styles.head}>User Login</h1>
                    <span className={styles.sub}>Use your email for login</span>
                    <input type="email" placeholder="Email" name='userEmail' />
                    <input type="password" placeholder="Password" name='userPassword' />
                    <button className={styles.btn} type="submit">Sign In</button>
                    <Link to='/register' className={styles.account}>Don't have an account?</Link>
                </form>
            </div>
            <div className={styles.overlayContainer}>
                <div className={styles.overlay}>
                    <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                        <h1>Hello!</h1>
                        <p className={styles.pageSub}>To keep connected as a user, please login with your user info</p>
                        <button className={`${styles.ghost} ${styles.btn}`} id="signIn">User Sign In</button>
                    </div>
                    <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
                        <h1>Hello!</h1>
                        <p className={styles.pageSub}>Enter the farmer details and start your journey with us</p>
                        <button className={`${styles.ghost} ${styles.btn}`} id="signUp">Farmer Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
