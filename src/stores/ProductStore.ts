import { observable, action } from "mobx"
import CONFIG from "../config"

export class ProductStore {
  @observable productsToShow: number = CONFIG.countOfInitiallyShownProducts

  @action
  add() {
    this.productsToShow += CONFIG.countOfProductsDynamicallyAdded
  }
}

const productStore = new ProductStore()
export default productStore
