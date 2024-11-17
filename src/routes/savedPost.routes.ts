import { SavedPostController } from "../controllers/savedPost.controller";
import { Application } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";

export class SavedPostRoutes {
    private savedPostController: SavedPostController = new SavedPostController();
    private authMiddleware: AuthMiddleware = new AuthMiddleware();

    public route(app: Application) {
        app.route("/savedpost").get(this.authMiddleware.verifyToken, this.savedPostController.getSavedPost);
        app.route("/savedpost").post(this.authMiddleware.verifyToken, this.savedPostController.savePost);
        app.route("/savedpost/:id").delete(this.authMiddleware.verifyToken, this.savedPostController.deleteSavedPost);
    }
}