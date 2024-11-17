import express, { Application } from 'express';
import morgan from 'morgan';
import { Routes } from '../routes/index.routes';
import cors from 'cors';

export class App {
    app: Application;
    public router: Routes = new Routes();

    constructor(
        private port?: number | string
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    private middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
    }

   async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

    private routes() {
        this.router.route(this.app);
    }
}
