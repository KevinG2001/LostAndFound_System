import Styles from "../styles/contact.module.scss";

function Contact() {
  return (
    <>
      <div className={Styles.formContainer}>
        <div className={Styles.formHeader}>
          <div className={Styles.headerTitle}>You lost an item?</div>
          <div className={Styles.headerDescription}>
            Please fill out the form details correctly and accurately, and we
            will try to help you get it back!
          </div>
        </div>
        <div className={Styles.formInputsContainer}>
          <div className={Styles.formInputRow}>
            <div className={Styles.formInput}>
              <div className={Styles.inputLabel}>First Name</div>
              <input className={Styles.inputField} type="text" />
            </div>
            <div className={Styles.formInput}>
              <div className={Styles.inputLabel}>Surname</div>
              <input className={Styles.inputField} type="text" />
            </div>
          </div>
          <div className={Styles.formInput}>
            <div className={Styles.inputLabel}>Email</div>
            <input className={Styles.inputField} type="email" />
          </div>
          <div className={Styles.formInput}>
            <div className={Styles.inputLabel}>Phone Number</div>
            <div className={Styles.phoneInputContainer}>
              <div className={Styles.phoneInput}>
                <input
                  className={Styles.inputField}
                  type="text"
                  placeholder="Country Code"
                />
                <div className={Styles.phoneLabel}>Area Code</div>
              </div>
              <div className={Styles.phoneInput}>
                <input className={Styles.inputField} type="text" />
                <div className={Styles.phoneLabel}>Phone Number</div>
              </div>
            </div>
          </div>
          <div className={Styles.formInput}>
            <div className={Styles.inputLabel}>Description</div>
            <textarea
              className={Styles.descriptionBox}
              placeholder="Describe the item you lost or found..."
            />
          </div>
        </div>
        <div className={Styles.formBtn}>
          <button className={Styles.submitBtn}>Submit</button>
        </div>
      </div>
    </>
  );
}

export default Contact;
