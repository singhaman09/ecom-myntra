import React, { memo} from "react";
import styles from "../styles/Pagination.module.css";
import type { PaginationProps } from "../interfaces/ProductInterfaces";
import { useNavigate, useSearchParams } from "react-router";
const Pagination: React.FC<PaginationProps> = ({
  pageCount,
}) => {
  const navigate=useNavigate()
  const [params,setParams]=useSearchParams()
  const currentPage=params.get("page") || '1'
  
 
  return (
    <nav className={styles.paginationContainer}>
      <button
        className={`${styles.pageButton} ${currentPage === "1" ? styles.disabled : ""}`}
        onClick={() => {
          params.delete('page') 
          params.append('page','1')
          setParams(params)
        }}
        disabled={currentPage === "1"}
      >
        Go to Page 1
      </button>
      <button
        className={`${styles.pageButton} ${currentPage === "1" ? styles.disabled : ""}`}
        onClick={() => {
            params.delete('page') 
            params.append('page',String(Number(currentPage)-1))
            setParams(params)
        }}
        disabled={currentPage === "1"}
      >
        Prev
      </button>
      <span
        className={styles.pageButton + " " + styles.active}
        style={{ cursor: "default" }}
      >
        {Number(currentPage)}
      </span>
      <button
        className={`${styles.pageButton} ${Number(currentPage) === pageCount  ? styles.disabled : ""}`}
        onClick={() => {
          params.delete('page') 
          params.append('page',String(Number(currentPage)+1))
          setParams(params)
        }}
        disabled={Number(currentPage) === pageCount}
      >
        Next
      </button>
      <p className={styles.p}>Page {currentPage} of {pageCount}</p>
    </nav>
  );
};

export default memo(Pagination);
