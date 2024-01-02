import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="bg-customColor text-white p-4 flex justify-between items-center sticky bottom-0 z-50 w-full h-20 mt-5">
      <p>&copy; 2023 All rights reserved.</p>
      <div className="flex space-x-4">
        <a href="#" className="hover:text-blue-500">
          <FontAwesomeIcon icon={faFacebook} className="text-lg" />
        </a>
        <a href="#" className="hover:text-blue-400">
          <FontAwesomeIcon icon={faTwitter} className="text-lg" />
        </a>
        <a href="#" className="hover:text-green-500">
          <FontAwesomeIcon icon={faWhatsapp} className="text-lg" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
