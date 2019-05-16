import * as React from "react"
import { Link } from "gatsby"
import Image, { FluidObject } from "gatsby-image"

import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import CardHeader from "@material-ui/core/CardHeader"
import THEME from "../../theme";
import BuyButton from "./buy-button";

interface IProductListElement {
  data: {
    slug: string
    price: string
    url: string
    title: string
    description: string
    coverFluid: FluidObject | null
  }
}

export default ({ data }: IProductListElement) => (
  <div style={{ marginTop: 25, marginBottom: 25 }}>
    <Card style={{ position: "relative"}}>
      <CardActionArea>
        <Link
          to={data.slug}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          {data.coverFluid ? <Image fluid={data.coverFluid} /> : null}
        </Link>
        <CardContent>
          <Typography component="p">{data.title}</Typography>
        </CardContent>
      </CardActionArea>
      <BuyButton price={data.price} url={data.url} style={{top: 10, right:10}}/>
    </Card>
  </div>
)
