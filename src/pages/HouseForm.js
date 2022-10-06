import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { db, storage } from "../firebase";
import { collection, updateDoc, arrayUnion, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HouseForm = () => {
  const [uploadedImage, setUploadedImage] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [uploadingBoolean, setUploadingBoolean] = useState(false);

  let showSuccessMsg = () => {
    toast.success("Image Added Successfully!");
  };
  let showErrorMsg = () => {
    toast.error("Try again!");
  };

  let uploadingText;
  if (uploadingBoolean === true) {
    uploadingText = "Uploding...";
  } else {
    uploadingText = "";
  }

  const uploadImage = () => {
    if (image == null) return;
    setUploadingBoolean(true);
    const imageRef = ref(storage, `Houses/${image.name}`);
    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef).then((url) => {
        setUploadedImage(url);
        setUploadingBoolean(false);
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const docRef = doc(db, "houses", "pic");
    await updateDoc(docRef, { list: arrayUnion(uploadedImage) })
      .then((response) => {
        console.log(response);
        showSuccessMsg();
      })
      .catch((err) => {
        console.error(err.message);
        showErrorMsg();
      });
  };

  return (
    <>
      <Navbar pageTitle="go to house" pageLink="/house" />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="admin-form">
        <h1>Add Houses</h1>
        <form onSubmit={handleSubmit}>
          <div className="admin-content">
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
              <p className="info">"Select and upload image to see the image"</p>
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

            <p id="uploading-text" style={{ paddingTop: "5px" }}>
              {uploadingText}
            </p>

            <div className="submit-btn ">
              {uploadedImage ? (
                <button className="form-btn submit" type="submit">
                  Submit
                </button>
              ) : (
                <button disabled className="form-btn submit" type="submit">
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default HouseForm;
