import { Request, Response } from "express";
import { SavedPost, SavedPostI } from "../models/SavedPost";

export class SavedPostController {

    public async getSavedPost(req: Request, res: Response) {
        try {
            const userId = req.headers['userId'] as string;
            const savedPost = await SavedPost.findAll({
                where: { usuarioId: userId }
            }) as SavedPostI[];
            res.json(savedPost);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async savePost(req: Request, res: Response) {
        try {
            const userId = req.headers['userId'] as string;
            const postId = req.body['postId'] as string;
            const savedPost = {
                fecha: new Date(),
                usuarioId: Number(userId),
                postId: Number(postId),
            };
            const newSavedPost = await SavedPost.create({ ...savedPost });
            res.json(newSavedPost);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async deleteSavedPost(req: Request, res: Response) {
        try {
            const savedPostId = req.params.id;
            await SavedPost.destroy({ where: { id: savedPostId } });
            res.json({ message: 'Saved post deleted' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}