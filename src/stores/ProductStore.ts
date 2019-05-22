import { action, observable } from "mobx"
import CONFIG from "../config"

export class ProductStore {
  @observable public productsToShow: number = CONFIG.countOfInitiallyShownProducts

  @action
  public add() {
    this.productsToShow += CONFIG.countOfProductsDynamicallyAdded
  }
}

const productStore = new ProductStore()
export default productStore
