import Button from "@material-ui/core/Button"
import * as React from "react"
import THEME from "../../theme"

export default ({ onClickHandler }) => (
  <div style={{ textAlign: "center" }}>
    <Button
      onClick={onClickHandler}
      style={{
        backgroundColor: THEME.blogPost.showMoreButton.backgroundColor,
        borderColor: THEME.blogPost.showMoreButton.borderColor,
        borderStyle: "solid",
        borderWidth: 1,
        color: THEME.blogPost.showMoreButton.color,
        textTransform: "none",
        width: THEME.blogPost.showMoreButton.width,
      }}
    >
      Load More
    </Button>
  </div>
)
