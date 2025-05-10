import React, { useState, useEffect, useRef } from "react";
import useNewItem from "../../util/newItem";
import Style from "../../styles/modals/newItem.module.scss";

interface NewItemModalProps {
  onClose: () => void;
  onCreate: (newItem: any) => void;
}

const NewItemModal = ({ onClose, onCreate }: NewItemModalProps) => {
  const [article, setArticle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [route, setRoute] = useState("");
  const [garage, setGarage] = useState("");
  const [garages, setGarages] = useState<any[]>([]);
  const [filteredGarages, setFilteredGarages] = useState<any[]>([]);
  const [routes, setRoutes] = useState<string[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<string[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [typeOptions, setTypeOptions] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [dateLost, setDateLost] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [showRouteDropdown, setShowRouteDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showGarageDropdown, setShowGarageDropdown] = useState(false);

  const { loading, error } = useNewItem();

  const categoryDropdownRef = useRef<HTMLDivElement | null>(null);
  const typeDropdownRef = useRef<HTMLDivElement | null>(null);
  const routeDropdownRef = useRef<HTMLDivElement | null>(null);
  const garageDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/garages/list`);
        const responseText = await res.text();
        if (res.ok) {
          const data = JSON.parse(responseText);
          setGarages(data);
          setFilteredGarages(data);
          const allRoutes = data.flatMap((garage: any) => garage.routes);
          setRoutes(allRoutes);
          setFilteredRoutes(allRoutes);
        } else {
          console.error(`Error: ${res.status} ${res.statusText}`);
        }
      } catch (err) {
        console.error("Error fetching garages:", err);
      }
    };

    const fetchMetadata = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/items/metadata`
        );
        if (!res.ok) throw new Error("Failed to fetch metadata");
        const data = await res.json();
        setCategoryOptions(data.categories);
        setTypeOptions(data.types);
      } catch (err) {
        console.error("Failed to fetch categories/types:", err);
      }
    };

    fetchGarages();
    fetchMetadata();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCategoryDropdown(false);
      }
      if (
        typeDropdownRef.current &&
        !typeDropdownRef.current.contains(event.target as Node)
      ) {
        setShowTypeDropdown(false);
      }
      if (
        routeDropdownRef.current &&
        !routeDropdownRef.current.contains(event.target as Node)
      ) {
        setShowRouteDropdown(false);
      }
      if (
        garageDropdownRef.current &&
        !garageDropdownRef.current.contains(event.target as Node)
      ) {
        setShowGarageDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownFilter = (value: string, options: string[]) => {
    return options.filter((opt) =>
      opt.toLowerCase().startsWith(value.toLowerCase())
    );
  };

  const handleGarageFilter = (value: string, garageList: any[]) => {
    return garageList.filter((garage) =>
      garage.garageName.toLowerCase().includes(value.toLowerCase())
    );
  };

  const handleRouteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRoute(value);
    const filtered = handleDropdownFilter(value, routes);
    setFilteredRoutes(filtered);
    setShowRouteDropdown(true);
  };

  const handleRouteSelect = (value: string) => {
    setRoute(value);
    setShowRouteDropdown(false);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategory(value);
    setShowCategoryDropdown(true);
  };

  const handleCategorySelect = (value: string) => {
    setCategory(value);
    setShowCategoryDropdown(false);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setType(value);
    setShowTypeDropdown(true);
  };

  const handleTypeSelect = (value: string) => {
    setType(value);
    setShowTypeDropdown(false);
  };

  const handleGarageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGarage(value);
    const filtered = handleGarageFilter(value, garages);
    setFilteredGarages(filtered);
    setShowGarageDropdown(true);
  };

  const handleGarageSelect = (value: string) => {
    setGarage(value);
    setShowGarageDropdown(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("article", article);
    formData.append("description", description);
    formData.append("dateLost", dateLost);
    if (category) formData.append("category", category);
    if (type) formData.append("type", type);
    if (route) formData.append("route", route);
    if (garage) formData.append("garage", garage);
    if (notes) formData.append("notes", notes);
    if (status) formData.append("status", status);
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/items/create`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }

      const result = await res.json();
      console.log("Item created:", result);
      onCreate(result);
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
                onFocus={() => setShowCategoryDropdown(true)}
                placeholder="e.g. Bag"
                required
              />
              {showCategoryDropdown && (
                <ul className={Style.suggestionsList}>
                  {categoryOptions
                    .filter((option) =>
                      option.toLowerCase().includes(category.toLowerCase())
                    )
                    .map((option, idx) => (
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
                onFocus={() => setShowTypeDropdown(true)}
                placeholder="e.g. Backpack"
                required
              />
              {showTypeDropdown && (
                <ul className={Style.suggestionsList}>
                  {typeOptions
                    .filter((option) =>
                      option.toLowerCase().includes(type.toLowerCase())
                    )
                    .map((option, idx) => (
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
                onFocus={() => setShowRouteDropdown(true)}
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
                onFocus={() => setShowGarageDropdown(true)}
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
