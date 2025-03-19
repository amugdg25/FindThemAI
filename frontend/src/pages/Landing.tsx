import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ContactModal,
  PrivacyPolicyModal,
  TermsOfServiceModal,
} from "../components";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const Steps = [
  {
    step: 1,
    image: "upload",
    title: "Upload Photo",
    description:
      "Upload a clear photo of the missing person you want to locate",
  },
  {
    step: 2,
    image: "search",
    title: "AI Matching",
    description:
      "Our AI-powered platform matches photos of missing persons with live CCTV footage to pinpoint their exact location.",
  },
  {
    step: 3,
    image: "checked",
    title: "Locate Missing Person",
    description:
      "Receive the exact location of the missing person in real-time.",
  },
];

const SuccessStories = [
  {
    image: "heart",
    title: "Reunited with Family",
    description: "Our platform helped reunite hundreds of families.",
  },
  {
    image: "heart",
    title: "Safe Return Home",
    description:
      "With AI-powered matching, we successfully found lost individuals.",
  },
];

const Landing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPage, setModalPage] = useState("");

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="w-full min-h-24 flex flex-col bg-white dark:bg-gray-800"
    >
      <motion.section
        variants={fadeIn}
        className="w-full flex flex-col items-center justify-center bg-white dark:bg-gray-800 pb-2"
      >
        <h1 className="font-sans font-bold text-4xl text-center text-gray-800 dark:text-white lg:text-5xl mt-32">
          Helping Families Reunite with Their Loved Ones
        </h1>
        <p className="text-2xl text-center lg:text-3xl text-gray-700 dark:text-gray-300 font-sans opacity-80 my-6 mb-12">
          Our AI-powered platform matches photos of missing persons with live
          CCTV footage to pinpoint their exact location.
        </p>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/reportedcases"
            className="bg-[#29d8a1] hover:bg-[#71d0b0] text-white font-tinos lg:text-2xl text-xl py-2 px-4 rounded-xl"
          >
            <span>Search Missing Person</span>
          </Link>
        </motion.div>
      </motion.section>

      <motion.section
        variants={fadeIn}
        className="w-full gap-6 flex flex-col items-center justify-center py-4 bg-white dark:bg-gray-800"
      >
        <h1 className="text-4xl mt-32 font-oswald text-gray-800 dark:text-white">
          How It Works
        </h1>

        <motion.div
          variants={staggerContainer}
          className="flex flex-wrap p-4 items-center justify-center gap-6"
        >
          {Steps.map((step) => (
            <StepBox
              image={step.image}
              step={step.step.toString()}
              title={step.title}
              description={step.description}
            />
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        variants={fadeIn}
        className="w-full gap-6 flex flex-col items-center justify-center py-4 bg-white dark:bg-gray-800"
      >
        <h1 className="text-4xl mt-32 text-gray-800 dark:text-white">
          Success Stories
        </h1>

        <motion.div
          variants={staggerContainer}
          className="flex flex-wrap p-4 items-center justify-center gap-6"
        >
          {SuccessStories.map((story) => (
            <SuccessStoriesBox
              image={story.image}
              title={story.title}
              description={story.description}
            />
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        variants={fadeIn}
        className="w-full gap-6 flex flex-col items-center justify-center px-4 lg:p-0 bg-white dark:bg-gray-800"
      >
        <h1 className="text-4xl mt-32 font-bold text-gray-800 dark:text-white">
          Join Our Mission
        </h1>
        <p className="text-lg text-gray-700 dark:text-white max-w-2xl text-center">
          Every share can make a difference. By spreading the word, you help
          reunite missing persons with their loved ones. Together, we can bring
          more people home safely.
          <span className="font-semibold text-[#29d8a1]">
            {" "}
            Help us by sharing this platform with your friends and family.
          </span>
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const shareText =
              "Help reunite missing persons with their families. Share FindThem now! 🌍❤️";
            const shareUrl = window.location.href;
            if (navigator.share) {
              navigator
                .share({
                  title: "FindThem - Help Locate Missing Persons",
                  text: shareText,
                  url: shareUrl,
                })
                .catch(console.error);
            } else {
              navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
              alert(
                "Link copied! Share it with your friends to make a difference."
              );
            }
          }}
          className="px-6 py-3 mb-16 bg-[#634aff] text-white font-bold rounded-xl text-lg hover:bg-[#4f3cbf] transition-all duration-200"
        >
          📢 Share Now
        </motion.button>
      </motion.section>

      <footer className="w-full p-4 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <p className="text-sm text-gray-600">
          ©&nbsp;2025&nbsp;<b>|</b>&nbsp;
          <span
            onClick={() => {
              setIsModalOpen(true);
              setModalPage("privacy-policy");
            }}
            className="hover:text-[#29d8a1] hover:underline cursor-pointer"
          >
            Privacy Policy
          </span>
          &nbsp;
          <b>|</b>&nbsp;
          <span
            onClick={() => {
              setIsModalOpen(true);
              setModalPage("terms-of-service");
            }}
            className="hover:text-[#29d8a1] hover:underline cursor-pointer"
          >
            Terms of Service
          </span>
          &nbsp;
          <b>|</b>&nbsp;
          <span
            onClick={() => {
              setIsModalOpen(true);
              setModalPage("contact");
            }}
            className="hover:text-[#29d8a1] hover:underline cursor-pointer"
          >
            Contact Us
          </span>
        </p>
      </footer>

      {/* Modal Box */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-[#00000045]"
          onClick={() => setIsModalOpen(false)}
        >
          {modalContent[modalPage] || <p>Page Not Found</p>}
        </div>
      )}
    </motion.div>
  );
};

const modalContent: { [key: string]: React.ReactNode } = {
  "privacy-policy": <PrivacyPolicyModal />,
  "terms-of-service": <TermsOfServiceModal />,
  contact: <ContactModal />,
};

interface BoxProps {
  step?: string;
  image: string;
  title: string;
  description: string;
}

const StepBox = ({ step, image, title, description }: BoxProps) => {
  return (
    <motion.span
      key={step}
      variants={fadeIn}
      className="w-full lg:w-[30%] min-h-64 flex flex-col items-start justify-center py-4 px-6 bg-gray-100 dark:bg-gray-600 gap-1 rounded-3xl"
    >
      <span className="w-8 aspect-square bg-gray-200 rounded-full flex items-center justify-center mb-4 p-2">
        <img
          src={`../icons/${image === "" ? "heart" : image}.svg`}
          alt="works"
          className="w-6 aspect-square"
        />
      </span>
      <span className="text-[#29d8a1] font-bold text-sm">{`Step ${step}`}</span>
      <span className="text-lg font-bold text-gray-800 dark:text-white">
        {title}
      </span>
      <span className="text-lg text-gray-600 dark:text-white opacity-60">
        {description}
      </span>
    </motion.span>
  );
};

const SuccessStoriesBox = ({ image, title, description }: BoxProps) => {
  return (
    <motion.span
      key={title}
      variants={fadeIn}
      className="w-full lg:w-[45%] min-h-56 flex flex-col items-start justify-center py-4 px-6 bg-gray-100 dark:bg-gray-600 gap-1 rounded-3xl"
    >
      <span className="w-8 aspect-square bg-gray-200 rounded-full flex items-center justify-center mb-4 p-2">
        <img
          src={`../icons/${image === "" ? "heart" : image}.svg`}
          alt="works"
          className="w-6 aspect-square"
        />
      </span>
      <span className="text-lg text-gray-800 dark:text-white font-bold">
        {title}
      </span>
      <span className="text-lg text-gray-600 dark:text-white opacity-60">
        {description}
      </span>
    </motion.span>
  );
};

export default Landing;
