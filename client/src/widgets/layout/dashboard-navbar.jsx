
import React from "react";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from '@material-tailwind/react';
import {
  UserCircleIcon,
  
  ArrowRightOnRectangleIcon ,
  Bars3Icon,
} from '@heroicons/react/24/solid';
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from '@/context';


// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
];



export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split('/').filter((el) => el !== '');
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);



    const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/auth/sign-in");
  };

  return (
    <Navbar
      style={{
        backgroundColor: fixedNavbar ? 'var(--color-card)' : 'transparent',
        color: 'var(--color-foreground)',
      }}
      className={`rounded-xl transition-all ${
        fixedNavbar ? 'sticky top-4 z-40 py-3 shadow-md' : 'px-0 py-1'
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="m-6 flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        {/* Breadcrumbs */}
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? 'mt-1' : ''
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                className="font-normal opacity-70 transition-all hover:opacity-100"
                style={{
                  color: 'var(--color-mutedForeground)',
                }}
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              className="font-normal"
              style={{
                color: 'var(--color-foreground)',
              }}
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" style={{ color: 'var(--color-foreground)' }}>
            {page}
          </Typography>
        </div>

        {/* Right Section */}
        <div className="flex items-center">
         

          {/* Menu Toggle */}
          <IconButton
            variant="text"
            className="grid xl:hidden"
            style={{ color: 'var(--color-mutedForeground)' }}
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon
              strokeWidth={3}
              className="h-6 w-6"
              style={{ color: 'var(--color-mutedForeground)' }}
            />
          </IconButton>




 {/* Avatar */}
<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0"
        >
          <Avatar
            variant="circular"
            size="md"
            alt="tania andrew"
            withBorder={true}
            color="gray"
            className=" p-0.5"
            src="/img/logo-ct-dark.png"
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>







          {/* logout Button */}
          <IconButton
            variant="text"
            onClick={handleLogout}
            style={{ color: 'var(--color-mutedForeground)' }}
          >
            <ArrowRightOnRectangleIcon
              className="h-5 w-5"
              style={{ color: 'var(--color-mutedForeground)' }}
            />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = '/src/widgets/layout/dashboard-navbar.jsx';

export default DashboardNavbar;
