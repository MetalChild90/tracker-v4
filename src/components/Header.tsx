import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");

  const location = useLocation();

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location]);

  const menuLinks = [
    { name: "Home", url: "/" },
    { name: "Watched Coins", url: "/watched-coins" },
    { name: "Coins", url: "/coins" },
  ];

  return (
    <div className="header">
      <Link to="/">
        <h2>crypto tracker</h2>
      </Link>
      <div>
        <MdOutlineMenu
          className="menu-mobile"
          onClick={() => setMenuOpen(true)}
        />
        <div
          className={`menu-desktop transformed-for-mobile ${
            menuOpen && "open"
          }`}
        >
          <nav>
            <ul>
              {menuLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    className={`${
                      currentLocation === link.url && "link-active"
                    }`}
                    to={link.url}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {menuOpen && (
            <AiFillCloseCircle
              className="close-menu-icon cursor"
              onClick={() => setMenuOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
