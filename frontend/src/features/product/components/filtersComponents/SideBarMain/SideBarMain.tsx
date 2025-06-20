import React, { useCallback, useEffect, useState } from "react";
import { Slider } from "@mui/material";
import type { SideBarMainProps } from "../../../interfaces/ProductInterfaces";
import styles from "./SideBar.module.css";
import { useProductSelector } from "../../../hooks/storeHooks";

// Lazy Load 
const SideBarFilters = React.lazy(() => import('../SideBarFilters/SideBarFilters'));

const tabList = [
  { key: "category", label: "Category" },
  { key: "subcategory", label: "Subcategory" },
  { key: "brand", label: "Brand" },
  { key: "color", label: "Color" },
  { key: "gender", label: "Gender" },
  { key: "price", label: "Price" }
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
  const sideBarData = useProductSelector(state=>state.product.sideBarData)
    

  // Price slider values
  const [priceValue, setPriceValue] = useState([0,1000]);
  const minPrice = sideBarData?.lowestPrice || 0;
  const maxPrice = sideBarData?.highestPrice || 1000;

  useEffect(() => {
    setPriceValue(filters.price.length ? filters.price : [minPrice, maxPrice]);
  }, [filters.price, minPrice, maxPrice]);

  // Show clear filter if any filter is active
  const hasAnyFilter =
    filters.brand?.length > 0 ||
    filters.category?.length > 0 ||
    filters.price?.length > 0 ||
    filters.subCategory?.length > 0 ||
    !!filters.gender ||
    filters.color?.length > 0;

  const handleSliderChange = useCallback((_event: Event, newValue: number | number[]) => {
    setPriceValue(newValue as number[]);
  },[priceValue]);

  // Tab state
  const [activeTab, setActiveTab] = useState<string>("category");

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "category":
       if(sideBarData && sideBarData.categories.length>0) return (
        <SideBarFilters
          data={sideBarData.categories}
          type="categories"
          selectedData={filters.category}
          handleChange={handleCategoryChange}
        />
      ); return <p>No data to show !</p>
      case "subcategory":
       
         if(sideBarData && sideBarData.subCategories.length>0) return ( <SideBarFilters
          data={sideBarData.subCategories}
          type="Sub Categories"
          selectedData={filters.subCategory}
          handleChange={handleSubCategoryChange}
        />)
        return <p>No data to show !</p>
      case "brand":
       if(sideBarData && sideBarData.brands.length>0)  return (
        <SideBarFilters
          data={sideBarData.brands}
          type="brands"
          selectedData={filters.brand}
          handleChange={handleBrandChange}
        />
      );
      return <p>No data to show !</p>
      case "color":
        
        {if(sideBarData && sideBarData.colors.length>0)  return ( <SideBarFilters
          data={sideBarData.colors}
          type="colors"
          selectedData={filters.color}
          handleChange={handleColorChange}
        />)
        return (<p>No data to show !</p>)}
      
      case "gender":
        if(sideBarData && sideBarData.genders.length>0) return (
          <div className={styles.section}>
            <div className={styles.radioGroup}>
              {sideBarData.genders.map((gender) => (
                <label key={gender} className={styles.radioRow}>
                  <h3
                    className={styles.checkboxLabel}
                   
                  >
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </h3>
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={filters.gender === gender}
                    onChange={(e) =>
                      handleGenderChange(gender, e.target.checked)
                    }
                  />
                  
                </label>
              ))}
            </div>
          </div>
        ); return <p>No data to show !</p>
      case "price":
       if(sideBarData && sideBarData.lowestPrice && sideBarData.highestPrice )  return (
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
      ); return <p>No data to show !</p>
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
            {tabList.map((tab,idx) => (
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
        {hasAnyFilter && <button onClick={handleReset} style={{fontFamily: 'Work Sans'}}>CLEAR ALL</button>}
      </div>
    </div>
  );
};

export default React.memo(SidebarMain);
