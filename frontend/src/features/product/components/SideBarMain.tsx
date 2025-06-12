import React from "react";
import { Slider } from "@mui/material";
import type { SideBarMainProps } from "../interfaces/ProductInterfaces";
import styles from "../styles/SideBar.module.css";
import { useProductSelector } from "../hooks/storeHooks";

// Lazy Load 

const SideBarFilters= React.lazy(()=>import('./SideBarFilters'));

const SidebarMain: React.FC<SideBarMainProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  selectedCategories,
  selectedSubCategories,
  selectedBrands,
  selectedColors,
  selectedGender,
  handleBrandChange,
  handleCategoryChange,
  handleSubCategoryChange,
  handleGenderChange,
  handleReset,
  handleColorChange,
  handleChange,
  selectedPrice,
}) => {
  const data = useProductSelector((state) => state.product);
  const sideBarData = data.sideBarData;

  // Price slider values
  const minPrice = sideBarData?.lowestPrice ?? 0;
  const maxPrice = sideBarData?.highestPrice ?? 1000;
  const priceValue =
    selectedPrice.length === 2
      ? selectedPrice
      : [minPrice, maxPrice];

  // Show clear filter if any filter is active
  const hasAnyFilter =
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    selectedSubCategories.length > 0 ||
    selectedColors.length > 0 ||
    !!selectedGender ||
    selectedPrice.length > 0;

  return (
    <div className={`${styles.container} ${isDrawerOpen ? styles.open : ""}`}>
      {sideBarData && (
        <div>
          <button
            className={styles.closeButton}
            onClick={() => setIsDrawerOpen(false)}
            type="button"
            aria-label="Close filters"
          >
            Close
          </button>
          <div className={styles.filterHeader}>
            <p>FILTERS</p>
            {hasAnyFilter && (
              <p
                className={styles.clearFilter}
                onClick={() => handleReset("all", "")}
                role="button"
                tabIndex={0}
              >
                CLEAR ALL
              </p>
            )}
          </div>
          <div className={styles.filteredContainer}>
            {/* Gender */}
            {sideBarData.genders?.length > 0 && (
              <div className={styles.section}>
                <div className={styles.radioGroup}>
                  {sideBarData.genders.map((gender) => (
                    <label key={gender} className={styles.radioRow}>
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={selectedGender === gender}
                        onChange={(e) =>
                          handleGenderChange(gender, e.target.checked)
                        }
                      />
                      <span
                        className={styles.checkboxLabel}
                        style={{ fontWeight: 500 }}
                      >
                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            {sideBarData.categories?.length > 0 && (
              <SideBarFilters
                data={sideBarData.categories}
                type="categories"
                selectedData={selectedCategories}
                handleChange={handleCategoryChange}
              />
            )}

            {/* Sub Categories */}
            {sideBarData.subCategories?.length > 0 && (
              <SideBarFilters
                data={sideBarData.subCategories}
                type="Sub Categories"
                selectedData={selectedSubCategories}
                handleChange={handleSubCategoryChange}
              />
            )}

            {/* Brands */}
            {sideBarData.brands?.length > 0 && (
              <SideBarFilters
                data={sideBarData.brands}
                type="brands"
                selectedData={selectedBrands}
                handleChange={handleBrandChange}
              />
            )}

            {/* Price Range */}
            {minPrice > 0 && maxPrice > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>PRICE</h3>
                <Slider
                  value={priceValue}
                  onChange={handleChange}
                  max={maxPrice}
                  min={minPrice}
                  className={styles.slider}
                />
                <div className={styles.priceRangeRow}>
                  <span>₹{priceValue[0]}</span>
                  <span>₹{priceValue[1]}&nbsp;</span>
                </div>
              </div>
            )}

            {/* Colors */}
            {sideBarData.colors?.length > 0 && (
              <SideBarFilters
                data={sideBarData.colors}
                type="colors"
                selectedData={selectedColors}
                handleChange={handleColorChange}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(SidebarMain);
