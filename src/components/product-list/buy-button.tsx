import * as React from "react"
import Button from "@material-ui/core/Button"
import THEME from "../../theme"

export default (props) => (
  <div style={{ float: "right" }}>
    <a 
      href={props.url} 
      style={{ 
        textDecoration: "none",
        backgroundImage: "none",
      }}
    >
      <Button
        variant="outlined"
        style={{
          marginRight: 5,
          marginTop: 5,
          marginLeft: 10,
          color: THEME.buyButton.color,
          borderColor: THEME.buyButton.borderColor,
          backgroundColor: THEME.buyButton.backgroundColor,
          textTransform: "none",
          width: THEME.buyButton.width,
        }}
      >
       From {props.price}
      </Button>
    </a>
  </div>
)
