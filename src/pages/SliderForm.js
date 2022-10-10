import { useState } from "react";
import Navbar from "../components/Navbar";
import { db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import "./formCss.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SliderForm = () => {
  const [data, setData] = useState({});
  const [uploadedImage, setUploadedImage] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [uploadingBoolean, setUploadingBoolean] = useState(false);

  let showSuccessMsg = () => {
    toast.success("Data Added Successfully!");
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
  const colRef = collection(db, "slider");

  const handleSubmit = async (e) => {
    e.preventDefault();
    addDoc(colRef, {
      title: data.title,
      link: data.link,
      imageUrl: uploadedImage,
    })
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
      <Navbar pageTitle="go to slider" pageLink="/Slider" />
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
      <div className="admin-form">
        <h1>Add Slider</h1>
        <form onSubmit={handleSubmit}>
          <div className="admin-content">
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
            <p id="uploading-text">{uploadingText}</p>

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

export default SliderForm;
