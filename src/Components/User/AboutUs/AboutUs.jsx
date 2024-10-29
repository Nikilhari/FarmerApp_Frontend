import styles from './AboutUs.module.css';

const AboutUs = () => {
    return (
        <div className={`${styles.aboutusContainer} ${styles.section}`}>
            <div className={styles.aboutusMain}>
                <p className={`${styles.section__title} ${styles.aboutusHeader}`}>About Us</p>
                <div className={styles.aboutusContent}>
                    Welcome to Field2Farm, where farmers connect directly with buyers for seamless trade.
                    Our platform empowers farmers with predictive price insights using advanced machine learning.
                    With these forecasts, farmers make informed decisions, maximizing profits and reducing risk.
                    We’re dedicated to supporting sustainable agriculture through transparency and fair pricing.
                    Our mission is to create a marketplace where farmers, buyers, and communities thrive together.
                    Join us at Field2Farm as we reshape the future of farming.
                    Together, we’re building a smarter, more connected agricultural world.
                </div>
            </div>
        </div>
    )
}

export default AboutUs