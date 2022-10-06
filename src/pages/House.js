import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import { onSnapshot, doc, deleteDoc, getDoc } from "firebase/firestore";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
const House = () => {
  const [houseData, setHouseData] = useState([]);

  useEffect(() => {
    const getImage = async () => {
      const docRef = doc(db, "houses", "pic");
      onSnapshot(docRef, (doc) => {
        setHouseData(doc.data().list);
      });
    };

    getImage();
  }, [houseData]);

  const handleDelete = async (id) => {
    const docRef = doc(db, "houses", id);
    await deleteDoc(docRef);
  };

  return (
    <>
      <Navbar pageTitle="Add house" pageLink="/houseForm" />

      <div id="house-card" className="card-house">
        {houseData.map((url, id) => {
          return (
            <div key={id}>
              <div className="card-content-image">
                <a href={url}>
                  <img src={url} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default House;

// import React from "react";

// const House = () => {
//   return <div>House</div>;
// };

// export default House;
