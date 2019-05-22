import * as React from "react"
import Responsive from "react-responsive"

import { FluidObject } from "gatsby-image"
import { BlogListDesktop } from "./BlogListDesktop";
import { BlogListMobile } from "./BlogListMobile";

const Mobile = props => <Responsive {...props} maxWidth={767} />
const Default = props => <Responsive {...props} minWidth={768} />

export interface IProps {
  posts: Array<{
    id: string
    fields: {
      slug: string
    }
    frontmatter: {
      date: string
      title: string
      description: string
      cover?: {
        childImageSharp?: {
          fluid: FluidObject | null
        }
      }
    }
  }>
  totalCount: number
}

const BlogList = (props: IProps) => (
  <>
    <Default>
      <BlogListDesktop posts={props.posts} totalCount={props.totalCount} />
    </Default>
    <Mobile>
      <BlogListMobile posts={props.posts} totalCount={props.totalCount} />
    </Mobile>
  </>
)

export default BlogList
