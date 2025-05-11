import React from "react";
import useNewItem from "../../util/useNewItem";
import Style from "../../styles/modals/newItem.module.scss";

interface NewItemModalProps {
  onClose: () => void;
  onCreate: (newItem: any) => void;
}

const NewItemModal = ({ onClose, onCreate }: NewItemModalProps) => {
  const {
    article,
    description,
    category,
    type,
    route,
    garage,
    notes,
    dateLost,

    filteredGarages,
    filteredRoutes,
    filteredCategories,
    filteredTypes,

    showRouteDropdown,
    showCategoryDropdown,
    showTypeDropdown,
    showGarageDropdown,

    categoryDropdownRef,
    typeDropdownRef,
    routeDropdownRef,
    garageDropdownRef,

    handleRouteChange,
    handleRouteSelect,
    handleCategoryChange,
    handleCategorySelect,
    handleTypeChange,
    handleTypeSelect,
    handleGarageChange,
    handleGarageSelect,
    handleImageChange,
    setArticle,
    setDescription,
    setNotes,
    setDateLost,

    createItem,
    loading,
    error,
  } = useNewItem();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createItem();
    if (result) {
      onCreate(result);
      onClose();
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
            <label className={Style.inputLabel}>Article</label>
            <input
              type="text"
              className={Style.inputField}
              maxLength={100}
              value={article}
              onChange={(e) => setArticle(e.target.value)}
              placeholder="e.g. Black Bag"
              required
            />
          </div>

          <div className={Style.detailRow}>
            <label className={Style.inputLabel}>Description</label>
            <textarea
              className={Style.textareaField}
              maxLength={256}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Dell laptop inside, White T-Shirt"
              required
            />
            <div className={Style.charCounter}>{description.length}/256</div>
          </div>

          <div className={Style.doubleRow}>
            <div className={Style.detailRow} ref={categoryDropdownRef}>
              <label className={Style.inputLabel}>Category</label>
              <input
                type="text"
                className={`${Style.inputField} ${Style.selectLike}`}
                value={category}
                onChange={handleCategoryChange}
                onFocus={() => showCategoryDropdown}
                placeholder="e.g. Bag"
                required
              />
              {showCategoryDropdown && (
                <ul className={Style.suggestionsList}>
                  {filteredCategories.map((option, idx) => (
                    <li
                      key={idx}
                      className={Style.suggestionItem}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleCategorySelect(option);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={Style.detailRow} ref={typeDropdownRef}>
              <label className={Style.inputLabel}>Type</label>
              <input
                type="text"
                className={`${Style.inputField} ${Style.selectLike}`}
                value={type}
                onChange={handleTypeChange}
                onFocus={() => showTypeDropdown}
                placeholder="e.g. Backpack"
                required
              />
              {showTypeDropdown && (
                <ul className={Style.suggestionsList}>
                  {filteredTypes.map((option, idx) => (
                    <li
                      key={idx}
                      className={Style.suggestionItem}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleTypeSelect(option);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className={Style.doubleRow}>
            <div className={Style.detailRow} ref={routeDropdownRef}>
              <label className={Style.inputLabel}>Route</label>
              <input
                type="text"
                className={Style.inputField}
                value={route}
                onChange={handleRouteChange}
                onFocus={() => showRouteDropdown}
                placeholder="e.g. 9"
                required
              />
              {showRouteDropdown && (
                <ul className={Style.suggestionsList}>
                  <li
                    key="na"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleRouteSelect("N/A");
                    }}
                    className={Style.suggestionItem}
                  >
                    N/A
                  </li>
                  {filteredRoutes.map((routeOption, index) => (
                    <li
                      key={index}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleRouteSelect(routeOption);
                      }}
                      className={Style.suggestionItem}
                    >
                      {routeOption}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={Style.detailRow} ref={garageDropdownRef}>
              <label className={Style.inputLabel}>Garage</label>
              <input
                type="text"
                className={`${Style.inputField} ${Style.selectLike}`}
                value={garage}
                onChange={handleGarageChange}
                onFocus={() => showGarageDropdown}
                placeholder="e.g. Phibsboro"
                required
              />
              {showGarageDropdown && (
                <ul className={Style.suggestionsList}>
                  <li
                    key="na"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleGarageSelect("N/A");
                    }}
                    className={Style.suggestionItem}
                  >
                    N/A
                  </li>
                  {filteredGarages.map((garageOption, index) => (
                    <li
                      key={index}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleGarageSelect(garageOption.garageName);
                      }}
                      className={Style.suggestionItem}
                    >
                      {garageOption.garageName}
                    </li>
                  ))}
                </ul>
              )}
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
