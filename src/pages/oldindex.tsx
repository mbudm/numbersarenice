import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layouts/index-layout"
import BlogList from "../components/blog-list/blog-list"
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
            date: string
            description: string
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

class Index extends React.Component<IProps> {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges.map(
      (e: any) => e.node
    )
    const totalCount = this.props.data.allMarkdownRemark.totalCount

    return (
      <Layout>
        <BlogList posts={posts} totalCount={totalCount} />
      </Layout>
    )
  }
}

export default Index
// Q how do filter this to get just product markdown pages?
// could be a param in the md meta but seem like being able to search markdown within 
// a directory would be more efficient
// with that worked out then can do a product layout component that adds tiles

export const query = graphql`
  query {
    allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC },
        filter: {fileAbsolutePath: {regex: "/(posts)/.*\\.md$/"}}
      ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            description
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
