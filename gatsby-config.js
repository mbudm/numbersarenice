module.exports = {
  siteMetadata: {
    title: `Numbers are Nice`,
    author: {
      name: "Numbers are nice",
      image: "/img/logo.svg",
      biography:
        "Clear, easy to follow math posters. We're startng with multiplication tables, but we hope to add more math posters soon.",
    },
    // for a list of supported networks take a look at https://jaketrent.github.io/react-social-icons/
    networks: [],
    about:
      `<p>Why do posters for kids have to be badly designed 
    with clunky fonts and cartoonish typography?</p> 
    <p>It's time to give our kids the quality they deserve 
    with math posters that are clear and easy to follow.</p>
    <p>Our products are well designed using a neat alignment and judicious typography
    with key information in big type
    so that the important things are retained more easily</p>
    <p>Any questions or feedback? Contact us through our 
    <a href="https://www.redbubble.com/people/numbersarenice" >RedBubble profile page</a></p>
    `,
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
