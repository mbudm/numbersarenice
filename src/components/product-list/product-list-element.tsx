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
    <Card>
      <CardActionArea>
        
        <Link
          to={data.slug}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <CardHeader
            title={data.title}
          />
          {data.coverFluid ? <Image fluid={data.coverFluid} /> : null}
        </Link>
        <CardContent>
          <BuyButton price={data.price} url={data.url}/>
          <Typography component="p">{data.description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </div>
)
