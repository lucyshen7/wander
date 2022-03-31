import { Button } from "@mui/material";
import React from "react";
import "./App.scss";

interface Props {
  user: User;
}

export const Navbar: React.FC<Props> = ({ user }) => {
  return (
    <div className="nav">
      <span className="logo flex-row">
        <span>wander </span>
        <span className="logo-desc">| a travel itinerary app</span>
      </span>
      <div className="flex-row">
        <span>Logged in as {user.name}!</span>
        <Button variant="contained" className="danger-btn-grad">
          Logout
        </Button>
      </div>
    </div>
  );
};
