import React from "react";
import { useState } from "react";
const Row = (props) => {

  
  const [batch, setBatch] = useState("All");
  const batchs = [
    props.data.map((d) => {
      return d["batch"];
    }),
  ];

  const displayRow = props.data.find((x) => {
    return x["batch"] === batch;
  });
  // console.log(displayRow);

  const changeHandler = (event) => {
    setBatch(event.target.value);
  };

  let date;
  try {
    date = displayRow["exp"].toDateString();
    // console.log(displayRow["exp"],date);
  } catch (error) {
    console.log(error.message);
    let newDate = new Date(displayRow["exp"].trim());
    date = newDate.toDateString();
  }

  return (
    <tr>
      <td>{displayRow["name"]}</td>
      <td>
        {
          <select style ={{color:"black"}}value={batch} className="custom-select w-75" onChange={changeHandler}>
            {batchs[0].map((batch) => {
              return <option key = {Math.random().toString()}>{batch}</option>;
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
    </tr>
  );
};

export default Row;
