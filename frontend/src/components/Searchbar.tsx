import { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import Style from "../styles/searchbar.module.scss";

function Searchbar({ searchDB }: any) {
  const [searchFields, setSearchFields] = useState({
    itemID: "",
    description: "",
    category: "",
    type: "",
    route: "",
    garage: "",
    startDate: null,
    endDate: null,
    status: "",
  });

  const handleChange = (field: string, value: any) => {
    setSearchFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    const formattedFields = {
      ...searchFields,
      startDate: searchFields.startDate
        ? format(searchFields.startDate, "yyyy-MM-dd")
        : "",
      endDate: searchFields.endDate
        ? format(searchFields.endDate, "yyyy-MM-dd")
        : "",
    };

    searchDB(formattedFields);
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
          <div className={Style.dateWrapper}>
            <DatePicker
              selected={searchFields.startDate}
              onChange={(date) => handleChange("startDate", date)}
              placeholderText="From"
              className={`${Style.dateInput} custom-datepicker`}
              calendarClassName="custom-datepicker-calendar"
              dateFormat="dd-MM-yyyy"
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
          <div className={Style.dateWrapper}>
            <DatePicker
              selected={searchFields.endDate}
              onChange={(date) => handleChange("endDate", date)}
              placeholderText="To"
              className={Style.dateInput}
              dateFormat="dd-MM-yyyy"
            />
          </div>
          <button onClick={handleSearch} className={Style.searchBtn}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
