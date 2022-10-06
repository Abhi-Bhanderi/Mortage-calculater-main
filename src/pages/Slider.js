import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { FaTrashAlt } from "react-icons/fa";
const Slider = () => {
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "slider");
    const getData = async () => {
      const data = await getDocs(colRef);

      setSliderData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getData();
  }, []);

  const handleDelete = async (id) => {
    const docRef = doc(db, "slider", id);
    await deleteDoc(docRef);
    window.location.reload()
  };

  return (
    <>
      <Navbar pageTitle="Add slider" pageLink="/SliderForm" />
      <div id="house-card" className="card-slider">
        {sliderData.map((slider) => {
          console.log(slider);
          return (
            <div key={slider.id} className="card-content">
              <div className="slider-img">
                <img src={slider.imageUrl} alt="slider" />
              </div>
              <div className="card-text">
                <div>
                  <h2>{slider.title}</h2>
                  <h3 className="slider-h3">
                    <a href={`http://${slider.link}`}>{slider.link}</a>
                  </h3>
                </div>
                <div className="card-btn">
                  <i
                    className="delete-icon"
                    onClick={() => handleDelete(slider.id)}
                  >
                    <FaTrashAlt />
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
