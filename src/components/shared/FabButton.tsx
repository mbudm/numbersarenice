import Fab from "@material-ui/core/Fab"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import * as React from "react"
import THEME from "../../theme"

const FabButton = ({ onClickHandler }: { onClickHandler: () => void }) => (
  <Fab
    style={{
      backgroundColor: THEME.fabButton.backgroundColor || "white",
      color: THEME.fabButton.color || "#059ce2",
      marginLeft: 20,
      marginTop: 20,
      position: "absolute" as any,
      zIndex: 50,
    }}
    aria-label="Back"
    onClick={onClickHandler}
  >
    <ArrowBackIcon />
  </Fab>
)

export default FabButton
