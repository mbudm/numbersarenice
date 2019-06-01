import Button from "@material-ui/core/Button"
import { Link } from "gatsby"
import * as React from "react"
import THEME from "../../theme"

export default () => (
  <div style={{ textAlign: "right" }}>
    <Link to={`/about/`} style={{ textDecoration: "none" }}>
      <Button
        variant="outlined"
        style={{
          backgroundColor: THEME.index.aboutButton.backgroundColor,
          borderColor: THEME.index.aboutButton.borderColor,
          color: THEME.index.aboutButton.color,
          marginRight: 20,
          textTransform: "none",
          width: THEME.index.aboutButton.width,
        }}
      >
        About
      </Button>
    </Link>
  </div>
)
