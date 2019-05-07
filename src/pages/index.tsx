import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layouts/index-layout"
import ProductList from "../components/product-list/product-list"
import { FluidObject } from "gatsby-image"

interface IProps {
  data: {
    allMarkdownRemark: {
      totalCount: number
      edges: {
        node: {
          id: string
          frontmatter: {
            title: string
            price: string
            url: string
            description: string
            tags: string
            cover: {
              childImageSharp: {
                fluid: FluidObject
              }
            }
            fields: {
              slug: string
            }
            excerpt: string
          }
        }
      }[]
    }
  }
}

class Products extends React.Component<IProps> {
  render() {
    const products = this.props.data.allMarkdownRemark.edges.map(
      (e: any) => e.node
    )
    const totalCount = this.props.data.allMarkdownRemark.totalCount

    return (
      <Layout>
        <ProductList products={products} totalCount={totalCount} />
      </Layout>
    )
  }
}

export default Products

export const query = graphql`
  query {
    allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC },
        filter: {fileAbsolutePath: {regex: "/(products)/.*\\.md$/"}}
      ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            price
            url
            description
            tags
            cover {
              childImageSharp {
                ... on ImageSharp {
                  fluid(maxWidth: 800, maxHeight: 400) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
