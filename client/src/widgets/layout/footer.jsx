import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

export function Footer({ brandName, brandLink, routes }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-2"
      style={{ backgroundColor: "var(--color-sidebar)", color: "var(--color-sidebarForeground)" }}
    >
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography
          variant="small"
          className="font-normal text-inherit text-center md:text-left"
        >
          &copy; {year}, made with{" "}
          <HeartIcon
            className="-mt-0.5 inline-block h-3.5 w-3.5"
            style={{ color: "var(--color-destructive)" }}
          />{" "}
          by{" "}
          <a
            href={brandLink}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors font-bold"
            style={{
              color: "var(--color-primaryForeground)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-foreground)")
            }
          >
            {brandName}
          </a>{" "}
          for Muslim Khatri Medical & Diagnostic Center.
        </Typography>
        <ul className="flex items-center gap-4">
          {routes.map(({ name, path }) => (
            <li key={name}>
              <Typography
                as="a"
                href={path}
                rel="noopener noreferrer"
                variant="small"
                className="py-0.5 px-1 font-normal transition-colors"
                style={{ color: "var(--color-sidebarForeground)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-sidebarForeground)")
                }
              >
                {name}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "Mohammad Fahad",
  brandLink: "https://mfahaddev.netlify.app/",
  routes: [
    { name: "Home", path: "/dashboard/home" },
    { name: "Products", path: "/dashboard/product" },
  ],
};

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
