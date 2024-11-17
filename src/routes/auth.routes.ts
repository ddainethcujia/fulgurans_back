import { AuthController } from '../controllers/auth.controller';
import { Application } from 'express';

export class AuthRoutes{
    private authController: AuthController = new AuthController();

    public route(app: Application){
        app.route('/auth/signin').post(this.authController.login);
        app.route('/auth/signup').post(this.authController.register);
    }
}