import Styles from "../styles/about.module.scss";

function About() {
  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.header}>Lost Property (NOT REAL DUBLIN BUS)</div>
        <div className={Styles.wrapper}>
          <div className={Styles.contentWrapper}>
            <div className={Styles.para}>
              <div className={Styles.subHeader}>Opening Hours:</div>
              <div>
                Monday to Friday (excluding Public Holidays) 08.45hrs to
                17.00hrs. <br />
                Saturday and Sundays - Closed
              </div>
            </div>
            <div className={Styles.para}>
              <div className={Styles.subHeader}>Adress heading:</div>
              <div>
                Lost Property Office, <br />
                Dublin Bus, <br />
                Earl Place, <br />
                Dublin 1 D01P7K8
              </div>
            </div>
            <div className={Styles.para}>
              The office is open 9am - 5pm. We do not receive items until the
              following day, so if you lost something today, contact us
              tomorrow.
              <br />
              <br />
              Thousands of items are left on our buses each year, so you are not
              alone. If you have lost property on one of our buses, please send
              us a ticket below or call 01 703 1321. When submitting your
              ticket, include your name, contact number, and email address, a
              detailed description of the item, the date it was lost, the bus
              number, the direction of travel, the bus stop you got on, the stop
              you got off at, and the time you boarded and alighted.
              <br />
              <br />
              Any items found on our buses will be delivered to the Lost
              Property department within two working days, between 14:30 and
              17:00.
              <br />
              <br />
              A €2.00 fee applies to each item you claim, and ID may be
              required, especially for high-value items like wallets, purses,
              mobile phones, or laptops.
              <br />
              <br />
              As per our contract with the NTA, all customer data is retained
              for a minimum of 2 years.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
