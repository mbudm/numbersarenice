import { observable, action } from "mobx"
import CONFIG from "../config"

export class ProductStore {
  @observable postsToShow: number = CONFIG.countOfInitiallyShownPosts

  @action
  add() {
    this.postsToShow += CONFIG.countOfPostsDynamicallyAdded
  }
}

const productStore = new ProductStore()
export default productStore
