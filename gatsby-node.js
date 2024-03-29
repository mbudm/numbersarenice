const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const BLOG_POST_LIMIT = 1000
const BLOG_POST_COVER_IMAGE_MAX_WIDTH = 800

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  return graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___title,], order: DESC }
        limit: ${BLOG_POST_LIMIT}
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    // Create blog pages
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const component = node.fields.slug.includes('products') ?
        path.resolve(`./src/templates/product.tsx`) :
        path.resolve(`./src/templates/blog-post.tsx`);
      createPage({
        path: node.fields.slug,
        component,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
          coverImageMaxWidth: BLOG_POST_COVER_IMAGE_MAX_WIDTH,
        },
      })
    })
  })
}
