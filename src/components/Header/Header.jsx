import { useState } from "react";

const Header = () => {
  const [isDropDown, setDropDown] = useState(false);

  const [isToken, setToken] = useState("");

  const handleButtonVisibility = () => {
    setToken(!isToken);
  };

  const handleDropDown = () => {
    setDropDown(!isDropDown);
  };

  // const [token, setToken] = useState("");
  // const [isOpen, setIsOpen] = useState(false);
  // const [showSignup, setSignup] = useState(false);

  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  // const handleButton = () => {
  //   setSignup(!showSignup);
  // };

  return (
    <nav className="bg-customColor p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a href="#">
            <img src="src/assets/logo.png" alt="Logo" className="h-14" />
          </a>
        </div>

        <div className="flex items-center space-x-10">
          <a
            href="#"
            className="items-center bg-gray-800 text-white rounded-full active:bg-gray-600 px-4 py-2"
          >
            Home
          </a>
          <a
            href="#"
            className="items-center bg-gray-800 text-white rounded-full active:bg-gray-600 px-4 py-2"
          >
            BLogs
          </a>
          <a
            href="#"
            className="items-center bg-gray-800 text-white rounded-full active:bg-gray-600 px-4 py-2"
          >
            About
          </a>
        </div>

        {/* Signup */}

        {!isToken && (
          <div>
            <button
              href="#"
              className="flex items-center bg-gray-800 text-white rounded-full active:bg-gray-600 px-4 py-2"
              onClick={handleButtonVisibility}
            >
              Log In
            </button>
          </div>
        )}

        {/* Profile */}

        <div className="relative inline-block text-left">
          <button
            type="button"
            className="flex items-center bg-gray-800 text-white rounded-full active:bg-gray-600 px-4 py-2"
            onClick={handleDropDown}
          >
            <img
              className="w-6 h-6 rounded-full"
              src="src/assets/logo.png"
              alt="Profile"
            />
            <span className="mr-2 ml-2">Aminul</span>
          </button>

          {isDropDown ? (
            <div className="origin-top-left absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Profile
                </button>
                <button
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </nav>

    // <nav className="bg-customColor p-4 sticky top-0 z-50">
    //   <div className="container mx-auto flex justify-between items-center">
    //     {
    //       <div>
    //         <a href="#">
    //           <img src="src/assets/logo.png" alt="Logo" className="h-14" />
    //         </a>
    //       </div>
    //     }

    //     <div className="flex items-center space-x-10">
    //       <a
    //         href="#"
    //         className="items-center bg-gray-800 text-white rounded-full active:bg-gray-600 px-4 py-2"
    //       >
    //         Home
    //       </a>
    //       <a
    //         href="#"
    //         className="items-center bg-gray-800 text-white rounded-full active:bg-gray-600 px-4 py-2"
    //       >
    //         BLogs
    //       </a>
    //       <a
    //         href="#"
    //         className="items-center bg-gray-800 text-white rounded-full active:bg-gray-600 px-4 py-2"
    //       >
    //         About
    //       </a>
    //     </div>

    //     {!token && (
    //       <div onClick={handleButton}>
    //         <a
    //           href="#"
    //           onClick={() => {
    //             setToken("randomToken");
    //           }}
    //           className="origin-top-left absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white"
    //         >
    //           Sign Up
    //         </a>
    //       </div>
    //     )}

    // <div className="relative inline-block text-left">
    //   {token && (
    //     <button
    //       type="button"
    //       className="flex items-center bg-gray-800 text-white rounded-full active:bg-gray-600 px-4 py-2"
    //       onClick={toggleDropdown}
    //     >
    //       <img
    //         className="w-6 h-6 rounded-full"
    //         src="src/assets/logo.png"
    //         alt="Profile"
    //       />
    //       <span className="mr-2 ml-2">Aminul</span>
    //     </button>
    //   )}

    //       {isOpen && (
    //         <div className="origin-top-left absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white">
    //           <div
    //             className="py-1"
    //             role="menu"
    //             aria-orientation="vertical"
    //             aria-labelledby="options-menu"
    //           >
    //             <button
    //               className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    //               role="menuitem"
    //             >
    //               Profile
    //             </button>
    //             <button
    //               onClick={() => {
    //                 setToken("");
    //               }}
    //               className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    //               role="menuitem"
    //             >
    //               Logout
    //             </button>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Header;
