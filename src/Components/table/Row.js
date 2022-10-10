import React from "react";
import { useState } from "react";
const Row = (props) => {
  const [batch, setBatch] = useState("All");
  const batchs = [
    props.data.map((d) => {
      return d["batch"];
    }),
  ];



  const supplierchangeHandler = () =>{
    
  }

  const displayRow = props.data.find((x) => {
    return x["batch"] === batch;
  });

  const changeHandler = (event) => {
    setBatch(event.target.value);
  };

  let date;
  try {
    date = displayRow["exp"].toDateString();
  } catch (error) {
    let newDate = new Date(displayRow["exp"].trim());
    date = newDate.toDateString();
  }

  return (
    <tr>
      <td>{displayRow["name"]}</td>
      <td>
        {
          <select
            style={{ color: "black" }}
            value={batch}
            className="custom-select w-75"
            onChange={changeHandler}
          >
            {batchs[0].map((batch) => {
              return <option key={Math.random().toString()}>{batch}</option>;
            })}
          </select>
        }
      </td>
      <td>{displayRow["stock"]}</td>
      <td>{displayRow["deal"]}</td>
      <td>{displayRow["free"]}</td>
      <td>{displayRow["mrp"]}</td>
      <td>{displayRow["rate"]}</td>
      <td>{date}</td>
      <td>{displayRow["supplier"]}</td>
      <td>
        {
          <select
            style={{ color: "black" }}
            value={batch}
            className="custom-select w-75"
            onChange={supplierchangeHandler}
          >
            
             <option key={Math.random().toString()}>1</option>;
             <option key={Math.random().toString()}>2</option>;
             <option key={Math.random().toString()}>3</option>;
          
          </select>
        }
      </td>
    </tr>
  );
};

export default Row;
