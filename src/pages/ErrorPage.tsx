import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h2 className="text-4xl">404</h2>
      <Link className="mt-5" to="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
