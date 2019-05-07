import * as React from "react"
import { observer } from "mobx-react"
import productStore from "../../stores/ProductStore"
import Responsive from "react-responsive"
import Grid from '@material-ui/core/Grid';
import ShowMoreButton from "./show-more-button"

import ProductListElement from "./product-list-element"
import CONFIG from "../../config"
import { FluidObject } from "gatsby-image"

const Mobile = props => <Responsive {...props} maxWidth={767} />
const Default = props => <Responsive {...props} minWidth={768} />

interface IProps {
  products: {
    id: string
    fields: {
      slug: string
    }
    frontmatter: {
      price: string
      url: string
      title: string
      description: string
      tags: string
      cover?: {
        childImageSharp?: {
          fluid: FluidObject | null
        }
      }
    }
  }[]
  totalCount: number
}

/* 
  Desktop version automatically extends products list 
  as soon as user scrolls near the bottom
*/
@observer
class ProductListDesktop extends React.Component<IProps, {}> {
  ticking: boolean = false

  update() {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight)
    if (distanceToBottom < CONFIG.offsetHeightToTriggerLoading) {
      productStore.add()
    }
    this.ticking = false
  }

  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => this.update())
    }
  }

  componentDidMount() {
    window.addEventListener(`scroll`, this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll)
  }

  render() {
    return (
      <Grid container={true} spacing={24}>
        {this.props.products.slice(0, productStore.productsToShow).map(node => (  
          <Grid item={true} xs={12} sm={6} md={4} lg={3} xl={2} key={node.id}>
            <ProductListElement
              data={{
                slug: node.fields.slug,
                price: node.frontmatter.price,
                url: node.frontmatter.url,
                title: node.frontmatter.title,
                description: node.frontmatter.description,
                tags: node.frontmatter.tags,
                coverFluid:
                  node.frontmatter.cover &&
                  node.frontmatter.cover.childImageSharp
                    ? node.frontmatter.cover.childImageSharp.fluid
                    : null,
              }}
            />
          </Grid>
        ))}
      </Grid>
    )
  }
}

/* 
  Mobile version extends product list as soon as user clicks 
  on a "LoadMore" button at the end of the list
*/
@observer
class ProductListMobile extends React.Component<IProps, {}> {
  handleUpdate = () => {
    productStore.add()
  }

  render() {
    return (
      <div style={{ minHeight: "50vh" }}>
        {this.props.products.slice(0, productStore.productsToShow).map(node => (
          <div key={node.id}>
            <ProductListElement
              data={{
                slug: node.fields.slug,
                price: node.frontmatter.price,
                url: node.frontmatter.url,
                title: node.frontmatter.title,
                description: node.frontmatter.description,
                tags: node.frontmatter.tags,
                coverFluid:
                  node.frontmatter.cover &&
                  node.frontmatter.cover.childImageSharp
                    ? node.frontmatter.cover.childImageSharp.fluid
                    : null,
              }}
            />
          </div>
        ))}
        {this.props.totalCount > productStore.productsToShow && (
          <ShowMoreButton onClickHandler={this.handleUpdate} />
        )}
      </div>
    )
  }
}

const ProductList = (props: IProps) => (
  <>
    <Default>
      <ProductListDesktop products={props.products} totalCount={props.totalCount} />
    </Default>
    <Mobile>
      <ProductListMobile products={props.products} totalCount={props.totalCount} />
    </Mobile>
  </>
)

export default ProductList
