export function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 w-full">
      <div className="relative flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-gray-300 hover:text-white">
              SHOP
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-white">
              SIZING AND FIT
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-white">
              CUSTOMER CARE
            </a>
          </li>
        </ul>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-white text-xl font-bold">
          E-Commerce
        </h1>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-gray-300 hover:text-white">
              SEARCH
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-white">
              USER
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-white">
              CART
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
