import React, { useState, useEffect, useRef } from "react";

import { Icon, Input } from "UI";
import "./Dropdown.style.scss";

const Dropdown = (props) => {
  const {
    className,
    editable,
    onChange,
    defaultSelected,
    placeholder,
    options,
    handleSelectedOptionChange,
    disabled,
  } = props;

  const [selectedOption, setSelectedOption] = useState(defaultSelected);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [inputValue, setInputValue] = useState(defaultSelected || "");
  const [isOpen, setIsOpen] = useState(false);

  const dropdownElement = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownElement.current &&
        !dropdownElement.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return function cleanup() {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (typeof inputValue !== "string") return;
    if (editable) {
      const filter = inputValue.toLowerCase();
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(filter)
      );
      setFilteredOptions(filtered);
    }
  }, [inputValue]); //eslint-disable-line

  useEffect(() => {
    if (selectedOption && editable) {
      setInputValue(selectedOption);
    }
  }, [selectedOption]);

  useEffect(() => {
    if (defaultSelected) {
      setSelectedOption(defaultSelected);
    }
  }, [defaultSelected]);

  const dropdownClassname = ["f-dropdown", disabled && "disabled", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={dropdownClassname} ref={dropdownElement}>
      <div
        className="selected"
        onClick={() => {
          setIsOpen(!disabled && (editable || !isOpen));
        }}
      >
        <span className={selectedOption ? "selected" : "placeholder"}>
          {selectedOption || placeholder}
        </span>

        <Icon name={isOpen ? "chevron-up" : "chevron-down"} />
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <div className={`content ${editable ? "editable" : ""} `}>
          {filteredOptions.map((option) => (
            <div
              role="button"
              onClick={() => {
                handleSelectedOptionChange(option);
                setSelectedOption(option);
                setIsOpen(false);
              }}
              key={option}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
