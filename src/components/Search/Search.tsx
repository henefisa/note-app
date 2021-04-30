import React from "react";
import { SearchOutlined } from "@ant-design/icons";

import "./Search.styles.less";

interface SearchProps {
  placeholder?: string;
  icon?: React.ReactNode;
}

const Search: React.FC<SearchProps> = ({
  icon = <SearchOutlined />,
  placeholder = "Search...",
}) => {
  return (
    <div className="search">
      <input
        className="search__input"
        name="search"
        placeholder={placeholder}
        type="text"
        autoComplete="off"
      />
      <span className="search__icon">{icon}</span>
    </div>
  );
};

export default React.memo(Search);
