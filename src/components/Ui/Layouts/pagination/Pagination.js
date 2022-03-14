import React from "react";
import classes from "./Pagination.module.css";

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
              className={classes.pageItem}
            >
              <a
                href="#"
                className={
                  num === currentPage
                    ? classes.pageLinkSelected
                    : classes.pageLink
                }
              >
                {num}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
