import useContactForm from "../util/useContactForm";
import Styles from "../styles/contact.module.scss";

const Contact = ({
  onTicketCreated,
}: {
  onTicketCreated: (id: string) => void;
}) => {
  const {
    formData,
    isSubmitting,
    error,
    successMessage,
    handleChange,
    handleSubmit,
  } = useContactForm();

  const handleSubmitWithCallback = async () => {
    const responseId = await handleSubmit();
    if (responseId) {
      onTicketCreated(responseId);
    }
  };

  return (
    <div className={Styles.formContainer}>
      <div className={Styles.formHeader}>
        <div className={Styles.headerTitle}>You lost an item?</div>
        <div className={Styles.headerDescription}>
          Please fill out the form details correctly and accurately, and we will
          try to help you get it back!
        </div>
      </div>

      <div className={Styles.formInputsContainer}>
        {/* First Input Row */}
        <div className={Styles.formInputRow}>
          <div className={Styles.column}>
            <div className={Styles.inputLabel}>First Name</div>
            <input
              className={Styles.inputField}
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
          </div>
          <div className={Styles.column}>
            <div className={Styles.inputLabel}>Surname</div>
            <input
              className={Styles.inputField}
              type="text"
              value={formData.surname}
              onChange={(e) => handleChange("surname", e.target.value)}
            />
          </div>
        </div>

        {/* Second Input Row */}
        <div className={Styles.formInputRow}>
          <div className={Styles.column}>
            <div className={Styles.inputLabel}>Area</div>
            <input
              className={Styles.inputField}
              type="text"
              placeholder="Country Code"
              value={formData.countryCode}
              onChange={(e) => handleChange("countryCode", e.target.value)}
            />
          </div>
          <div className={Styles.column}>
            <div className={Styles.inputLabel}>Phone Number</div>
            <input
              className={Styles.inputField}
              type="text"
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
            />
          </div>
        </div>

        {/* Email and Date Lost Input Row */}
        <div className={Styles.formInputRow}>
          <div className={Styles.column}>
            <div className={Styles.inputLabel}>Email</div>
            <input
              className={Styles.inputField}
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div className={Styles.column}>
            <div className={Styles.inputLabel}>Date Lost</div>
            <input
              className={Styles.inputField}
              type="date"
              value={formData.dateLost}
              onChange={(e) => handleChange("dateLost", e.target.value)}
            />
          </div>
        </div>

        {/* Description Input with Title */}
        <div className={Styles.formInputRow}>
          <div className={Styles.column}>
            <div className={Styles.inputLabel}>Description</div>
            <textarea
              className={Styles.descriptionBox}
              placeholder="Describe the item you lost"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className={Styles.formBtn}>
        <button
          className={Styles.submitBtn}
          onClick={handleSubmitWithCallback}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>

      {/* Error or Success Messages */}
      {error && <div className={Styles.error}>{error}</div>}
      {successMessage && <div className={Styles.success}>{successMessage}</div>}
    </div>
  );
};

export default Contact;
