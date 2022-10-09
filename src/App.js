import "./App.css";
import Input from "./Input";
import { useState } from "react";
import React from "react";
import Table from "./Components/table/Table";
import Search from "./Components/Search";
import { transformData, processCSV } from "./Components/Utils";

function App() {
  const [csvArray, setCsvArray] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchText, setSearchText] = useState("");

  const submitHandler = (data) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const text = event.target.result;
      const newArray = processCSV(text);
      setCsvArray(transformData(newArray));
    };
    reader.readAsText(data);
    setIsSubmitted(true);
    window.scroll(0, 1000);
  };

  const textChangeHandler = (text) => {
    setSearchText(text);
  };

  const displaycontent = (
    <>
      <div className="m-2">
        <Search onTextChange={textChangeHandler} />
        <Table data={csvArray} text={searchText} />
      </div>
    </>
  );

  return (
    <>
      <Input onSubmit={submitHandler} />
      {isSubmitted && displaycontent}
    </>
  );
}

export default App;
