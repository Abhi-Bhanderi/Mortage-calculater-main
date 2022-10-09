import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiPlusCircle } from "react-icons/bi";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
// import { Switch } from "antd";

const ToggleSwitch = ({ label }) => {
  const ref = doc(db, "link", "on_off");
  const [checked, setChecked] = useState(false);

  const handleChange = async (event) => {
    if (event.target.checked) {
      await updateDoc(ref, {
        is_enabled: true,
      });
    } else {
      await updateDoc(ref, {
        is_enabled: false,
      });
    }
  };

  onSnapshot(ref, (doc) => {
    setChecked(doc.data().is_enabled);
  });

  return (
    <div className="toggle-container">
      <p style={{ display: "none" }}>{label}</p>
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="checkbox"
          name={label}
          id={label}
          onChange={handleChange}
          checked={checked}
        />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};

const Navbar = (props) => {
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
            {/* <Switch
              className="toggle-switch"
              onClick={toggler}
              onChange={(e) => setState(e.target.value)}
            /> */}

            <ToggleSwitch label="ON_OFF_switch" />

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
