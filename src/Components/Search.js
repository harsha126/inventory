import React from "react";

const Search = (props) => {
  const textChangeHandler = (event) => {
    props.onTextChange(event.target.value);
  };

  return (
    <>
      <nav className="navbar navbar-light bg-dark d-flex justify-content-center my-1 rounded">
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={textChangeHandler}
          />
        </form>
      </nav>
    </>
  );
};

export default Search;
