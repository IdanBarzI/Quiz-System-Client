import React, { useState, useEffect, useRef } from "react";
import Input from "./Input";
import classes from "./InputSearch.module.css";

const InputSearch = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState(props.list);
  const ogList = props.list;
  const wrapTag = useRef();

  useEffect(() => {
    window.addEventListener("click", closeList);

    return () => {
      //clean up
      window.removeEventListener("click", closeList);
    };
  }, []);

  const closeList = (e) => {
    if (!wrapTag.current) {
      return;
    }
    if (wrapTag.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemSelect = (item) => {
    if (props.onSelect) {
      props.onSelect(item);
      handleToggle();
    }
  };

  const handelOnChange = (filterString = "") => {
    setIsOpen(true);
    var newList = list.filter((i) =>
      i.title.trim().toLowerCase().includes(filterString.trim().toLowerCase())
    );
    if (newList.length < 1) {
      setList(ogList);
    } else {
      setList(newList);
    }
  };

  const renderListItems = (filterString = "") => {
    return list.map((i) => {
      if (
        i.title.trim().toLowerCase().includes(filterString.trim().toLowerCase())
      ) {
        return (
          <li key={i._id} onClick={() => handleItemSelect(i)}>
            {i.title}
          </li>
        );
      }
    });
  };

  const renderTrigger = () => {
    if (props.selected) {
      const item = list.find((i) => i === props.selected);
      if (item) {
        return item;
      }
    }
    return props.pleaseSelect;
  };
  return (
    <div className={classes.warper} ref={wrapTag} onClick={handleToggle}>
      <Input
        name={props.name}
        onChange={(e) => handelOnChange(e.target.value)}
        notRequired={props.notRequired}
      />
      <div className={classes.combox}>
        <div>
          <div className={classes.trigger}>
            <div className={classes.combox}>{renderTrigger()}</div>
          </div>
          {isOpen && <div className={classes.options}>{renderListItems()}</div>}
        </div>
      </div>
    </div>
  );
};

export default InputSearch;
