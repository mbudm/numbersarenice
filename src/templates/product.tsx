import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layouts/product-layout"
import { FluidObject } from "gatsby-image"

interface IProduct {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string
        description: string
        price: string
        tags: string
        cover: {
          childImageSharp: {
            fluid: FluidObject
          }
        }
      }
    }
  }
}

export default ({ data }: IProduct) => {
  const node = data.markdownRemark
  const cover =
    node.frontmatter.cover && node.frontmatter.cover.childImageSharp
      ? node.frontmatter.cover.childImageSharp.fluid
      : null

      const {
        title,
        description,
        price,
        tags
      } = node.frontmatter;

  return (
    <Layout 
      title={title} 
      cover={cover}
      description={description}
      price={price}
      tags={tags}
    />
  )
}

export const query = graphql`
  query($slug: String!, $coverImageMaxWidth: Int!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
        price
        tags
        cover {
          childImageSharp {
            ... on ImageSharp {
              fluid(maxWidth: $coverImageMaxWidth) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
