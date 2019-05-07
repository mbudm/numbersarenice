import * as React from "react"
import { StaticQuery, graphql } from "gatsby"
import Responsive from "react-responsive"

import Author from "../me/author"
import AboutButton from "../me/about-button"
import CallToActionButton from "../me/calltoaction-button"
import THEME from "../../theme"

const Mobile = props => <Responsive {...props} maxWidth={767} />
const Default = props => <Responsive {...props} minWidth={768} />

interface IDataProps {
  site: {
    siteMetadata: {
      author: {
        name: string
        image: string
        biography: string
      }
    }
  }
}
interface IIndexProps {
  data: IDataProps
  styles: {
    paddingTop: number
    paddingBottom: number
  }
  children: React.ReactNode
}

interface IHeaderArea {
  data: IDataProps
  styles: {
    paddingTop: number
    paddingBottom: number
  }
}

const HeaderArea = ({ data, styles }: IHeaderArea) => (
  <div
    style={{
      background: THEME.index.header.background,
    }}
  >
    <AboutButton />
    <div
      style={{
        paddingTop: styles.paddingTop,
        paddingBottom: styles.paddingBottom,
      }}
    >
      <Author author={data.site.siteMetadata.author} />
      <CallToActionButton />
    </div>
  </div>
)

const ContentArea = ({ children }: { children: React.ReactNode }) => (
  <div
    id={"children"}
    style={{
      flexGrow: 1,
      margin: "0 auto",
      padding: 10,
      paddingTop: 10,
    }}
  >
    {children}
  </div>
)

const IndexLayout = ({ data, styles, children }: IIndexProps) => (
  <div style={{ backgroundColor: THEME.index.layout.backgroundColor }}>
    <HeaderArea data={data} styles={styles} />
    <ContentArea children={children} />
  </div>
)

/*
      IndexLayoutWrapper
*/
export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            author {
              name
              image
              biography
            }
          }
        }
      }
    `}
    // tslint:disable-next-line:react-this-binding-issue
    render={(data: IDataProps) => (
      <>
        <Default>
          <IndexLayout
            data={data}
            styles={{ paddingTop: 30, paddingBottom: 30 }}
          >
            {children}
          </IndexLayout>
        </Default>
        <Mobile>
          <IndexLayout
            data={data}
            styles={{ paddingTop: 20, paddingBottom: 20 }}
          >
            {children}
          </IndexLayout>
        </Mobile>
      </>
    )}
  />
)
