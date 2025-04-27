import React, { useState } from "react";
import useNewItem from "../../util/newItem";
import Style from "../../styles/modals/newItem.module.scss";

interface NewItemModalProps {
  onClose: () => void;
  onCreate: (newItem: any) => void;
}

const NewItemModal = ({ onClose, onCreate }: NewItemModalProps) => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [route, setRoute] = useState("");
  const [garage, setGarage] = useState("");
  const [notes, setNotes] = useState("");
  const [dateLost, setDateLost] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { createItem, loading, error } = useNewItem();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newItem = {
      description,
      category,
      type,
      route,
      garage,
      notes,
      dateLost,
      status: "Unclaimed",
    };

    try {
      await createItem(newItem, imageFile);
      onCreate(newItem);
      onClose();
    } catch (err) {
      console.error("Error creating item:", err);
    }
  };

  return (
    <div className={Style.modalOverlay}>
      <div className={Style.modalContent}>
        <h2 className={Style.modalTitle}>Create New Item</h2>
        <form className={Style.modalForm} onSubmit={handleSubmit}>
          <div className={Style.detailRow}>
            <label className={Style.inputLabel}>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className={Style.inputField}
              onChange={handleImageChange}
            />
          </div>

          <div className={Style.detailRow}>
            <label className={Style.inputLabel}>Description</label>
            <textarea
              className={Style.textareaField}
              maxLength={256}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div className={Style.charCounter}>{description.length}/256</div>
          </div>

          <div className={Style.doubleRow}>
            <div className={Style.detailRow}>
              <label className={Style.inputLabel}>Category</label>
              <input
                type="text"
                className={Style.inputField}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div className={Style.detailRow}>
              <label className={Style.inputLabel}>Type</label>
              <input
                type="text"
                className={Style.inputField}
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={Style.doubleRow}>
            <div className={Style.detailRow}>
              <label className={Style.inputLabel}>Route</label>
              <input
                type="text"
                className={Style.inputField}
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                required
              />
            </div>

            <div className={Style.detailRow}>
              <label className={Style.inputLabel}>Garage</label>
              <input
                type="text"
                className={Style.inputField}
                value={garage}
                onChange={(e) => setGarage(e.target.value)}
              />
            </div>
          </div>

          <div className={Style.detailRow}>
            <label className={Style.inputLabel}>Notes</label>
            <textarea
              className={Style.textareaField}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className={Style.detailRow}>
            <label className={Style.inputLabel}>Date Lost</label>
            <input
              type="date"
              className={Style.inputField}
              value={dateLost}
              onChange={(e) => setDateLost(e.target.value)}
              required
            />
          </div>

          {error && <div className={Style.errorMessage}>{error}</div>}

          <div className={Style.buttonGroup}>
            <button
              type="submit"
              className={Style.submitButton}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
            <button
              type="button"
              className={Style.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewItemModal;
