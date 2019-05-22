import Grid from '@material-ui/core/Grid';
import { observer } from "mobx-react";
import * as React from 'react';
import CONFIG from "../../config";
import productStore from "../../stores/ProductStore";
import { IProps } from './product-list';
import ProductListElement from "./product-list-element";
/*
  Desktop version automatically extends products list
  as soon as user scrolls near the bottom
*/
@observer
export class ProductListDesktop extends React.Component<IProps, {}> {
  public ticking: boolean = false;
  public update() {
    const distanceToBottom = document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight);
    if (distanceToBottom < CONFIG.offsetHeightToTriggerLoading) {
      productStore.add();
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
    return (<Grid container={true} spacing={24}>
      {this.props.products.slice(0, productStore.productsToShow).map(node => (<Grid item={true} xs={12} sm={6} md={4} lg={3} xl={2} key={node.id}>
        <ProductListElement data={{
          coverFluid: node.frontmatter.cover &&
            node.frontmatter.cover.childImageSharp
            ? node.frontmatter.cover.childImageSharp.fluid
            : null,
          description: node.frontmatter.description,
          price: node.frontmatter.price,
          slug: node.fields.slug,
          tags: node.frontmatter.tags,
          title: node.frontmatter.title,
          url: node.frontmatter.url,
        }} />
      </Grid>))}
    </Grid>);
  }
}
