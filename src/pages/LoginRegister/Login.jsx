import { useEffect } from 'react';
import styles from './LoginRegister.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = (event, url, data) => {
        event.preventDefault();
        axios.post(url, data)
            .then(res => {
                if (res.data === "Success") {
                    navigate('/home');
                } else {
                    alert("Enter valid credentials");
                }
            })
            .catch(err => {
                console.error("An error occurred:", err);
            });
    };

    const farmerSubmit = (event) => {
        const data = {
            farmerId: event.target.farmerId.value,
            farmerPassword: event.target.farmerPassword.value
        };
        // handleSubmit(event, 'http://localhost:8001/login/farmer', data);
        event.preventDefault();
        axios.post('http://localhost:8001/login/farmer', data)
            .then(res => {
                if (res.data === "Success") {
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
            userEmail: event.target.userEmail.value,
            userPassword: event.target.userPassword.value
        };
        // handleSubmit(event, 'http://localhost:8001/login/user', data);
        event.preventDefault();
        axios.post('http://localhost:8001/login/user', data)
            .then(res => {
                if (res.data === "Success") {
                    navigate('/home');
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
