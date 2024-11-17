import { UsuarioController } from "../controllers/Usuario.controller";
import { Application } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware";

export class UsuarioRoutes {
    private usuarioController: UsuarioController = new UsuarioController();
    private authMiddleware: AuthMiddleware = new AuthMiddleware();

    public route(app: Application) {
        app.route("/usuario/:id").get(this.authMiddleware.verifyToken,this.usuarioController.getUsuario);
    }
}