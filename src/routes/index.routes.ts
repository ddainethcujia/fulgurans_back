import { Application } from "express";
import { AuthRoutes } from "./auth.routes";
import { PostRoutes } from "./post.routes";
import { SavedPostRoutes } from "./savedPost.routes";

export class Routes {
    private authRoutes: AuthRoutes = new AuthRoutes();
    private postRoutes: PostRoutes = new PostRoutes();
    private savedPostRoutes: SavedPostRoutes = new SavedPostRoutes();

    public route(app: Application) {
        this.authRoutes.route(app);
        this.postRoutes.route(app);
        this.savedPostRoutes.route(app);
    }
}
