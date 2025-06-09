import React, { useEffect } from "react";
import styles from "../styles/Pagination.module.css";
import type { PaginationProps } from "../interfaces/ProductInterfaces";
import { useNavigate, useSearchParams } from "react-router";

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
}) => {
  const navigate=useNavigate()
  const [params,setParams]=useSearchParams()
  const currentPage=params.get("page")
  useEffect(()=>{
if(!params.has('page')){
  params.set('page','1')
  setParams(params)
}
  },[setParams,params])
 
  return (
    <nav className={styles.paginationContainer}>
      <button
        className={`${styles.pageButton} ${currentPage === "1" ? styles.disabled : ""}`}
        onClick={() => navigate('?page=1')}
        disabled={currentPage === "1"}
      >
        Go to Page 1
      </button>
      <button
        className={`${styles.pageButton} ${currentPage === "1" ? styles.disabled : ""}`}
        onClick={() => navigate(`?page=${Number(currentPage) - 1}`)}
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
        onClick={() => navigate(`?page=${Number(currentPage) + 1}`)}
        disabled={Number(currentPage) === pageCount}
      >
        Next
      </button>
      <p className={styles.p}>Page {currentPage} of {pageCount}</p>
    </nav>
  );
};

export default Pagination;
