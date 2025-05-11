import Styles from "../styles/about.module.scss";

function About() {
  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.header}>
          Track<span className={Styles.highlight}>It</span>Down
        </div>
        <div className={Styles.wrapper}>
          <div className={Styles.contentWrapper}>
            <div className={Styles.para}>Have you lost an item?</div>
            <div className={Styles.para}>
              Submit a ticket here and someone will contact you about it!
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
