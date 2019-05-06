import * as React from "react"
import Image, { FluidObject } from "gatsby-image"
import Card from "@material-ui/core/Card"
import Responsive from "react-responsive"

import THEME from "../../theme"
import FabButton from "../shared/FabButton"

const Mobile = props => <Responsive {...props} maxWidth={767} />
const Default = props => <Responsive {...props} minWidth={768} />

interface IContentAreaProps {
  title: string
  description: string
  price: string
  tags: string
}

interface IHeaderArea {
  cover: FluidObject
}

interface IProductLayout {
  title: string
  description: string
  price: string
  tags: string
  cover: FluidObject
}

const ContentArea = ({ title, description, tags, price }: IContentAreaProps) => (
  <>
    <Default>
      <Card style={{ padding: 50 }}>
        <h1 style={{ marginBottom: 30, marginTop: 0, textAlign: "center" }}>
          {title}
        </h1>
        <p>{description}</p>
        <small>{tags}</small>
        <h2>{price}</h2>
      </Card>
    </Default>
    <Mobile>
      <Card style={{ padding: 15 }}>
        <h1
          style={{
            marginBottom: 30,
            marginTop: 0,
            marginLeft: 70,
            marginRight: 70,
            textAlign: "center",
          }}
        >
          {title}
        </h1>        
        <p>{description}</p>
        <small>{tags}</small>
        <h2>{price}</h2>
      </Card>
    </Mobile>
  </>
)

const HeaderArea = ({ cover }: IHeaderArea) => {
  const goBack = () => window.history.back()

  return (
    <>
      <FabButton onClickHandler={goBack} />
      <div style={{ height: "auto", width: "auto" }}>
        {cover ? <Image fluid={cover} /> : null}
      </div>
    </>
  )
}

export default ({ title, cover, description, tags, price }: IProductLayout) => {
  return (
    <div style={{ backgroundColor: THEME.blogPost.layout.backgroundColor }}>
      <Default>
        <div
          style={{
            maxWidth: THEME.blogPost.layout.cardMaxWidth,
            margin: "0 auto",
            paddingTop: 40,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 40,
          }}
        >
          <HeaderArea cover={cover} />
          <ContentArea title={title} description={description} tags={tags} price={price}/>
        </div>
      </Default>
      <Mobile>
        <HeaderArea cover={cover} />
        <ContentArea title={title} description={description} tags={tags} price={price}/>
      </Mobile>
    </div>
  )
}
