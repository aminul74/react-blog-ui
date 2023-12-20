const Navbar = () => {
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

        <div className="flex items-center">
          <img
            src="https://placekitten.com/32/32"
            alt="Profile"
            className="rounded-full h-8 w-8"
          />
          <span className="text-white text-lg ml-2">Aminul</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
