import styled from "styled-components";
import style from "./Searchbar.module.css";

const SearchBar = styled.input`
  padding: 13px;
  background-color: #000000e0;
  border-radius: 25px;
  border: none;
  width: 100%;
  color: white;
`;

const SearchBarr = ({ setSearchQuery }) => {
  return (
    <div className={style.header}>
      <SearchBar
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBarr;
