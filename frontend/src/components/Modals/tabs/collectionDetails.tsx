// src/components/CollectionDetailsTab.tsx
import React, { useState, useEffect } from "react";
import Styles from "../../../styles/modals/moreDetails.module.scss";
import useEdit from "../../../util/useEdit";

function CollectionDetailsTab({ data }: { data: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    firstName: "",
    surname: "",
    email: "",
    phone: "",
  });

  const { loading, editItem } = useEdit(data?.itemID, "item");

  useEffect(() => {
    if (data?.collectionDetails) {
      setEditedData({
        firstName: data.collectionDetails.firstName || "",
        surname: data.collectionDetails.surname || "",
        email: data.collectionDetails.email || "",
        phone: data.collectionDetails.phone || "",
      });
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await editItem({
        collectionDetails: editedData,
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving collection details:", err);
    }
  };

  return (
    <div className={Styles.detailsContainer}>
      <div className={Styles.detailsRow}>
        <div className={Styles.flexItem}>
          <div className={Styles.detailLabel}>Firstname:</div>
          {isEditing ? (
            <input
              type="text"
              name="firstName"
              value={editedData.firstName}
              onChange={handleInputChange}
              className={Styles.inputField}
            />
          ) : (
            <div className={Styles.detailValue}>{editedData.firstName}</div>
          )}
        </div>

        <div className={Styles.flexItem}>
          <div className={Styles.detailLabel}>Surname:</div>
          {isEditing ? (
            <input
              type="text"
              name="surname"
              value={editedData.surname}
              onChange={handleInputChange}
              className={Styles.inputField}
            />
          ) : (
            <div className={Styles.detailValue}>{editedData.surname}</div>
          )}
        </div>
      </div>

      <div className={Styles.detailsRow}>
        <div className={Styles.flexItem}>
          <div className={Styles.detailLabel}>Email:</div>
          {isEditing ? (
            <input
              type="text"
              name="email"
              value={editedData.email}
              onChange={handleInputChange}
              className={Styles.inputField}
            />
          ) : (
            <div className={Styles.detailValue}>{editedData.email}</div>
          )}
        </div>

        <div className={Styles.flexItem}>
          <div className={Styles.detailLabel}>Phone Number:</div>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={editedData.phone}
              onChange={handleInputChange}
              className={Styles.inputField}
            />
          ) : (
            <div className={Styles.detailValue}>{editedData.phone}</div>
          )}
        </div>
      </div>

      <div className={Styles.editActions}>
        {isEditing ? (
          <>
            <button
              className={Styles.saveBtn}
              onClick={handleSave}
              disabled={loading}
            >
              Save
            </button>
            <button
              className={Styles.cancelBtn}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button className={Styles.editBtn} onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default CollectionDetailsTab;
