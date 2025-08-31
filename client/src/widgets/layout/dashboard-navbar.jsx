import { useLocation, Link } from "react-router-dom";
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
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  return (
    <Navbar
      style={{
        backgroundColor: fixedNavbar
          ? "var(--color-card)"
          : "transparent",
        color: "var(--color-foreground)",
      }}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        {/* Breadcrumbs */}
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                className="font-normal opacity-70 transition-all hover:opacity-100"
                style={{
                  color: "var(--color-mutedForeground)",
                }}
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              className="font-normal"
              style={{
                color: "var(--color-foreground)",
              }}
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography
            variant="h6"
            style={{ color: "var(--color-foreground)" }}
          >
            {page}
          </Typography>
        </div>

        {/* Right Section */}
        <div className="flex items-center">
          {/* Search */}
          <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Search" />
          </div>

          {/* Menu Toggle */}
          <IconButton
            variant="text"
            className="grid xl:hidden"
            style={{ color: "var(--color-mutedForeground)" }}
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon
              strokeWidth={3}
              className="h-6 w-6"
              style={{ color: "var(--color-mutedForeground)" }}
            />
          </IconButton>

          {/* Sign In */}
          <Link to="/auth/sign-in">
            <Button
              variant="text"
              className="hidden items-center gap-1 px-4 xl:flex normal-case"
              style={{ color: "var(--color-mutedForeground)" }}
            >
              <UserCircleIcon
                className="h-5 w-5"
                style={{ color: "var(--color-mutedForeground)" }}
              />
              Sign In
            </Button>
            <IconButton
              variant="text"
              className="grid xl:hidden"
              style={{ color: "var(--color-mutedForeground)" }}
            >
              <UserCircleIcon
                className="h-5 w-5"
                style={{ color: "var(--color-mutedForeground)" }}
              />
            </IconButton>
          </Link>

          {/* Notification Menu */}
          <Menu>
            <MenuHandler>
              <IconButton
                variant="text"
                style={{ color: "var(--color-mutedForeground)" }}
              >
                <BellIcon
                  className="h-5 w-5"
                  style={{ color: "var(--color-mutedForeground)" }}
                />
              </IconButton>
            </MenuHandler>
            <MenuList
              className="w-max border-0"
              style={{
                backgroundColor: "var(--color-card)",
                color: "var(--color-foreground)",
              }}
            >
              <MenuItem className="flex items-center gap-3">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    className="mb-1 font-normal"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    <strong>New message</strong> from Laur
                  </Typography>
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                    style={{ color: "var(--color-mutedForeground)" }}
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>

              <MenuItem className="flex items-center gap-4">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    className="mb-1 font-normal"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    <strong>New album</strong> by Travis Scott
                  </Typography>
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                    style={{ color: "var(--color-mutedForeground)" }}
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                  </Typography>
                </div>
              </MenuItem>

              <MenuItem className="flex items-center gap-4">
                <div
                  className="grid h-9 w-9 place-items-center rounded-full"
                  style={{
                    background:
                      "linear-gradient(to top right, var(--color-foreground), var(--color-primary))",
                  }}
                >
                  <CreditCardIcon
                    className="h-4 w-4"
                    style={{ color: "var(--color-primaryForeground)" }}
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    className="mb-1 font-normal"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    Payment successfully completed
                  </Typography>
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                    style={{ color: "var(--color-mutedForeground)" }}
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>

          {/* Config Button */}
          <IconButton
            variant="text"
            onClick={() => setOpenConfigurator(dispatch, true)}
            style={{ color: "var(--color-mutedForeground)" }}
          >
            <Cog6ToothIcon
              className="h-5 w-5"
              style={{ color: "var(--color-mutedForeground)" }}
            />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
