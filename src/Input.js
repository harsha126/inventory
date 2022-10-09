import React from "react";
import { useState } from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  const [file, setFile] = useState(null);
  const parseHandler = () => {
    if (file === null) {
      alert("please upload a .csv file");
      return;
    }
    props.onSubmit(file);
  };

  const onFileChangeHandler = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <>
      <div className={`${classes.container} container w-50`}>
        <label htmlFor="formFile" className="form-label">
          Please upload a .csv File
        </label>
        <input
          className="form-control"
          type="file"
          id="formFile"
          onChange={onFileChangeHandler}
        />
        <button
          className={`${classes.submit} btn btn-dark px-4 mx-auto`}
          onClick={parseHandler}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Input;
