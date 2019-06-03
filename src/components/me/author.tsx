import Grid from "@material-ui/core/Grid"
import { Link, withPrefix } from "gatsby"
import * as React from "react"
import THEME from "../../theme"

import Responsive from "react-responsive"

const Mobile = props => <Responsive {...props} maxWidth={767} />
const Default = props => <Responsive {...props} minWidth={768} />


interface IProps {
  author: {
    name: string
    image: string
    biography: string
  }
}

export default ({ author }: IProps) => (
  <>
    <Default>
      <Author author={author} styles={{
        p: {
          fontSize:32
        }
      }}/>
    </Default>
    <Mobile>
      <Author author={author} styles={{
        p: {
          fontSize: 24
        }
      }}/>
    </Mobile>
  </>
)

const Author = ({ author, styles}) => {
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
            marginBottom: "1rem",
            width: "100%",
          }}
          src={withPrefix(author.image)}
          alt={author.name}
        />
      </Link>
      <p
        style={{
          color: THEME.author.desc.color,
          margin: "auto",
          marginBottom: "1rem",
          maxWidth: THEME.author.desc.maxWidth,
          textAlign: "center",
          ...styles.p
        }}
      >
        {author.biography}
      </p>
    </Grid>
  )
}


