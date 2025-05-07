import React, { useState, useEffect } from "react";
import Styles from "../../../styles/modals/moreDetails.module.scss";
import useEdit from "../../../util/useEdit";

const ItemDetailsTab = ({ data }: { data: any }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    article: "",
    itemID: "",
    description: "",
    category: "",
    type: "",
    route: "",
    garage: "",
    dateLost: "",
    status: "",
    dateClaimed: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { loading, error, success, editItem } = useEdit(data?.itemID);

  useEffect(() => {
    if (data) {
      setEditedData({
        article: data.article || "",
        itemID: data.itemID || "",
        description: data.description || "",
        category: data.category || "",
        type: data.type || "",
        route: data.route || "",
        garage: data.garage || "",
        dateLost: data.dateLost || "",
        status: data.status || "",
        dateClaimed: data.dateClaimed || "",
      });

      setImageUrl(data.imageUrl || null);
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedData = { ...editedData };

      if (data.status !== "Claimed" && editedData.status === "Claimed") {
        updatedData.dateClaimed = new Date().toISOString();
      }

      await editItem(updatedData);
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving item:", err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("itemID", editedData.itemID);

    setUploading(true);

    try {
      const response = await fetch("http://localhost:4000/file/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image");

      const result = await response.json();
      setImageUrl(result.imageUrl);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={Styles.detailsContainer}>
      <div className={Styles.detailsRow}>
        <div className={Styles.detailLabel}>Article:</div>
        {isEditing ? (
          <input
            type="text"
            name="article"
            value={editedData.article}
            onChange={handleInputChange}
            className={Styles.inputField}
          />
        ) : (
          <div className={Styles.detailValue}>{editedData.article}</div>
        )}
      </div>
      <div className={Styles.detailsRow}>
        <div className={Styles.detailLabel}>Description:</div>
        {isEditing ? (
          <input
            type="text"
            name="description"
            value={editedData.description}
            onChange={handleInputChange}
            className={Styles.inputField}
          />
        ) : (
          <div className={Styles.detailValue}>{editedData.description}</div>
        )}
      </div>

      <div className={Styles.detailsRow}>
        <div className={Styles.flexItem}>
          <div className={Styles.detailLabel}>Category:</div>
          {isEditing ? (
            <input
              type="text"
              name="category"
              value={editedData.category}
              onChange={handleInputChange}
              className={Styles.inputField}
            />
          ) : (
            <div className={Styles.detailValue}>{editedData.category}</div>
          )}
        </div>
        <div className={Styles.flexItem}>
          <div className={Styles.detailLabel}>Type:</div>
          {isEditing ? (
            <input
              type="text"
              name="type"
              value={editedData.type}
              onChange={handleInputChange}
              className={Styles.inputField}
            />
          ) : (
            <div className={Styles.detailValue}>{editedData.type}</div>
          )}
        </div>
      </div>

      <div className={Styles.detailsRow}>
        <div className={Styles.flexItem}>
          <div className={Styles.detailLabel}>Route:</div>
          {isEditing ? (
            <input
              type="text"
              name="route"
              value={editedData.route}
              onChange={handleInputChange}
              className={Styles.inputField}
            />
          ) : (
            <div className={Styles.detailValue}>{editedData.route}</div>
          )}
        </div>
        <div className={Styles.flexItem}>
          <div className={Styles.detailLabel}>Garage:</div>
          {isEditing ? (
            <input
              type="text"
              name="garage"
              value={editedData.garage}
              onChange={handleInputChange}
              className={Styles.inputField}
            />
          ) : (
            <div className={Styles.detailValue}>{editedData.garage}</div>
          )}
        </div>
      </div>

      <div className={Styles.detailsRow}>
        <div className={Styles.flexItem}>
          <div className={Styles.detailLabel}>Date Lost:</div>
          {isEditing ? (
            <input
              type="date"
              name="dateLost"
              value={editedData.dateLost}
              onChange={handleInputChange}
              className={Styles.inputField}
            />
          ) : (
            <div className={Styles.detailValue}>{editedData.dateLost}</div>
          )}
        </div>
        <div className={Styles.flexItem}>
          <div className={Styles.detailLabel}>Status:</div>
          {isEditing ? (
            <select
              name="status"
              value={editedData.status}
              onChange={handleInputChange}
              className={Styles.selectField}
            >
              <option value="Unclaimed">Unclaimed</option>
              <option value="Claimed">Claimed</option>
              <option value="Expired">Expired</option>
              <option value="To Collect">To Collect</option>
            </select>
          ) : (
            <div className={Styles.detailValue}>{editedData.status}</div>
          )}
        </div>
      </div>
      {isEditing && (
        <div className={Styles.uploadSection}>
          <div className={Styles.detailLabel}>Upload Image:</div>
          <input
            type="file"
            onChange={handleFileChange}
            className={Styles.detailLabel}
          />
          <button onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}
      <div className={Styles.editActions}>
        {isEditing ? (
          <>
            <button
              className={Styles.saveBtn}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
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
};

export default ItemDetailsTab;
