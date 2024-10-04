import { useState } from "react";
import Style from "../styles/searchbar.module.scss";

function Searchbar({ searchTerm, setSearchTerm, searchDB, loading }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Category");

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchDB(selectedOption);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const handleSearch = () => {
    searchDB(selectedOption);
    console.log("Selected param:", selectedOption);
    console.log("Search term:", searchTerm);
  };

  return (
    <div className={Style.searchbarContainer}>
      <div className={Style.searchbarWrapper}>
        <button className={Style.searchParamBtn} onClick={toggleDropdown}>
          {selectedOption}
        </button>

        {/* Is the dropdown menu open */}
        {isDropdownOpen && (
          <div className={Style.dropdownMenu}>
            {/* //! Options in the drop down menu (Could be changed to be dynamic?) */}
            <div onClick={() => handleOptionSelect("Category")}>Category</div>
            <div onClick={() => handleOptionSelect("Type")}>Type</div>
            <div onClick={() => handleOptionSelect("Route")}>Route</div>
          </div>
        )}

        <input
          type="text"
          placeholder={`Search for ${selectedOption}!`}
          className={Style.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
