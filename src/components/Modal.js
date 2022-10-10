import React, { useState } from "react";
import "../index.css";
import { db, storage } from "../firebase";
import { RiCloseLine } from "react-icons/ri";
import { updateDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";

const Modal = ({ setIsOpen, id }) => {
  const [data, setData] = useState({});
  const [uploadedImage, setUploadedImage] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [uploadingBoolean, setUploadingBoolean] = useState(false);
  console.log(id);
  let showSuccessMsg = () => {
    toast.success("Updated Successfully!");
  };
  let showErrorMsg = () => {
    toast.error("Some Error ocurred!");
  };

  let uploadingText;
  if (uploadingBoolean === true) {
    uploadingText = "Uploding...";
  } else {
    uploadingText = "";
  }

  const uploadImage = () => {
    if (image == null) setUploadingBoolean(true);

    const imageRef = ref(storage, `Slider/${image.name}`);

    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef)
        .then((url) => {
          setUploadedImage(url);
          console.log(uploadedImage);
          setUploadingBoolean(false);
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateRef = doc(db, "slider", id);

    updateDoc(updateRef, {
      title: data.title,
      link: data.link,
      imageUrl: uploadedImage,
    })
      .then(() => {
        showSuccessMsg();
        setIsOpen(false);
      })
      .catch((err) => {
        showErrorMsg();
        console.log(err);
      });
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="darkBG">
        <div className="centered">
          <div className="modal">
            <button className="closeBtn" onClick={() => setIsOpen(false)}>
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>
            <div className="modalContent">
              <form onSubmit={handleSubmit}>
                <div className="modalHeader">
                  <h1 className="heading">Add Slider</h1>
                </div>
                <div className="modal-content">
                  <div className="title admin-input">
                    <input
                      onChange={(e) => {
                        let newInput = { [e.target.name]: e.target.value };
                        setData({ ...data, ...newInput });
                      }}
                      type="text"
                      name="title"
                      placeholder="Enter title here"
                    />
                    <br />
                  </div>
                  <div className="link admin-input">
                    <input
                      onChange={(e) => {
                        let newInput = { [e.target.name]: e.target.value };
                        setData({ ...data, ...newInput });
                      }}
                      name="link"
                      type="text"
                      id="link"
                      placeholder="Enter link here"
                    />
                    <br />
                  </div>
                  {/* 
                <div className="desc admin-input">
                  <textarea
                    onChange={(e) => {
                      let newInput = { [e.target.name]: e.target.value };
                      setData({ ...data, ...newInput });
                    }}
                    name="description"
                    id="desc"
                    cols="15"
                    rows="5"
                    placeholder="Enter descriptipn here"
                  ></textarea>
                  <br />
                </div> */}

                  <input
                    id="file-upload"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      setImageName(e.target.files[0].name);
                    }}
                    type="file"
                  />

                  <span
                    className="info"
                    style={{ fontStyle: "normal", color: "#111" }}
                  >
                    {imageName}
                  </span>

                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      style={{
                        maxWidth: "100%",
                        margin: "10px 0 ",
                        borderRadius: "10px",
                      }}
                      alt="slider-Form-Image"
                    />
                  ) : (
                    <p className="info">
                      "Select and upload image to see the image"
                    </p>
                  )}
                  <div className="form-image-btn">
                    <label
                      htmlFor="file-upload"
                      className="custom-file-upload form-btn"
                    >
                      Select Image
                    </label>
                    <span className="form-btn upload" onClick={uploadImage}>
                      Upload Image
                    </span>
                  </div>
                  <p id="uploading-text">{uploadingText}</p>

                  <div className="submit-btn ">
                    {uploadedImage ? (
                      <button className="form-btn submit" type="submit">
                        Submit
                      </button>
                    ) : (
                      <button
                        disabled
                        className="form-btn submit"
                        type="submit"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
