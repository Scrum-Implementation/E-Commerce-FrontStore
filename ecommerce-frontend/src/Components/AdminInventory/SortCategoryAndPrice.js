import React from "react";

const SortCategoryAndPrice = ({
  onSortReset,
  onSortAZ,
  onSortZA,
  onSortLowToHigh,
  onSortHighToLow,
}) => {
  const styles = {
    button: {
      height: "26px",
      width: "160px",
      fontSize: "12px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#003366",
      color: "white",
    },
    dropdownMenu: {
      minWidth: "150px",
    },
    dropdownItem: {
      fontSize: "12px",
      textAlign: "center",
    },
    formCheck: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    radioLabel: {
      marginLeft: "5px",
    },
  };

  return (
    <div className="dropdown">
      <button
        className="btn dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={styles.button}
      >
        Category and Price
      </button>
      <ul
        className="dropdown-menu"
        aria-labelledby="dropdownMenuButton"
        style={styles.dropdownMenu}
      >
        <li>
          <button
            className="dropdown-item"
            style={styles.dropdownItem}
            onClick={onSortReset}
          >
            Reset
          </button>
        </li>
        <li>
          <div className="form-check" style={styles.formCheck}>
            <input
              className="form-check-input"
              type="radio"
              name="sortOptions"
              id="sortAZ"
              onClick={onSortAZ}
            />
            <label
              className="form-check-label"
              htmlFor="sortAZ"
              style={{ ...styles.dropdownItem, ...styles.radioLabel }}
            >
              Alphabet Asc. (A - Z)
            </label>
          </div>
        </li>
        <li>
          <div className="form-check" style={styles.formCheck}>
            <input
              className="form-check-input"
              type="radio"
              name="sortOptions"
              id="sortZA"
              onClick={onSortZA}
            />
            <label
              className="form-check-label"
              htmlFor="sortZA"
              style={{ ...styles.dropdownItem, ...styles.radioLabel }}
            >
              Alphabet Dsc. (Z - A)
            </label>
          </div>
        </li>
        <li>
          <div className="form-check" style={styles.formCheck}>
            <input
              className="form-check-input"
              type="radio"
              name="sortOptions"
              id="sortLowToHigh"
              onClick={onSortLowToHigh}
            />
            <label
              className="form-check-label"
              htmlFor="sortLowToHigh"
              style={{ ...styles.dropdownItem, ...styles.radioLabel }}
            >
              Price Low to High
            </label>
          </div>
        </li>
        <li>
          <div className="form-check" style={styles.formCheck}>
            <input
              className="form-check-input"
              type="radio"
              name="sortOptions"
              id="sortHighToLow"
              onClick={onSortHighToLow}
            />
            <label
              className="form-check-label"
              htmlFor="sortHighToLow"
              style={{ ...styles.dropdownItem, ...styles.radioLabel }}
            >
              Price High to Low
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SortCategoryAndPrice;
