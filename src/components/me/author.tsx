import * as React from "react"
import { withPrefix, Link } from "gatsby"
import Grid from "@material-ui/core/Grid"
import THEME from "../../theme"

interface IProps {
  author: {
    name: string
    image: string
    biography: string
  }
}

export default ({ author }: IProps) => {
  return (
    <Grid
      container={true}
      justify="center"
      alignItems="center"
      direction={"column"}
    >
      <Link to="/">
        <img
          style={{
            alignItems: "baseline",
            width: THEME.author.logo.width,
            height: THEME.author.logo.height,
          }}
          src={withPrefix(author.image)}
          alt={author.name}
        />
      </Link>
      <p
        style={{
          color: THEME.author.desc.color,
          fontSize: THEME.author.desc.fontSize,
          maxWidth: THEME.author.desc.maxWidth,
          margin: "auto",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        {author.biography}
      </p>
    </Grid>
  )
}
