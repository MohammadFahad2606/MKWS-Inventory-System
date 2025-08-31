// src/widgets/layout/sidenav.jsx
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, IconButton, Typography } from '@material-tailwind/react';
import { useMaterialTailwindController, setOpenSidenav } from '@/context';

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, openSidenav } = controller;

  const sidenavTypes = {
    dark: 'bg-[var(--color-sidebar)]',
    white: 'bg-[var(--color-sidebar)] shadow-sm',
    transparent: 'bg-transparent',
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? 'translate-x-0' : '-translate-x-80'
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl border transition-transform duration-300 xl:translate-x-0`}
      style={{ borderColor: 'var(--color-sidebarBorder)' }}
    >
      <div className="relative">
        <Link to="/" className="px-8 py-6 text-center">
          <Typography
            variant="h5"
            className="flex flex-col items-center gap-2 p-5 font-bold"
            style={{ color: 'var(--color-sidebarForeground)' }}
          >
            <img src={brandImg} className="h-16 w-16" alt="" />
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          style={{ color: 'var(--color-sidebarForeground)' }}
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>

      {/* <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  className="font-black uppercase opacity-75"
                  style={{ color: "var(--color-sidebarForeground)" }}
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
                      variant={isActive ? "filled" : "text"}
                      fullWidth
                      className="flex items-center gap-4 px-4 capitalize transition-colors"
                      style={{
                        backgroundColor: isActive
                          ? "var(--color-sidebarPrimary)"
                          : "transparent",
                        color: isActive
                          ? "var(--color-sidebarPrimaryForeground)"
                          : "var(--color-sidebarForeground)",
                        boxShadow: isActive ? "0 2px 4px var(--color-sidebarRing)" : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "var(--color-sidebarAccent)";
                          e.currentTarget.style.color = "var(--color-sidebarAccentForeground)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "var(--color-sidebarForeground)";
                        }
                      }}
                    >
                      <span
                        style={{
                          color: isActive
                            ? "var(--color-sidebarPrimaryForeground)"
                            : "var(--color-sidebarForeground)",
                        }}
                      >
                        {icon}
                      </span>
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
      </div> */}

      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mb-2 mt-4">
                <Typography
                  variant="small"
                  className="font-black uppercase opacity-75"
                  style={{ color: 'var(--color-sidebarForeground)' }}
                >
                  {title}
                </Typography>
              </li>
            )}

            {pages
              .filter(({ hidden }) => !hidden) // ✅ filter hidden pages
              .map(({ icon, name, path }) => (
                <li key={name}>
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? 'filled' : 'text'}
                        fullWidth
                        className="flex items-center gap-4 px-4 capitalize transition-colors"
                        style={{
                          backgroundColor: isActive
                            ? 'var(--color-sidebarPrimary)'
                            : 'transparent',
                          color: isActive
                            ? 'var(--color-sidebarPrimaryForeground)'
                            : 'var(--color-sidebarForeground)',
                          boxShadow: isActive
                            ? '0 2px 4px var(--color-sidebarRing)'
                            : 'none',
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor =
                              'var(--color-sidebarAccent)';
                            e.currentTarget.style.color =
                              'var(--color-sidebarAccentForeground)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor =
                              'transparent';
                            e.currentTarget.style.color =
                              'var(--color-sidebarForeground)';
                          }
                        }}
                      >
                        <span
                          style={{
                            color: isActive
                              ? 'var(--color-sidebarPrimaryForeground)'
                              : 'var(--color-sidebarForeground)',
                          }}
                        >
                          {icon}
                        </span>
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
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
  brandImg: '/img/logo-ct.png',
  brandName: 'Muslim Khatri Medical Center ',
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = '/src/widgets/layout/sidenav.jsx';
export default Sidenav;
