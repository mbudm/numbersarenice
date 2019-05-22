import { action, observable } from "mobx"
import CONFIG from "../config"

export class BlogPostStore {
  @observable public postsToShow: number = CONFIG.countOfInitiallyShownPosts

  @action
  public add() {
    this.postsToShow += CONFIG.countOfPostsDynamicallyAdded
  }
}

const blogPostStore = new BlogPostStore()
export default blogPostStore
