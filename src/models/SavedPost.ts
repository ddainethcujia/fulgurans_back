import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Usuario } from "./Usuario";
import { Post } from "./Post";

export interface SavedPostI {
    id?: number;
    fecha: Date;
    usuarioId: number;
    postId: number;
}

export class SavedPost extends Model {
    public id!: number;
    public fecha!: Date;
    public usuarioId!: number;
    public postId!: number;
}

SavedPost.init(
    {
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: "id",
            }
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: Post,
                key: "id",
            }
        },
    },
    {
        tableName: "guardados",
        sequelize: database,
        timestamps: false,
        hooks: {
            async afterSync() {
                const registros = await SavedPost.count();
                if (registros === 0) {
                    await SavedPost.bulkCreate([
                        { fecha: new Date(), usuarioId: 1, postId: 1 },
                        { fecha: new Date(), usuarioId: 2, postId: 2 },
                        { fecha: new Date(), usuarioId: 3, postId: 3 },
                    ]);
                }
            }
        }
    }
);