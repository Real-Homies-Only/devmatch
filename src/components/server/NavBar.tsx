import React, { Fragment } from "react";

import Logo from "../client/Logo";
import AccountButtons from "../client/AccountButtons";

const NavBar: React.FC = () => {
  return (
    <Fragment>
      <div className="navbar bg-background-700 shadow-sm">
        <Logo />
        <AccountButtons />
      </div>
    </Fragment>
  );
};

export default NavBar;
