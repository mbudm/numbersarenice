import { observer } from "mobx-react";
import React from "react";
import productStore from "../../stores/ProductStore";
import { IProps } from './product-list';
import ProductListElement from "./product-list-element";
import ShowMoreButton from "./show-more-button";
/*
  Mobile version extends product list as soon as user clicks
  on a "LoadMore" button at the end of the list
*/
@observer
export class ProductListMobile extends React.Component<IProps, {}> {
  public handleUpdate = () => {
    productStore.add();
  };
  public render() {
    return (<div style={{ minHeight: "50vh" }}>
      {this.props.products.slice(0, productStore.productsToShow).map(node => (<div key={node.id}>
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
      </div>))}
      {this.props.totalCount > productStore.productsToShow && (<ShowMoreButton onClickHandler={this.handleUpdate} />)}
    </div>);
  }
}
