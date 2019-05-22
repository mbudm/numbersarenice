import { Link } from "gatsby"
import Image, { FluidObject } from "gatsby-image"
import * as React from "react"

import Avatar from "@material-ui/core/Avatar"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Typography from "@material-ui/core/Typography"
import THEME from "../../theme";

interface IBlogListElement {
  data: {
    slug: string
    date: string
    title: string
    description: string
    coverFluid: FluidObject | null
  }
}

export default ({ data }: IBlogListElement) => (
  <div style={{ marginTop: 25, marginBottom: 25 }}>
    <Card>
      <CardActionArea>
        <Link
          to={data.slug}
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                style={{
                  backgroundColor: THEME.blogListElement.avatar.backgroundColor,
                  color: THEME.blogListElement.avatar.color,
                  textShadow: "none"
                }}
              >
                {data.title.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={data.title}
            subheader={data.date}
          />
          {data.coverFluid ? <Image fluid={data.coverFluid} /> : null}
          <CardContent>
            <Typography component="p">{data.description}</Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  </div>
)
