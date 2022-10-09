import React, { useMemo } from "react";
import Row from "./Row";
import { useState, useEffect } from "react";
import Pagination from "./../pagination/Pagination";
import classes from './Table.module.css'
let PageSize = 10;
const ck = (data, text) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i]["name"].includes(text.toUpperCase().trim())) return true;
  }
  return false;
};

const Table = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = Object.keys(props.data)
    .filter((d) => {
      return ck(props.data[d], props.text);
    })
    .map((d) => {
      return <Row key={d} data={props.data[d]} />;
    });
    let currentTableData;
  
    currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return filteredData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage,filteredData]);
  
    useEffect(() => {setCurrentPage(1)},[props.text])

  return (
    <>
      {filteredData.length === 0 && (
        <p className=" mx-auto">Please Enter the Valid Name</p>
      )}
      {filteredData.length > 0 && (
        <>
          <table className="table table-striped table-dark rounded ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Batch</th>
                <th scope="col">Stock</th>
                <th scope="col">Deal</th>
                <th scope="col">Free</th>
                <th scope="col">Mrp</th>
                <th scope="col">Rate</th>
                <th scope="col">Exp</th>
              </tr>
            </thead>
            <tbody>{currentTableData}</tbody>
          </table>
          <Pagination
            className={classes.paginationbar}
            currentPage={currentPage}
            totalCount={filteredData.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </>
  );
};

export default Table;
