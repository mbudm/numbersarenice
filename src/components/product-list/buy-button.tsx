import Button from "@material-ui/core/Button"
import { OutboundLink } from 'gatsby-plugin-google-analytics'
import * as React from "react"

import THEME from "../../theme"

export default (props) => (
  <div className={`buy-button ${ props.inline && "buy-button--inline"}`} style={props.style}>
    <OutboundLink
      href={props.url}
      style={{
        backgroundImage: "none",
        textDecoration: "none",
      }}
    >
      <Button
        variant="outlined"
        style={{
          backgroundColor: THEME.buyButton.backgroundColor,
          borderColor: THEME.buyButton.borderColor,
          color: THEME.buyButton.color,
          marginLeft: 10,
          marginRight: 5,
          marginTop: 5,
          textTransform: "none",
          width: THEME.buyButton.width,
        }}
      >
       From {props.price}
      </Button>
    </OutboundLink>
  </div>
)
