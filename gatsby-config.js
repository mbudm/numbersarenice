module.exports = {
  siteMetadata: {
    title: `Numbers are Nice`,
    author: {
      name: "Numbers are nice",
      image: "/img/logo.svg",
      biography:
        "Clear, easy to follow math posters.",
    },
    // for a list of supported networks take a look at https://jaketrent.github.io/react-social-icons/
    networks: [],
    about:
      '<p>A lightweight, mobile first blog starter with infinite scroll \
    and Material-UI design elements for \
    <a href="https://github.com/gatsbyjs/gatsby" target="_blank">Gatsby</a>. </p> \
    <p>For a quick start with this starter checkout the \
    <a href="/posts/get-started/get-started/">Get Started</a> guide. For \
    an overview of plugins used in this starter have a look at \
    <a href="/posts/gatsby-plugins/gatsby-plugins/">Plugins</a>. \
    To see a markdown blog entry in action click \
    <a href="/posts/markdown/markdown-test/">here</a>. \
    </p> \
    ',
  },
  plugins: [
    `gatsby-plugin-tslint`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-emoji-unicode`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 750,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/styles/typography`,
      },
    },
    "gatsby-plugin-offline",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        theme: {
          primaryColor: "#0c9ed1",
        },
      },
    },
  ],
  pathPrefix: "/img",
}
