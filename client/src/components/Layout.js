import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = ({ isLogged, name }) => {
  return (
    <>
    <Header isLogged={isLogged} name={name} />
    <Outlet />
    </>
  );
};

export default Layout;
