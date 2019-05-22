import { observer } from "mobx-react";
import * as React from "react";
import CONFIG from "../../config";
import blogPostStore from "../../stores/BlogPostStore";
import { IProps } from "./blog-list";
import BlogListElement from "./blog-list-element";
/*
  Desktop version automatically extends blog list
  as soon as user scrolls near the bottom
*/
@observer
export class BlogListDesktop extends React.Component<IProps, {}> {
  public ticking: boolean = false;
  public update() {
    const distanceToBottom = document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight);
    if (distanceToBottom < CONFIG.offsetHeightToTriggerLoading) {
      blogPostStore.add();
    }
    this.ticking = false;
  }
  public handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => this.update());
    }
  };
  public componentDidMount() {
    window.addEventListener(`scroll`, this.handleScroll);
  }
  public componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll);
  }
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
    </div>);
  }
}
