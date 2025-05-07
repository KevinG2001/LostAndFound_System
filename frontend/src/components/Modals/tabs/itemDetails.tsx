import React, { useState, useEffect, useRef } from "react";
import Styles from "../../../styles/modals/moreDetails.module.scss";
import useEdit from "../../../util/useEdit";

const ItemDetailsTab = ({ data }: { data: any }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [itemID, setItemID] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [route, setRoute] = useState("");
  const [garage, setGarage] = useState("");
  const [dateLost, setDateLost] = useState("");
  const [status, setStatus] = useState("");

  const [garages, setGarages] = useState<any[]>([]);
  const [filteredGarages, setFilteredGarages] = useState<any[]>([]);
  const [routes, setRoutes] = useState<string[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<string[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [typeOptions, setTypeOptions] = useState<string[]>([]);

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showRouteDropdown, setShowRouteDropdown] = useState(false);
  const [showGarageDropdown, setShowGarageDropdown] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const categoryDropdownRef = useRef<HTMLDivElement | null>(null);
  const typeDropdownRef = useRef<HTMLDivElement | null>(null);
  const routeDropdownRef = useRef<HTMLDivElement | null>(null);
  const garageDropdownRef = useRef<HTMLDivElement | null>(null);

  const { loading, error, success, editItem } = useEdit(data?.itemID);

  useEffect(() => {
    if (data) {
      setItemID(data.itemID || "");
      setItemID(data.article || "");
      setDescription(data.description || "");
      setCategory(data.category || "");
      setType(data.type || "");
      setRoute(data.route || "");
      setGarage(data.garage || "");
      setDateLost(data.dateLost || "");
      setStatus(data.status || "");
      setImageUrl(data.imageUrl || null);
    }
  }, [data]);

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

    if (isEditing) {
      fetchGarages();
      fetchMetadata();
    }
  }, [isEditing]);

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

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("itemID", itemID);

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

  const handleSave = async () => {
    const editedData = {
      itemID,
      description,
      category,
      type,
      route,
      garage,
      dateLost,
      status,
    };

    try {
      await editItem(editedData);
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving item:", err);
    }
  };

  return (
    <div className={Styles.detailsContainer}>
      <div className={Styles.detailsRow}>
        <div className={Styles.detailLabel}>Description:</div>
        {isEditing ? (
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={Styles.inputField}
          />
        ) : (
          <div className={Styles.detailValue}>{description}</div>
        )}
      </div>

      <div className={Styles.detailsRow}>
        <div className={Styles.flexItem}>
          <div className={Styles.detailLabel}>Category:</div>
          {isEditing ? (
            <div className={Styles.dropdownContainer} ref={categoryDropdownRef}>
              <input
                type="text"
                className={`${Styles.inputField} ${Styles.selectLike}`}
                value={category}
                onChange={handleCategoryChange}
                onFocus={() => setShowCategoryDropdown(true)}
                placeholder="Select or type category"
              />
              {showCategoryDropdown && (
                <ul className={Styles.suggestionsList}>
                  {categoryOptions
                    .filter((option) =>
                      option.toLowerCase().includes(category.toLowerCase())
                    )
                    .map((option, idx) => (
                      <li
                        key={idx}
                        className={Styles.suggestionItem}
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
          ) : (
            <div className={Styles.detailValue}>{category}</div>
          )}
        </div>
        <div className={Styles.flexItem}>
          <div className={Styles.detailLabel}>Type:</div>
          {isEditing ? (
            <div className={Styles.dropdownContainer} ref={typeDropdownRef}>
              <input
                type="text"
                className={`${Styles.inputField} ${Styles.selectLike}`}
                value={type}
                onChange={handleTypeChange}
                onFocus={() => setShowTypeDropdown(true)}
                placeholder="Select or type type"
              />
              {showTypeDropdown && (
                <ul className={Styles.suggestionsList}>
                  {typeOptions
                    .filter((option) =>
                      option.toLowerCase().includes(type.toLowerCase())
                    )
                    .map((option, idx) => (
                      <li
                        key={idx}
                        className={Styles.suggestionItem}
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
          ) : (
            <div className={Styles.detailValue}>{type}</div>
          )}
        </div>
      </div>

      <div className={Styles.detailsRow}>
        <div className={Styles.flexItem}>
          <div className={Styles.detailLabel}>Route:</div>
          {isEditing ? (
            <div className={Styles.dropdownContainer} ref={routeDropdownRef}>
              <input
                type="text"
                className={Styles.inputField}
                value={route}
                onChange={handleRouteChange}
                onFocus={() => setShowRouteDropdown(true)}
                placeholder="Enter Route"
              />
              {showRouteDropdown && (
                <ul className={Styles.suggestionsList}>
                  <li
                    key="na"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleRouteSelect("N/A");
                    }}
                    className={Styles.suggestionItem}
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
                      className={Styles.suggestionItem}
                    >
                      {routeOption}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className={Styles.detailValue}>{route}</div>
          )}
        </div>
        <div className={Styles.flexItem}>
          <div className={Styles.detailLabel}>Garage:</div>
          {isEditing ? (
            <div className={Styles.dropdownContainer} ref={garageDropdownRef}>
              <input
                type="text"
                className={`${Styles.inputField} ${Styles.selectLike}`}
                value={garage}
                onChange={handleGarageChange}
                onFocus={() => setShowGarageDropdown(true)}
                placeholder="Select or type garage"
              />
              {showGarageDropdown && (
                <ul className={Styles.suggestionsList}>
                  <li
                    key="na"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleGarageSelect("N/A");
                    }}
                    className={Styles.suggestionItem}
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
                      className={Styles.suggestionItem}
                    >
                      {garageOption.garageName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className={Styles.detailValue}>{garage}</div>
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
              value={dateLost}
              onChange={(e) => setDateLost(e.target.value)}
              className={Styles.inputField}
            />
          ) : (
            <div className={Styles.detailValue}>{dateLost}</div>
          )}
        </div>
        <div className={Styles.flexItem}>
          <div className={Styles.detailLabel}>Status:</div>
          {isEditing ? (
            <select
              name="status"
              value={status}
              onChange={handleStatusChange}
              className={Styles.selectField}
            >
              <option value="Unclaimed">Unclaimed</option>
              <option value="Claimed">Claimed</option>
              <option value="Expired">Expired</option>
              <option value="To Collect">To Collect</option>
            </select>
          ) : (
            <div className={Styles.detailValue}>{status}</div>
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

      <div className={Styles.uploadSection}>
        <div className={Styles.detailLabel}>Upload Image:</div>
        <input
          type="file"
          onChange={handleFileChange}
          className={Styles.fileInput}
        />
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default ItemDetailsTab;
