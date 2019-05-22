import Grid from "@material-ui/core/Grid"
import { Link, withPrefix } from "gatsby"
import * as React from "react"
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
      <Link to="/" style={{width: THEME.author.logo.width}}>
        <img
          style={{
            alignItems: "baseline",
            height: "auto",
            width: "100%",
          }}
          src={withPrefix(author.image)}
          alt={author.name}
        />
      </Link>
      <p
        style={{
          color: THEME.author.desc.color,
          fontSize: THEME.author.desc.fontSize,
          margin: "auto",
          marginBottom: 20,
          maxWidth: THEME.author.desc.maxWidth,
          textAlign: "center",
        }}
      >
        {author.biography}
      </p>
    </Grid>
  )
}
