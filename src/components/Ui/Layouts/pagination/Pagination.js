import classes from "./Pagination.module.css";
import React from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={classes.pagination}>
        {pageNumbers.map((num) => {
          return (
            <li
              key={num}
              onClick={() => paginate(num)}
              className={
                num === currentPage
                  ? classes.pageItemSelected
                  : classes.pageItem
              }
            >
              <span className={classes.pageLink}>{num}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
