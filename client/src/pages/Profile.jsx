import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../../firebase";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

function Profile() {
  const [formData, setFormData] = React.useState({});
  const fileRef = React.useRef(null);
  const [image, setImage] = React.useState(null);
  const [imageUploadProgress, setImageUploadProgress] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [imageError, setImageError] = React.useState(false);

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //dispatch(signInStart());
      const response = await fetch("/api/user/update/:id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!data.email) {
        console.log(data);
        //dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      //dispatch(signInFailure(error));
    }
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  React.useEffect(() => {
    handleImageUpload();
  }, [image]);

  const handleImageUpload = async () => {
    const storage = getStorage(app);
    const fileName = image?.name + new Date().getTime();
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImageUploadProgress(Math.round(progress));
    });
    (error) => setImageError(true);
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData((prev) => ({ ...prev, profileImage: downloadURL }));
      });
    };
  };

  return (
    <div className="mx-auto p-3 mt-10">
      <h1 className="text-center font-semibold text-3xl py-3"> Profile</h1>
      <form
        className="flex justify-center items-center flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />

        <img
          src={formData.profileImage || currentUser.profileImage}
          alt="profile image"
          className="h-24 w-24 rounded-full self-center cursor-pointer object-cover mb-3"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imageUploadProgress > 0 && imageUploadProgress < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imageUploadProgress} %`}</span>
          ) : imageUploadProgress === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="username"
          id="username"
          placeholder={currentUser.username}
          className="bg-slate-50 rounded-lg py-2 px-2 outline-none w-full sm:w-[75%] lg:w-[35%]"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder={currentUser.email}
          className="bg-slate-50 rounded-lg py-2 px-2 outline-none w-full sm:w-[75%] lg:w-[35%]"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-50 rounded-lg py-2 px-2 outline-none w-full sm:w-[75%] lg:w-[35%]"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 rounded-lg p-3 w-full sm:w-[75%] lg:w-[35%] disabled:opacity-70 hover:opacity-95 uppercase text-white"
          disabled={currentUser.loading}
        >
          {currentUser.loading ? "Updating..." : "Update"}
        </button>

        <div className="flex justify-between w-full sm:w-[75%] lg:w-[35%]">
          <p>
            <Link
              to="/sign-up"
              className="underline cursor-pointer text-red-500 hover:opacity-85"
            >
              Delete Account
            </Link>
          </p>
          <p>
            <Link
              to="/sign-up"
              className="underline hover:opacity-85 cursor-pointer text-red-500"
            >
              Sign Out
            </Link>
          </p>
        </div>
        {currentUser.error && (
          <p className="text-red-500">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}

export default Profile;
