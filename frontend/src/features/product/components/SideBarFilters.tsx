import React from "react";
import styles from "../styles/SideBar.module.css";
import { getColorCodeFromString } from "../utils/colorsMapping";

interface SideBarFiltersProps {
  data: string[];
  type: string;
  selectedData: string[];
  handleChange: (item: string, checked: boolean) => void;
}


const SideBarFilters: React.FC<SideBarFiltersProps> = ({
  data,
  type,
  selectedData,
  handleChange
}) => (
  <div>
    <div>
      {data.map(item => (
        <label key={item} className={styles.checkboxRow}>
          {type === "colors" ? (
            <span className={styles.colorSwatchWrapper}>
              <span
                className={styles.colorSwatch}
                style={{ backgroundColor:`${getColorCodeFromString(item)}` }}
                title={item}
              />
              <span className={styles.colorName}>{item}</span>
            </span>
          ) : (
            <h3>{item}</h3>
          )}
          <input
            type="checkbox"
            checked={selectedData.includes(item)}
            onChange={e => handleChange(item, e.target.checked)}
          />
        </label>
      ))}
    </div>
  </div>
);

export default SideBarFilters;
