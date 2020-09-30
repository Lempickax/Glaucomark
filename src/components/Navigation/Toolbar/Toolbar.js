import React from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import Navigationitems from "../Navigationitems/Navigationitems";
import Button from "../../../UI/Button/Button";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <Button clicked={props.clicked}>
      <div className={classes.divs}>
        <div></div>

        <div></div>

        <div></div>
      </div>
    </Button>
    <div className={classes.Logo}><Logo /></div>
    <div className={classes.Bg}>
    
      <h1>GlaucoMark: Take a Glaucoma Test at Home!</h1>
    </div>
    
    <nav className={classes.DesktopOnly}>
      <Navigationitems />
    </nav>
  </header>
);

export default toolbar;
