import { Request, Response } from "express";
import { Post, PostI } from "../models/Post";

export class PostController{

    public async getFeedPost(req: Request, res: Response){
        try {    
            const userId = req.headers['userId'] as string;
            const posts = await Post.findAll() as PostI[];
            res.json(posts);
        } catch (error) {
            res.status(500).json({message: 'Internal server error'});
        }
    }

    public async getMyPost(req: Request, res: Response){
        try {

            const userId = req.headers['userId'] as string;
            const post = await Post.findAll({ 
                    where: {usuarioId: userId}
                }) as PostI[];
            res.json(post);
        } catch (error) {
            res.status(500).json({message: 'Internal server error'});
        }
    }

    public async getPost(req: Request, res: Response){
        try {
            const postId = req.params.id;
            const post = await Post.findByPk(postId);
            res.json(post);
        } catch (error) {
            res.status(500).json({message: 'Internal server error'});
        }
    }

    public async createPost(req: Request, res: Response){
        try {
            const userId = req.headers['userId'] as string;
            const post = req.body as PostI;
            post.usuarioId = Number(userId);
            const newPost = await Post.create({...post});
            res.json(newPost);
        } catch (error) {
            res.status(500).json({message: 'Internal server error'});
        }
    }

    public async updatePost(req: Request, res: Response){
        try {
            const postId = req.params.id;
            const post = req.body as PostI;
            await Post.update(post, {where: {id: postId}});
            res.json({message: 'Post updated'});
        } catch (error) {
            res.status(500).json({message: 'Internal server error'});
        }
    }

    public async deletePost(req: Request, res: Response){
        try {
            const postId = req.params.id;
            await Post.destroy({where: {id: postId}});
            res.json({message: 'Post deleted'});
        } catch (error) {
            res.status(500).json({message: 'Internal server error'});
        }
    }
}