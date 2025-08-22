import React from "react";
import { Alert } from "@material-tailwind/react";

export default function ToastAlert({ alert }) {
  if (!alert.show) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <Alert color={alert.type} className="shadow-lg">
        {alert.message}
      </Alert>
    </div>
  );
}
