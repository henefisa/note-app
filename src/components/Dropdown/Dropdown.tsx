import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";

import "./Dropdown.styles.less";

interface DropdownItem {
  title: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface DropdownProps {
  items: DropdownItem[];
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ items, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const handleShowDropdown = (e: React.MouseEvent) => {
    setIsOpen((show) => !show);
  };

  const handleClickOutside = (e: Event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  useEffect(() => {
    if (!dropdownMenuRef.current) return;
    const rect = dropdownMenuRef.current?.getBoundingClientRect();
    const isVisible =
      rect.top > 0 &&
      rect.left > 0 &&
      rect.top + rect.height < document.documentElement.clientHeight &&
      rect.left + rect.width < document.documentElement.clientWidth;

    if (!isVisible) {
      dropdownMenuRef.current.classList.add("dropdown__menu--reverse");
    }
  }, []);

  return (
    <div
      className={clsx("dropdown", isOpen && `dropdown--show`)}
      ref={dropdownRef}
    >
      <Button className="dropdown__toggle" onClick={handleShowDropdown} ghost>
        {children}
      </Button>
      <div
        className="dropdown__menu"
        ref={dropdownMenuRef}
        onClick={() => setIsOpen(false)}
      >
        {items.map((item, idx) => (
          <div className="dropdown__menu-item" key={idx} onClick={item.onClick}>
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Dropdown);
