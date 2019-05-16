import * as React from "react"
import Image, { FluidObject } from "gatsby-image"
import Card from "@material-ui/core/Card"
import Responsive from "react-responsive"

import THEME from "../../theme"
import FabButton from "../shared/FabButton"

import BuyButton from "../product-list/buy-button"

const Mobile = props => <Responsive {...props} maxWidth={767} />
const Default = props => <Responsive {...props} minWidth={768} />

interface IContentAreaProps {
  title: string
  description: string
  url: string
  price: string
  tags: string
}

interface IHeaderArea {
  cover: FluidObject,
  price: string,
  url
}

interface IProductLayout {
  title: string
  description: string
  url: string
  price: string
  tags: string
  cover: FluidObject
}

const ContentArea = ({ title, description, tags, price, url }: IContentAreaProps) => (
  <>
    <Default>
      <Card style={{ padding: 50, position: "relative" }}>
        <h1 style={{ marginBottom: 30, marginTop: 0, textAlign: "center" }}>
          {title}
        </h1>
        <p>{description}</p>
        <small>{tags}</small>
        <BuyButton price={price} url={url} inline={true}/>
      </Card>
    </Default>
    <Mobile>
      <Card style={{ padding: 15, position: "relative" }}>
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
        <BuyButton price={price} url={url} inline={true}/>
      </Card>
    </Mobile>
  </>
)

const HeaderArea = ({ cover, price, url }: IHeaderArea) => {
  const goBack = () => window.history.back()

  return (
    <div style={{ position: "relative" }}>
      <FabButton onClickHandler={goBack} />
      <div style={{ height: "auto", width: "auto" }}>
        {cover ? <Image fluid={cover} /> : null}
      </div>
      <BuyButton price={price} url={url} style={{top: 20, right: 20 }}/>
    </div>
  )
}

export default ({ title, cover, description, tags, price, url }: IProductLayout) => {
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
          <HeaderArea cover={cover} price={price} url={url}/>
          <ContentArea title={title} description={description} tags={tags} price={price} url={url}/>
        </div>
      </Default>
      <Mobile>
        <HeaderArea cover={cover} price={price} url={url}/>
        <ContentArea title={title} description={description} tags={tags} price={price} url={url}/>
      </Mobile>
    </div>
  )
}
