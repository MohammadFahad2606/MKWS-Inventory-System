import React, { useState } from "react";
import {
  Input,
  Checkbox,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import API from "../../api/api"; // 👈 axios instance import

export function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // validate
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.terms)
      newErrors.terms = "You must agree to the terms & conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // submit handler with API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiMessage("");

    try {
      // ✅ API call
            const res = await API.post("/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setApiMessage("✅ Registration successful! Welcome " + res.data.name);
      setFormData({ name: "", email: "", password: "", terms: false });
    } catch (err) {
      setApiMessage(
        "❌ " + (err.response?.data?.message || "Something went wrong")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="m-8 flex">
      {/* Left side image */}
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
          alt="signup"
        />
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Join Us Today
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Fill in your details to create an account.
          </Typography>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
        >
          <div className="mb-1 flex flex-col gap-6">
            {/* Name */}
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                Full Name
              </Typography>
              <Input
                size="lg"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                Your email
              </Typography>
              <Input
                size="lg"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@mail.com"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                Password
              </Typography>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  size="lg"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 pr-10"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <IconButton
                  variant="text"
                  size="sm"
                  className="!absolute right-2 top-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-700" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-700" />
                  )}
                </IconButton>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Terms */}
          <Checkbox
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree to the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          {errors.terms && (
            <p className="text-red-500 text-sm -mt-3">{errors.terms}</p>
          )}

          <Button type="submit" className="mt-6" fullWidth disabled={loading}>
            {loading ? "Registering..." : "Register Now"}
          </Button>

          {/* API Message */}
          {apiMessage && (
            <p
              className={`mt-3 text-center text-sm ${
                apiMessage.startsWith("✅")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {apiMessage}
            </p>
          )}

          {/* Link to login */}
          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-medium mt-4"
          >
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">
              Sign in
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
