import { Request, Response } from "express";
import { Usuario, UsuarioI } from "../models/Usuario";

export class UsuarioController {
    public async getUsuario(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const usuario = await Usuario.findByPk(id);
            res.json(usuario);
        } catch (error) {
            console.log(error);
        }
    }
}