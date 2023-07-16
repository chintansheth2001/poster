import React from "react";
import Back from "../assets/back.png";

const Header = ({ title, handleSearch, handleBlur, query }) => {
  return (
    <header className="page_header">
      <img className="page_icon" src={Back} alt={"back"} />
      <h1 className="page_title">{title}</h1>
      <div className="search-container">
        <input
          className="search expandright"
          id="searchright"
          type="search"
          name="q"
          value={query}
          placeholder="Search"
          onChange={(e) => handleSearch(e)}
          onBlur={() => handleBlur()}
        ></input>

        <label className="button_search searchbutton" htmlFor="searchright">
          <span className="mglass">&#9906;</span>
        </label>
      </div>
    </header>
  );
};

export default Header;
