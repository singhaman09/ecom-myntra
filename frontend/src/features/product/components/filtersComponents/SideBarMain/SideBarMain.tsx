import React, { useCallback, useEffect, useState } from "react";
import { Slider } from "@mui/material";
import type { SideBarMainProps } from "../../../interfaces/ProductInterfaces";
import styles from "./SideBar.module.css";
import { useProductSelector } from "../../../hooks/storeHooks";
import { TAB_KEYS, type TabKey } from "../../../Product.enum";

// Lazy Load 
const SideBarFilters = React.lazy(() => import('../SideBarFilters/SideBarFilters'));

const tabList = [
  { key: TAB_KEYS.CATEGORY, label: "Category" },
  { key: TAB_KEYS.SUBCATEGORY, label: "Subcategory" },
  { key: TAB_KEYS.BRAND, label: "Brand" },
  { key: TAB_KEYS.COLOR, label: "Color" },
  { key: TAB_KEYS.GENDER, label: "Gender" },
  { key: TAB_KEYS.PRICE, label: "Price" }
];

const SidebarMain: React.FC<SideBarMainProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  filters,
  handleBrandChange,
  handleCategoryChange,
  handleSubCategoryChange,
  handleGenderChange,
  handleReset,
  handleColorChange,
  handleChange,
  apply
}) => {
  const sideBarData = useProductSelector(state => state.product.sideBarData);

  // Price slider values
  const [priceValue, setPriceValue] = useState<[number, number]>([0, 1000]);
  const minPrice = sideBarData?.lowestPrice || 0;
  const maxPrice = sideBarData?.highestPrice || 1000;

  useEffect(() => {
    if (filters.price) {
      setPriceValue(filters.price.length ? filters.price as [number, number] : [minPrice, maxPrice]);
    }
  }, [filters.price, minPrice, maxPrice]);

  // Show clear filter if any filter is active
  const hasAnyFilter =
    filters.brand?.length ||
    filters.category?.length ||
    filters.price?.length ||
    filters.subCategory?.length ||
    !!filters.gender ||
    filters.color?.length;

  const handleSliderChange = useCallback((_event: Event, newValue: number | number[]) => {
    setPriceValue(newValue as [number, number]);
  }, []);

  // Tab state uses enum keys
  const [activeTab, setActiveTab] = useState<TabKey>(TAB_KEYS.CATEGORY);

  // Render tab content based on enum keys
  const renderTabContent = () => {
    switch (activeTab) {
      case TAB_KEYS.CATEGORY:
        if (sideBarData && sideBarData.categories.length > 0) return (
          <SideBarFilters
            data={sideBarData.categories}
            type="categories"
            selectedData={filters.category}
            handleChange={handleCategoryChange}
          />
        );
        return <p>No data to show !</p>;

      case TAB_KEYS.SUBCATEGORY:
        if (sideBarData && sideBarData.subCategories.length > 0) return (
          <SideBarFilters
            data={sideBarData.subCategories}
            type="Sub Categories"
            selectedData={filters.subCategory}
            handleChange={handleSubCategoryChange}
          />
        );
        return <p>No data to show !</p>;

      case TAB_KEYS.BRAND:
        if (sideBarData && sideBarData.brands.length > 0) return (
          <SideBarFilters
            data={sideBarData.brands}
            type="brands"
            selectedData={filters.brand}
            handleChange={handleBrandChange}
          />
        );
        return <p>No data to show !</p>;

      case TAB_KEYS.COLOR:
        if (sideBarData && sideBarData.colors.length > 0) return (
          <SideBarFilters
            data={sideBarData.colors}
            type="color"
            selectedData={filters.color}
            handleChange={handleColorChange}
          />
        );
        return <p>No data to show !</p>;

      case TAB_KEYS.GENDER:
        if (sideBarData && sideBarData.genders.length > 0) return (
          <div className={styles.section}>
            <div className={styles.radioGroup}>
              {sideBarData.genders.map((gender) => (
                <label key={gender} className={styles.radioRow}>
                  <h3 className={styles.checkboxLabel}>
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </h3>
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={filters.gender === gender}
                    onChange={() => handleGenderChange(gender, true)}
                  />
                </label>
              ))}
            </div>
          </div>
        );
        return <p>No data to show !</p>;

      case TAB_KEYS.PRICE:
        if (sideBarData && sideBarData.lowestPrice && sideBarData.highestPrice) return (
          <div className={styles.section}>
            <Slider
              value={priceValue}
              onChange={handleSliderChange}
              onChangeCommitted={handleChange}
              max={maxPrice}
              min={minPrice}
              className={styles.slider}
            />
            <div className={styles.priceRangeRow}>
              <span>₹{priceValue[0]}</span>
              <span>₹{priceValue[1]}&nbsp;</span>
            </div>
          </div>
        );
        return <p>No data to show !</p>;

      default:
        return null;
    }
  };

  return (
    <div className={`${styles.container} ${isDrawerOpen ? styles.open : ""}`}>
      <div className={styles.inner}>
        <div className={styles.filterHeader}>
          <p>APPLY FILTERS</p>
          <button
            className={styles.closeButton}
            onClick={() => setIsDrawerOpen(false)}
            type="button"
            aria-label="Close filters"
          >
            Close
          </button>
        </div>
        {/* Vertical Tabs Layout */}
        <div className={styles.verticalTabsBody}>
          <div className={styles.verticalTabs}>
            {tabList.map((tab) => (
              <button
                key={tab.key}
                className={[
                  styles.tabButton,
                  activeTab === tab.key ? styles.active : "",
                ].join(" ")}
                onClick={() => setActiveTab(tab.key)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className={styles.tabContent}>
            {renderTabContent()}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <button className={styles.apply} onClick={apply}>Apply</button>
        {hasAnyFilter && (
          <button onClick={handleReset} style={{ fontFamily: 'Work Sans' }}>
            CLEAR ALL
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(SidebarMain);
