import React from "react";
import { useState, useEffect } from "react";
const Row2 = (props) => {
  console.log(props.data);
  const [batch, setBatch] = useState("All");
  const suppliers = Object.keys(props.data);
  console.log(suppliers)
  const [supplier, setSupplier] = useState(suppliers[0].toString());

  const supplierchangeHandler = (event) => {
    setSupplier(event.target.value);
  };

  console.log("log data","|"+supplier+"|",props.data["LAKSHMI VENKATESWARA PHARMACEU NARASARAOPETA"]);
  let batchs = [
    props.data[supplier.toString()].map((d) => {
      return d["batch"];
    }),
  ];

  console.log(batchs);


  useEffect(() => {
    batchs = [
      props.data[supplier].map((d) => {
        return d["batch"];
      }),
    ];
  }, [supplier]);

  const displayRow = props.data[supplier].find((x) => {
    return x.batch === batch;
  });

  if (displayRow == null) return;

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
      <td>{props.tab}</td>
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
      <td>
        {
          <select
            style={{ color: "black" }}
            value={supplier}
            className="custom-select w-75"
            onChange={supplierchangeHandler}
          >
            {suppliers.map((batch) => {
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
    </tr>
  );
};

export default Row2;
