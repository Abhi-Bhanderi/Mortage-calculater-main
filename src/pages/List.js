import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { BiTrash, BiEdit } from "react-icons/bi";
import ReadMore from "../components/ReadMore";

const List = () => {
  const [listData, setlistData] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "list");
    onSnapshot(colRef, (doc) => {
      setlistData(doc.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  const handleDelete = async (id) => {
    const docRef = doc(db, "list", id);
    await deleteDoc(docRef);
  };

  // const handleEdit = async (id) => {
  //   setIsOpen(true);
  //   setId(id);
  // };

  return (
    <>
      <Navbar pageTitle="Add list" pageLink="/listForm" />
      <div id="house-card" className="card-list">
        {listData.map((list) => {
          console.log(list.id);
          return (
            <div key={list.id} className="card-content list">
              <div className="listImg">
                <a href={list.imageUrl}>
                  <img src={list.imageUrl} alt="" />
                </a>
              </div>
              <div className="card-list-content">
                <div className="card-list-text">
                  <h1>{list.title}</h1>
                  <h3 style={{ display: "inline" }}>
                    <a href={`http://${list.link}`}>{list.link}</a>
                  </h3>{" "}
                  <br />
                  <ReadMore>{list.description}</ReadMore>
                </div>
                <div className="card-btn">
                  <i className="edit-icon">
                    {/* <BiEdit sonClick={() => handleEdit(list.id)} /> */}
                  </i>

                  <i
                    className="delete-icon"
                    onClick={() => handleDelete(list.id)}
                  >
                    <BiTrash />
                  </i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default List;
