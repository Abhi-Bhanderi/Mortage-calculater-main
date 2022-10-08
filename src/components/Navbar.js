import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiPlusCircle } from "react-icons/bi";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot, getDoc } from "firebase/firestore";
import { Switch } from "antd";

const Navbar = (props) => {
  const [toggle, setToggle] = useState(false);
  const ref = doc(db, "link", "on_off");

  const toggler = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  useEffect(() => {
    return async () => {
      if (toggle === true) {
        return await updateDoc(ref, {
          is_enabled: false,
        });
      }

      if (toggle === false) {
        return await updateDoc(ref, {
          is_enabled: true,
        });
      }
    };
  }, [toggler]);

  // const isChecked = () => {
  //   getDoc(ref).then((doc) => {
  //     return doc.data().is_enabled;
  //   });
  // };

  return (
    <header>
      <nav>
        <ul>
          <div className="links">
            <li>
              <Link to="/">Slider</Link>
            </li>
            <li>
              <Link to="/list">List</Link>
            </li>
            <li>
              <Link to="/house">Houses</Link>
            </li>
          </div>
          <div className="nav-btns">
            <Switch className="toggle-switch" onClick={toggler} />

            <Link to={props.pageLink} className="nav-btn-link">
              <BiPlusCircle />
              <span>{props.pageTitle}</span>
            </Link>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
