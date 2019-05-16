import * as React from "react"
import Button from "@material-ui/core/Button"
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import THEME from "../../theme"

export default (props) => (
  <div className={`buy-button ${ props.inline && "buy-button--inline"}`} style={props.style}>
    <OutboundLink 
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
    </OutboundLink>
  </div>
)
