import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import { collection, deleteDoc, onSnapshot, doc } from "firebase/firestore";
import { BiTrash, BiEdit } from "react-icons/bi";
import Modal from "../components/Modal";

const Slider = () => {
  const [sliderData, setSliderData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const colRef = collection(db, "slider");
    onSnapshot(colRef, (doc) => {
      setSliderData(doc.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  const handleDelete = async (id) => {
    const deleteRef = doc(db, "slider", id);
    await deleteDoc(deleteRef);
  };

  const handleEdit = async (id) => {
    setIsOpen(true);
    setId(id);
  };

  return (
    <>
      <Navbar pageTitle="Add slider" pageLink="/SliderForm" />
      {isOpen && <Modal setIsOpen={setIsOpen} id={id} />}
      <div id="house-card" className="card-slider">
        {sliderData.map((slider) => {
          console.table({ ...slider });
          return (
            <div key={slider.id} className="card-content">
              <div
                className="slider-img"
                style={{ width: "100%", height: 250, overflow: "hidden" }}
              >
                <a href={slider.imageUrl} target="_blank" rel="noreferrer">
                  {" "}
                  <img src={slider.imageUrl} alt="slider" />{" "}
                </a>
              </div>
              <div className="card-text">
                <div>
                  <h2>{slider.title}</h2>
                  <h3 className="slider-h3">
                    <a href={`http://${slider.link}`}>{slider.link}</a>
                  </h3>
                </div>
                <div className="card-btn slider-btn">
                  <i className="edit-icon">
                    <BiEdit onClick={() => handleEdit(slider.id)} />
                  </i>

                  <i
                    className="delete-icon"
                    onClick={() => handleDelete(slider.id)}
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

export default Slider;
