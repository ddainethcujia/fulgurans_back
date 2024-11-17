import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Usuario } from "./Usuario";

export interface PostI {
    id?: number;
    titulo: string;
    texto: string;
    imagen: string;
    nombreAutor: string;
    usuarioId: number;
}

export class Post extends Model implements PostI {
    public id!: number;
    public titulo!: string;
    public texto!: string;
    public imagen!: string;
    public nombreAutor!: string;
    public usuarioId!: number;
}

Post.init(
    {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        texto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "no-image.jpg",
        },
        nombreAutor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: 'id'
            }
        },
    },
    {
        tableName: "posts",
        sequelize: database,
        timestamps: false,
        hooks: {
            async beforeCreate(post) {
                const usuario = await Usuario.findByPk(post.usuarioId);
                if (usuario) {
                    post.nombreAutor = usuario.nombre;
                }
            },
            async beforeBulkCreate(posts) {
                for (const post of posts) {
                    const usuario = await Usuario.findByPk(post.usuarioId);
                    if (usuario) {
                        post.nombreAutor = usuario.nombre;
                    }
                }
            },
            async afterSync() {
                const registros = await Post.count();
                if (registros === 0) {
                    await Post.bulkCreate([
                        { titulo: "Post 1", texto: "Contenido del post 1", imagen: "imagen1.jpg", usuarioId: 1 },
                        { titulo: "Post 2", texto: "Contenido del post 2", imagen: "imagen2.jpg", usuarioId: 2 },
                        { titulo: "Post 3", texto: "Contenido del post 3", imagen: "imagen3.jpg", usuarioId: 3 },
                    ]);
                }
            }
        }
    }
);