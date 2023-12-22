import { useState } from "react";

const Header = () => {
  const [isDivVisible, setDivVisibility] = useState(false);

  const toggleDivVisibility = () => {
    setDivVisibility(!isDivVisible);
  };

  return (
    <nav className="bg-customColor p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a href="#">
            <img src="src/assets/logo.png" alt="Logo" className="h-14" />
          </a>
        </div>

        <div className="flex items-center space-x-10">
          <a href="#" className="text-white text-lg hover:text-gray-300">
            Home
          </a>
          <a href="#" className="text-white text-lg hover:text-gray-300">
            About
          </a>
          <a href="#" className="text-white text-lg hover:text-gray-300">
            Contact
          </a>
        </div>

        <nav>
          <button onClick={toggleDivVisibility}>Toggle Div</button>
        </nav>
      </div>

      {isDivVisible && (
        <div>
          <p>This is a simple div.</p>
        </div>
      )}
    </nav>
  );
};

export default Header;
