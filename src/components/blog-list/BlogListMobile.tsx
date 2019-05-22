import { observer } from "mobx-react";
import * as React from "react";
import blogPostStore from "../../stores/BlogPostStore";
import { IProps } from "./blog-list";
import BlogListElement from "./blog-list-element";
import ShowMoreButton from "./show-more-button";
/*
  Mobile version extends blog list as soon as user clicks
  on a "LoadMore" button at the end of the list
*/
@observer
export class BlogListMobile extends React.Component<IProps, {}> {
  public handleUpdate = () => {
    blogPostStore.add();
  };
  public render() {
    return (<div style={{ minHeight: "50vh" }}>
      {this.props.posts.slice(0, blogPostStore.postsToShow).map(node => (<div key={node.id}>
        <BlogListElement data={{
          coverFluid: node.frontmatter.cover &&
            node.frontmatter.cover.childImageSharp
            ? node.frontmatter.cover.childImageSharp.fluid
            : null,
          date: node.frontmatter.date,
          description: node.frontmatter.description,
          slug: node.fields.slug,
          title: node.frontmatter.title,
        }} />
      </div>))}
      {this.props.totalCount > blogPostStore.postsToShow && (<ShowMoreButton onClickHandler={this.handleUpdate} />)}
    </div>);
  }
}
