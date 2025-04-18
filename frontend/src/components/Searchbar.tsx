import { useState } from "react";
import Style from "../styles/searchbar.module.scss";

function Searchbar({ searchDB }: any) {
  const [searchFields, setSearchFields] = useState({
    itemID: "",
    description: "",
    category: "",
    type: "",
    route: "",
    garage: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  const handleChange = (field: string, value: string) => {
    setSearchFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    searchDB(searchFields);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={Style.searchbarContainer}>
      <div className={Style.searchbarWrapper}>
        <div className={Style.inputCol}>
          <input
            type="text"
            placeholder="Item ID"
            value={searchFields.itemID}
            onChange={(e) => handleChange("itemID", e.target.value)}
            onKeyDown={handleKeyDown}
            className={Style.inputBar}
          />
          <input
            type="text"
            placeholder="Description"
            value={searchFields.description}
            onChange={(e) => handleChange("description", e.target.value)}
            onKeyDown={handleKeyDown}
            className={Style.inputBar}
          />
        </div>

        <div className={Style.inputCol}>
          <input
            type="text"
            placeholder="Category"
            value={searchFields.category}
            onChange={(e) => handleChange("category", e.target.value)}
            onKeyDown={handleKeyDown}
            className={Style.inputBar}
          />
          <input
            type="text"
            placeholder="Type"
            value={searchFields.type}
            onChange={(e) => handleChange("type", e.target.value)}
            onKeyDown={handleKeyDown}
            className={Style.inputBar}
          />
        </div>

        <div className={Style.inputCol}>
          <input
            type="text"
            placeholder="Route"
            value={searchFields.route}
            onChange={(e) => handleChange("route", e.target.value)}
            onKeyDown={handleKeyDown}
            className={Style.inputBar}
          />
          <input
            type="text"
            placeholder="Garage"
            value={searchFields.garage}
            onChange={(e) => handleChange("garage", e.target.value)}
            onKeyDown={handleKeyDown}
            className={Style.inputBar}
          />
        </div>

        <div className={Style.inputCol}>
          <div className={Style.inputBar}>
            <input
              type="date"
              placeholder="Start Date"
              value={searchFields.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              onKeyDown={handleKeyDown}
              className={Style.dateBar}
            />
            <input
              type="date"
              placeholder="End Date"
              value={searchFields.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              onKeyDown={handleKeyDown}
              className={Style.dateBar}
            />
          </div>
          <input
            type="text"
            placeholder="Status"
            value={searchFields.status}
            onChange={(e) => handleChange("status", e.target.value)}
            onKeyDown={handleKeyDown}
            className={Style.inputBar}
          />
        </div>

        <div className={Style.inputCol}>
          <button onClick={handleSearch} className={Style.searchBtn}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
