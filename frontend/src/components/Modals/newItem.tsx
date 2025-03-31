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
        <h2>Create New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className={Style.formGroup}>
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className={Style.formGroup}>
            <label>Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className={Style.formGroup}>
            <label>Type:</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>

          <div className={Style.formGroup}>
            <label>Route:</label>
            <input
              type="text"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              required
            />
          </div>

          <div className={Style.formGroup}>
            <label>Notes:</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className={Style.formGroup}>
            <label>Date Lost:</label>
            <input
              type="date"
              value={dateLost}
              onChange={(e) => setDateLost(e.target.value)}
              required
            />
          </div>

          <div className={Style.formGroup}>
            <label>Upload Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className={Style.buttonGroup}>
            <button
              type="submit"
              className={Style.createButton}
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

          {error && <p className={Style.errorMessage}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default NewItemModal;
