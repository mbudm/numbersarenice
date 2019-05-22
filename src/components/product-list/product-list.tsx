import { FluidObject } from "gatsby-image"
import * as React from "react"
import Responsive from "react-responsive"
import { ProductListDesktop } from './ProductListDesktop';
import { ProductListMobile } from './ProductListMobile';

const Mobile = props => <Responsive {...props} maxWidth={767} />
const Default = props => <Responsive {...props} minWidth={768} />

export interface IProps {
  products: Array<{
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
  }>
  totalCount: number
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
