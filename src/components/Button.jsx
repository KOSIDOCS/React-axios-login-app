import React from "react";
import PropTypes from "prop-types";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import { green } from "@material-ui/core/colors";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[600],
    },
  },
}));

const Button = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const { buttonIcon, start, click } = props
  return (
    <div className="button-outer">
        <div className="button-outer__position">
        <Zoom key="1" in={start} timeout={transitionDuration} style={{ transitionDelay: start ? '500ms' : '0ms' }}>
      <Fab className={classes.fabGreen} aria-label="Login" onClick={click}>
          {buttonIcon}
      </Fab>
    </Zoom>
        </div>
    </div>
  );
};

Button.propTypes = {
    buttonIcon: PropTypes.any.isRequired,
    start: PropTypes.bool,
    click: PropTypes.func,
};

export default Button;
