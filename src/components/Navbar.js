import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiPlusCircle } from "react-icons/bi";  
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";

const Navbar = (props) => {
  const [checked, setChecked] = useState(true);

  const handleCheckbox = (e) => {
    if (checked === true) {
      setChecked(false);
      console.log(checked);
    }
    if (checked === false) {
      setChecked(true);
      console.log(checked);
    }
    updateCheck()
  };

  const updateCheck =async ()=>{
    if (checked === true) {
      const ref = doc(db, "link", "on_off");
  
       return await updateDoc(ref, {
          is_enabled: true,
        });
  
    }
  
    if (checked === false) {
      const ref = doc(db, "link", "on_off");
       return await updateDoc(ref, {
          is_enabled: false,
        });
      
    }
  }


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
            <input
              type="checkbox"
              value={checked}
              id="onOff"
              name="onOff"
              onChange={handleCheckbox}
            />
            <Link to={props.pageLink} className="nav-btn-link">
             <BiPlusCircle/>
              <span>{props.pageTitle}</span>
            </Link>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
