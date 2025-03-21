import { motion } from "framer-motion";

interface MissingPerson {
  id: number;
  name: string;
  date_of_disappearance: string;
  age: number;
  last_seen_location: string;
  home_address?: string;
  places_frequently_visited?: string;
  physical_description?: string;
  clothing_when_last_seen?: string;
  additional_notes?: string;
  issuer_mobile_number?: string;
  issuer_email_address?: string;
  issuer_name?: string;
  status: string;
  image?: string;
}

interface DetailsModalProps {
  missingPerson: MissingPerson;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ missingPerson }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="max-w-[90%] w-[90%] max-h-[90%] bg-white dark:bg-gray-600 p-4 rounded-xl shadow-lg text-left relative flex flex-col lg:flex-row overflow-auto"
    >
      <div className="flex flex-1 mb-6 lg:mr-6">
        <img
          src={
            missingPerson.image
              ? `data:image/jpeg;base64,${missingPerson.image}`
              : "./icons/placeholder.webp"
          }
          alt={missingPerson.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <section className="w-full lg:w-2/3 lg:h-full">
        <h2 className="text-2xl font-bold dark:text-white mb-4">
          {missingPerson.name}
        </h2>
        <div className="space-y-2 text-gray-800 dark:text-gray-200">
          <p>
            <strong>Status:</strong> {missingPerson.status || "Unknown"}
          </p>
          <p>
            <strong>Age:</strong> {missingPerson.age}
          </p>
          <p>
            <strong>Last Seen Location:</strong>{" "}
            {missingPerson.last_seen_location}
          </p>
          <p>
            <strong>Date of Disappearance:</strong>{" "}
            {missingPerson.date_of_disappearance}
          </p>
          {missingPerson.home_address && (
            <p>
              <strong>Home Address:</strong> {missingPerson.home_address}
            </p>
          )}
          {missingPerson.places_frequently_visited && (
            <p>
              <strong>Frequent Locations:</strong>{" "}
              {missingPerson.places_frequently_visited}
            </p>
          )}
          {missingPerson.physical_description && (
            <p>
              <strong>Physical Description:</strong>{" "}
              {missingPerson.physical_description}
            </p>
          )}
          {missingPerson.clothing_when_last_seen && (
            <p>
              <strong>Last Seen Wearing:</strong>{" "}
              {missingPerson.clothing_when_last_seen}
            </p>
          )}
          {missingPerson.additional_notes && (
            <p>
              <strong>Additional Notes:</strong>{" "}
              {missingPerson.additional_notes}
            </p>
          )}
        </div>
        <div className="mt-6 border-t border-gray-400 pt-4 text-gray-800 dark:text-gray-200">
          <h3 className="text-xl font-semibold mb-2">Issuer Details</h3>
          {missingPerson.issuer_name && (
            <p>
              <strong>Name:</strong> {missingPerson.issuer_name}
            </p>
          )}
          {missingPerson.issuer_mobile_number && (
            <p>
              <strong>Phone:</strong> {missingPerson.issuer_mobile_number}
            </p>
          )}
          {missingPerson.issuer_email_address && (
            <p>
              <strong>Email:</strong> {missingPerson.issuer_email_address}
            </p>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default DetailsModal;
