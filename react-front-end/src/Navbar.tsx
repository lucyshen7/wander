import { Button } from "@mui/material";
import React from "react";
import "./App.scss";

interface Props {
  user: User;
}

export const Navbar: React.FC<Props> = ({ user }) => {
  return (
    <div className="nav">
      <span className="logo">Wander</span>
      <div className="profile">
        <span>Logged in as {user.name}!</span>
        <Button variant="contained" color="info">
          Logout
        </Button>
      </div>
    </div>
  );
};
