import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, openSidenav } = controller;

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-[var(--color-surface)] shadow-sm",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className="relative">
        <Link to="/" className="py-6 px-8 text-center">
          <Typography
        
            variant="h5"
            className="text-[var(--color-text-on-primary)] flex flex-col items-center  text-x p-5 gap-2 font-weight: 700"
          >

            <img src={brandImg} className="h-16 w-16 " alt="" />
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>

      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  className="font-black uppercase opacity-75 text-[var(--color-muted)]"
                >
                  {title}
                </Typography>
              </li>
            )}

            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      // We override colors via CSS variables so keep variant = filled/text
                      variant={isActive ? "filled" : "text"}
                      className={`flex items-center gap-4 px-4 capitalize
                        ${isActive
                          ? "!bg-[var(--color-primary)] !text-[var(--color-text-on-primary)]"
                          : "text-[var(--color-muted)] hover:!bg-[var(--color-primary)] hover:!text-[var(--color-text-on-primary)]"
                        }
                      `}
                      fullWidth
                      style={{ boxShadow: isActive ? "var(--shadow-elev-1)" : "none" }}
                    >
                      {/* icon color controlled by CSS var */}
                      <span className="text-[var(--color-icon)]">{icon}</span>
                      <Typography color="inherit" className="font-medium capitalize">
                          {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Muslim Khatri Medical Center ",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";
export default Sidenav;


