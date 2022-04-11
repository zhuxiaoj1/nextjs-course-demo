import { ReactChild } from "react";
import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

const Layout = (props: { children: ReactChild }) => (
  <div>
    <MainNavigation />
    <main className={classes.main}>{props.children}</main>
  </div>
);

export default Layout;
