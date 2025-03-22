import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { addMissingPerson } from "../services/api";
import { useToast } from "../contexts/ToastContext";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ReportPage = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfDisappearance: "",
    age: "",
    lastSeenLocation: "",
    homeAddress: "",
    frequentPlaces: "",
    physicalDescription: "",
    clothingLastSeen: "",
    additionalNotes: "",
    issuerMobileNumber: "",
    issuerEmailAddress: "",
    issuerName: "",
    status: "",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const selectedFiles = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleTakePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      setTimeout(() => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => {
            if (blob) {
              const file = new File([blob], `photo_${Date.now()}.png`, {
                type: "image/png",
              });
              setImages((prevImages) => [...prevImages, file]);
            }
          }, "image/png");
        }

        // Stop the camera stream
        stream.getTracks().forEach((track) => track.stop());
      }, 1000);
    } catch (error) {
      console.log(error);
      showToast("Camera access denied or unavailable.", "error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      showToast(
        "Please upload at least one image before submitting.",
        "warning"
      );
      return;
    }

    const data = new FormData();

    data.append("name", formData.fullName);
    data.append("date_of_disappearance", formData.dateOfDisappearance);
    data.append("age", formData.age);
    data.append("last_seen_location", formData.lastSeenLocation);
    data.append("home_address", formData.homeAddress);
    data.append("places_frequently_visited", formData.frequentPlaces);
    data.append("physical_description", formData.physicalDescription);
    data.append("clothing_when_last_seen", formData.clothingLastSeen);
    data.append("additional_notes", formData.additionalNotes);
    data.append("issuer_mobile_number", formData.issuerMobileNumber);
    data.append("issuer_email_address", formData.issuerEmailAddress);
    data.append("issuer_name", formData.issuerName);
    data.append("status", "missing");

    images.forEach((image) => {
      data.append("image", image);
    });

    try {
      const response = await addMissingPerson(data);

      if (response && response.message) {
        setIsSubmitted(true);
      } else {
        console.error("Error submitting report");
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="max-w-4xl mx-auto mt-12 p-6 bg-white dark:bg-gray-700 rounded-none lg:rounded-lg overflow-auto"
    >
      <span className="text-gray-600 dark:text-gray-300 text-sm mb-4 font-tinos">
        <Link to="/">Home</Link> {" > "}
        <Link to="/reportpage">Report Missing Person</Link>
      </span>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
        Report a Missing Person
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Please provide as much detail as possible to help us in the search
        process.
      </p>

      <form action="POST" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col items-start justify-center py-4 px-6 bg-gray-100 dark:bg-gray-600 gap-2 rounded-3xl">
          {images.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {images.map((imgSrc, index) => (
                <div key={index} className="relative group">
                  <img
                    src={
                      imgSrc instanceof File
                        ? URL.createObjectURL(imgSrc)
                        : imgSrc
                    }
                    alt="Uploaded"
                    className="w-24 aspect-square object-cover rounded-lg"
                  />

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 text-white rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <img
                      src="./icons/bin.svg"
                      alt="delete"
                      className="w-6 aspect-square"
                    />
                  </motion.button>
                </div>
              ))}
            </div>
          ) : (
            <span className="w-8 aspect-square bg-gray-200 rounded-full flex items-center justify-center mb-4 p-2">
              <img
                src="../icons/upload.svg"
                alt="Upload"
                className="w-6 aspect-square"
              />
            </span>
          )}
          <span className="text-lg text-gray-900 dark:text-white font-bold">
            Upload Photo
          </span>
          <span className="text-lg text-gray-600 dark:text-white opacity-60">
            Drag and drop images here or click to browse files. Clear, recent
            images work best for our AI matching system.
          </span>

          <div className="mt-4 flex gap-2 cursor-default">
            <motion.label
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer bg-[#634aff] py-2 px-3 font-bold text-white rounded-lg"
            >
              Select File
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </motion.label>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleTakePhoto}
              className="bg-[#e1e2e2] text-[#634aff] py-2 px-3 font-bold rounded-lg cursor-pointer"
            >
              Take Photo
            </motion.button>
          </div>
        </div>

        <div className="w-full flex flex-col mt-6">
          <span className="text-lg text-gray-900 dark:text-white font-bold">
            Personal Information
          </span>

          <div className="mt-6">
            <label className="block font-medium text-gray-800 dark:text-gray-200 font-tinos">
              Full Name
            </label>
            <input
              required
              type="text"
              name="fullName"
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-100 rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent text-sm"
              placeholder="Enter the full name of the missing person"
            />
          </div>

          <div className="flex space-x-4 mt-4">
            <div className="flex-1">
              <label className="block font-medium text-gray-800 dark:text-gray-200 font-tinos">
                Date of Disappearance
              </label>
              <input
                required
                type="date"
                name="dateOfDisappearance"
                onChange={handleChange}
                className="w-full mt-1 p-2 bg-gray-100 rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent uppercase"
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium text-gray-800 dark:text-gray-200 font-tinos">
                Age
              </label>
              <input
                required
                type="number"
                name="age"
                onChange={handleChange}
                className="w-full mt-1 p-2 bg-gray-100 rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent"
                placeholder="Enter age"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col mt-12">
          <span className="text-lg text-gray-900 dark:text-white font-bold">
            Location Details
          </span>

          <div className="mt-6">
            <label className="block font-medium text-gray-800 dark:text-gray-200 font-tinos">
              Last Seen Location
            </label>
            <input
              type="text"
              name="lastSeenLocation"
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-100 rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent text-sm"
              placeholder="Address, city, state, or landmark where last seen"
            />
          </div>

          <div className="mt-6">
            <label className="block font-medium text-gray-800 dark:text-gray-200 font-tinos">
              Home Address
            </label>
            <input
              type="text"
              name="homeAddress"
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-100 rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent text-sm"
              placeholder="Enter home address"
            />
          </div>

          <div className="mt-6">
            <label className="block font-medium text-gray-800 dark:text-gray-200 font-tinos">
              Places Frequently Visited
            </label>
            <input
              type="text"
              name="frequentPlaces"
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-100 rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent text-sm"
              placeholder="School, parks, friend's homes, etc"
            />
          </div>
        </div>

        <div className="w-full flex flex-col mt-12">
          <span className="text-lg text-gray-900 dark:text-white font-bold">
            Additional Information
          </span>

          <div className="mt-6">
            <label className="block font-medium text-gray-800 dark:text-gray-200 font-tinos">
              Physical Description
            </label>
            <textarea
              name="physicalDescription"
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-100 rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent text-sm"
              placeholder="Height, weight, hair color, eye color, distinguishing features"
            />
          </div>

          <div className="mt-6">
            <label className="block font-medium text-gray-800 dark:text-gray-200 font-tinos">
              Clothing When Last Seen
            </label>
            <input
              type="text"
              name="clothingLastSeen"
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-100 rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent text-sm"
              placeholder="Describe what the person what wearing when last seen"
            />
          </div>

          <div className="mt-6">
            <label className="block font-medium text-gray-800 dark:text-gray-200 font-tinos">
              Additional Notes
            </label>
            <textarea
              name="additionalNotes"
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-100 rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent text-sm"
              placeholder="Any other details that might help in the search"
            />
          </div>
        </div>

        <div className="w-full flex flex-col mt-12">
          <span className="text-lg text-gray-900 dark:text-white font-bold">
            Contact Information
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Please provide your contact information so we can reach out to you
            if needed.
          </span>

          <div className="mt-6">
            <label className="block font-medium text-gray-800 dark:text-gray-200 font-tinos">
              Full Name
            </label>
            <input
              required
              type="text"
              name="issuerName"
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-100 rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent text-sm"
              placeholder="Enter your full name"
            />
          </div>

          <div className="mt-6">
            <label className="block font-medium text-gray-800 dark:text-gray-200 font-tinos">
              Email Address
            </label>
            <input
              type="email"
              name="issuerEmailAddress"
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-100 rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent text-sm"
              placeholder="Enter your email address"
            />
          </div>

          <div className="mt-6">
            <label className="block font-medium text-gray-800 dark:text-gray-200 font-tinos">
              Mobile Number
            </label>
            <input
              type="tel"
              name="issuerMobileNumber"
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-100 rounded-xl placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent text-sm"
              placeholder="Enter your mobile number"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          className="mt-12 bg-[#29d8a1] text-white py-2 px-4 rounded-xl cursor-pointer"
        >
          Submit Report
        </motion.button>
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
          By submitting this form, you confirm that all information provided is
          accurate to the best of your knowledge.
        </p>
      </form>

      {isSubmitted && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000045]">
          <div className="w-[90%] lg:w-[30%] bg-white p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-xl font-bold text-gray-800">
              Report Submitted Successfully!
            </h2>
            <p className="text-gray-600 mt-2">
              Thank you for your submission. We will do our utmost to locate the
              missing person and keep you updated on any developments.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                navigate("/");
              }}
              className="mt-4 bg-[#29d8a1] text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ReportPage;
