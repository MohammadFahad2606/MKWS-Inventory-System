import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function Navbar({ brandName, routes, action }) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map(({ name, path, icon }) => (
        <Typography
          key={name}
          as="li"
          variant="small"
          className="capitalize"
          style={{ color: "var(--color-foreground)" }}
        >
          <Link
            to={path}
            className="flex items-center gap-1 p-1 font-normal"
            style={{ color: "var(--color-mutedForeground)" }}
          >
            {icon &&
              React.createElement(icon, {
                className: "w-[18px] h-[18px] opacity-50 mr-1",
                style: { color: "var(--color-mutedForeground)" },
              })}
            {name}
          </Link>
        </Typography>
      ))}
    </ul>
  );

  return (
    <MTNavbar
      className="p-3"
      style={{
        backgroundColor: "var(--color-card)",
        color: "var(--color-foreground)",
      }}
    >
      <div
        className="container mx-auto flex items-center justify-between"
        style={{ color: "var(--color-foreground)" }}
      >
        <Link to="/">
          <Typography
            variant="small"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-bold"
            style={{ color: "var(--color-primary)" }}
          >
            {brandName}
          </Typography>
        </Link>
        <div className="hidden lg:block">{navList}</div>
        {React.cloneElement(action, {
          className: "hidden lg:inline-block",
          style: { backgroundColor: "var(--color-primary)", color: "var(--color-primaryForeground)" },
        })}
        <IconButton
          variant="text"
          size="sm"
          className="ml-auto hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          style={{ color: "var(--color-mutedForeground)" }}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon
              strokeWidth={2}
              className="h-6 w-6"
              style={{ color: "var(--color-mutedForeground)" }}
            />
          ) : (
            <Bars3Icon
              strokeWidth={2}
              className="h-6 w-6"
              style={{ color: "var(--color-mutedForeground)" }}
            />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          {React.cloneElement(action, {
            className: "w-full block lg:hidden",
            style: { backgroundColor: "var(--color-primary)", color: "var(--color-primaryForeground)" },
          })}
        </div>
      </Collapse>
    </MTNavbar>
  );
}

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
