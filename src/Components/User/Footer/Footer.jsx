import styles from "./Footer.module.css";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaLinkedin, FaPinterestP, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <div className={styles.footerMainContainer}>
            <div className={styles.footerSubContainer}>
                <div className={styles.footerLogoContainer}>
                    <p className={styles.footerHeader}>Field2Farm</p>
                    <div className={styles.footerSocialIconContainer}>
                        <i className={styles.footerSocialIcon}><FaFacebook /></i>
                        <i className={styles.footerSocialIcon}><FaInstagram /></i>
                        <i className={styles.footerSocialIcon}><FaXTwitter /></i>
                        <i className={styles.footerSocialIcon}><FaLinkedin /></i>
                        <i className={styles.footerSocialIcon}><FaPinterestP /></i>
                        <i className={styles.footerSocialIcon}><FaYoutube /></i>
                    </div>
                </div>
                <div className={styles.footerDescription}>
                    <div className={styles.footerFeature}>
                        <p className={styles.footerHeading}>Features</p>
                        <div className={styles.feature_contents}>
                            <p className={styles.footer_sub_heading}>Track Order</p>
                            <p className={styles.footer_sub_heading}>Products</p>
                            <p className={styles.footer_sub_heading}>Blog</p>
                            <p className={styles.footer_sub_heading}>Cancellation & Refund</p>
                        </div>
                    </div>
                    <div className={styles.footerFeature}>
                        <p className={styles.footerHeading}>Support</p>
                        <div className={styles.feature_contents}>
                            <p className={styles.footer_sub_heading}>Contact Us</p>
                            <p className={styles.footer_sub_heading}>FAQ</p>
                            <p className={styles.footer_sub_heading}>Nearby Services</p>
                            <p className={styles.footer_sub_heading}>Terms & Conditions</p>
                        </div>
                    </div>
                    <div className={styles.footerFeature}>
                        <p className={styles.footerHeading}>Contact</p>
                        <div className={styles.feature_contents}>
                            <p className={styles.footerContact}>54,3rd Street,Raja Street,<br /> Perundurai, Erode-638455,<br /> Tamil Nadu,India</p>
                            <p className={styles.footerContact}><b>
                                <a href="mailto:info@field2farm.com" className={styles.footerEmail}>info@field2farm.com</a></b>
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.footerNewsletter}>
                    <div className={styles.footer_mail_logo}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 20" fill="none" className={styles.footerSvg} >
                            <path d="M18.8327 5.00016C18.8327 4.0835 18.0827 3.3335 17.166 3.3335H3.83268C2.91602 3.3335 2.16602 4.0835 2.16602 5.00016V15.0002C2.16602 15.9168 2.91602 16.6668 3.83268 16.6668H17.166C18.0827 16.6668 18.8327 15.9168 18.8327 15.0002V5.00016ZM17.166 5.00016L10.4993 9.1585L3.83268 5.00016H17.166ZM17.166 15.0002H3.83268V6.66683L10.4993 10.8335L17.166 6.66683V15.0002Z"
                                fill="black" />
                        </svg>
                        <p className={styles.footerNLDesc}>Stay connected with Field2Farm</p>
                    </div>
                    <form method="post" className={styles.footerForm}>
                        <input type="email" placeholder="Enter your email" className={styles.footerInputEmail} />
                        <button type="submit" value="Submit" className={styles.footerButton} >submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Footer;
