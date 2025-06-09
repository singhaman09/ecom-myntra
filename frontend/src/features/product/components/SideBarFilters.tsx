import React, { useState } from 'react'
import type { SideFilterProps } from '../interfaces/ProductInterfaces'
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import styles from "../styles/SideBar.module.css";
const SideBarFilters:React.FC<SideFilterProps>=({data,type,selectedData,handleChange})=> {
  const [isSearch,setIsSearch]=useState(false)
  const[more,setMore]=useState(6)
  const[filteredData,setFilteredData]=useState([...data])
  const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
   let filteredData=[...data]
   filteredData=filteredData.filter(val=>val?.name?.toLowerCase().includes(e.target.value?.toLowerCase()))
   setFilteredData(filteredData)
  }
  return (
    <div className={styles.section}>
    {isSearch?(<div className={styles.searchContainer}>
     <input type="text" placeholder={`Search for ${type}... `} className={styles.input} onChange={handleInputChange}/>
     <button className={styles.closeSearchButton} onClick={()=>{setIsSearch(false), setFilteredData([...data])}}><CloseIcon/></button>
    </div>):(
     <div className={styles.brandHeader}>
     <h3 className={styles.sectionTitle}>{type.toUpperCase()}</h3>
    {filteredData.length>4 && <button className={styles.searchButton} onClick={()=>setIsSearch(true)}> <SearchIcon fontSize='small'/></button>}
     </div>
    )}
    
     <div className={styles.checkboxGroup}>
       {filteredData.slice(0,more).map((val) => (
        <>
        {type=='colors'?(<label key={val.name} className={styles.colorRow}>
           <input
             type="checkbox"
             checked={selectedData.includes(val.name)}
             onChange={e =>
               handleChange(val.name, e.target.checked)
             }
           />
           <span className={styles.colorCircle} style={{ backgroundColor: val.color}} />
           <span className={styles.colorLabel}>
             {val.name} ({val.count})
           </span>
         </label>):(  <label key={val.name} className={styles.checkboxRow}>
           <input
             type="checkbox"
             checked={selectedData.includes(val.name)}
             onChange={e =>
               handleChange(val.name, e.target.checked)
             }
           />
           <span className={styles.checkboxLabel}>
             {val.name} ({val.count})
           </span>
         </label>)}
       
       </>
       ))}
       {filteredData.length>more && <button className={styles.moreBtn} onClick={()=>setMore(data.length)}>+ {filteredData.length-more} more</button>}
     </div>
   </div>
  )
}

export default SideBarFilters