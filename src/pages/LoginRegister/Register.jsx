import { useEffect } from 'react';
import styles from './LoginRegister.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const farmerSubmit = (event) => {
        event.preventDefault();
        const pattern = /^F.{15}$/;
        console.log("called");
        const container = document.getElementById('container');
        const farmerPass = document.getElementById("farmerPass");
        const farmerConfirmPass = document.getElementById("farmerConfirmPass");
        const farmercode = document.getElementById('farmerid');
        event.preventDefault();
        if (farmerPass.value !== farmerConfirmPass.value) {
            const errorMessage = document.createElement('h3');
            errorMessage.innerHTML = "Please recheck your password";
            container.appendChild(errorMessage);
            setTimeout(() => {
                container.removeChild(errorMessage);
            }, 1000);
        }
        else if (!pattern.test(farmercode.value)) {
            const errorMessage = document.createElement('h3');
            errorMessage.innerHTML = "Enter valid farmer code";
            container.appendChild(errorMessage);
            setTimeout(() => {
                container.removeChild(errorMessage);
            }, 1000);
        }
        else {
            const values = {
                farmerName: event.target.farmerName.value,
                farmerPhone: event.target.farmerPhone.value,
                farmerId: event.target.farmerId.value,
                farmerPassword: event.target.farmerPassword.value
            };
            axios.post('http://localhost:8001/register/farmer', values)
                .then(res => { navigate('/') })
                .catch(err => { console.log(err) });
        }

    };

    const userSubmit = (event) => {
        event.preventDefault();
        const container = document.getElementById('container');
        const userPass = document.getElementById("userPass");
        const userConfirmPass = document.getElementById("userConfirmPass");
        console.log("called 1")
        if (userPass.value !== userConfirmPass.value) {
            const errorMessage = document.createElement('h3');
            errorMessage.innerHTML = "Please recheck your password";
            container.appendChild(errorMessage);
            setTimeout(() => {
                container.removeChild(errorMessage);
            }, 1000);
        }
        else {
            const values = {
                userName: event.target.userName.value,
                userPhone: event.target.userPhone.value,
                userEmail: event.target.userEmail.value,
                userPassword: event.target.userPassword.value
            };
            axios.post('http://localhost:8001/register/user', values)
                .then(res => { navigate('/') })
                .catch(err => { console.log(err) });
        }

    };

    useEffect(() => {
        const container = document.getElementById('container');
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');

        const handleSignUp = () => {
            container.classList.add(styles.rightPanelActive);
            console.log("Sign-Up button clicked");
        };

        const handleSignIn = () => {
            container.classList.remove(styles.rightPanelActive);
            console.log("Sign-In button clicked");
        };

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
                <form onSubmit={farmerSubmit}>
                    <h1 className={styles.head}>Farmer Register</h1>
                    <span className={styles.sub}>Use your Farmer ID for registration</span>
                    <input type="text" placeholder="Name" name="farmerName" required />
                    <input type="text" placeholder="Phone Number" name="farmerPhone" required />
                    <input type="text" placeholder="Farmer ID" name="farmerId" required id="farmerid" />
                    <input type="password" placeholder="Password" name="farmerPassword" id="farmerPass" required />
                    <input type="password" placeholder="Confirm Password" name="farmerConfirmPassword" id="farmerConfirmPass" required />
                    <button className={styles.btn} type="submit">Sign Up</button>
                    <Link to='/login' className={styles.account}>Login to your account!</Link>
                </form>
            </div>

            <div className={`${styles.formContainer} ${styles.signInContainer}`}>
                <form onSubmit={userSubmit}>
                    <h1 className={styles.head}>User Register</h1>
                    <span className={styles.sub}>Use your email for registration</span>
                    <input type="text" placeholder="Name" name="userName" required />
                    <input type="text" placeholder="Phone Number" name="userPhone" required />
                    <input type="text" placeholder="Email" name="userEmail" required />
                    <input type="password" placeholder="Password" name="userPassword" id="userPass" required />
                    <input type="password" placeholder="Confirm Password" name="userConfirmPassword" id="userConfirmPass" required />
                    <button className={styles.btn} type="submit">Sign Up</button>
                    <Link to='/login' className={styles.account}>Login to your account!</Link>
                </form>
            </div>

            <div className={styles.overlayContainer}>
                <div className={styles.overlay}>
                    <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                        <h1>Hello!</h1>
                        <p className={styles.pageSub}>To keep connected as a user with us, please register with your user info</p>
                        <button className={`${styles.ghost} ${styles.btn}`} id="signIn">User Sign Up</button>
                    </div>

                    <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
                        <h1>Hello!</h1>
                        <p className={styles.pageSub}>Enter the farmer details and start your journey with us</p>
                        <button className={`${styles.ghost} ${styles.btn}`} id="signUp" type="button">Farmer Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
