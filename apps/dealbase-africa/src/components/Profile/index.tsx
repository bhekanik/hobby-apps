import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <div>
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
      <LogoutButton />
    </div>
  ) : (
    <LoginButton />
  );
};

export default Profile;
