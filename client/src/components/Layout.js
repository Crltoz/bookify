import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = ({ user }) => {
  return (
    <>
      <Header user={user} />
      <Outlet />
    </>
  );
};

export default Layout;
