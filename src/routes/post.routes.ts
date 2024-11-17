import { PostController } from "../controllers/post.controller";
import { Application } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";

export class PostRoutes {
  private postController: PostController = new PostController();
  private authMiddleware: AuthMiddleware = new AuthMiddleware();

  public route(app: Application) {
    app.route("/mypost").get(this.authMiddleware.verifyToken, this.postController.getMyPost);
    app.route("/posts").get(this.authMiddleware.verifyToken, this.postController.getFeedPost)
        .post(this.authMiddleware.verifyToken, this.postController.createPost);
    app.route("/post/:id").get(this.authMiddleware.verifyToken, this.postController.getPost)
        .put(this.authMiddleware.verifyToken, this.postController.updatePost)
        .delete(this.authMiddleware.verifyToken, this.postController.deletePost);
  }
}