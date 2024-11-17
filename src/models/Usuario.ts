import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import bcrypt from 'bcrypt';

export interface UsuarioI {
    id?: number;
    nombre: string;
    email: string;
    password: string;
}

export class Usuario extends Model implements UsuarioI {
    public id!: number;
    public nombre!: string;
    public email!: string;
    public password!: string;
}

Usuario.init(
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "usuarios",
        sequelize: database,
        timestamps: false,
        hooks: {
            beforeCreate(usuario) {
                if (usuario.password) {
                    usuario.password = bcrypt.hashSync(usuario.password, 10);
                }
            },
            beforeUpdate(usuario) {
                if (usuario.changed('password')) {
                    usuario.password = bcrypt.hashSync(usuario.password, 10);
                }
            },
            beforeBulkCreate(usuarios) {
                for (const usuario of usuarios) {
                    if (usuario.password) {
                        usuario.password = bcrypt.hashSync(usuario.password, 10);
                    }
                }
            },
            async afterSync() {
                const registros = await Usuario.count();
                if (registros === 0) {
                    await Usuario.bulkCreate([
                        { nombre: "Usuario 1", email: "usuario1@example.com", password: "password1" },
                        { nombre: "Usuario 2", email: "usuario2@example.com", password: "password2" },
                        { nombre: "Usuario 3", email: "usuario3@example.com", password: "password3" },
                    ]);
                }
            }
        }
    }
);