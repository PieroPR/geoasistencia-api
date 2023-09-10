import Sequelize from "sequelize";
import connection from "../config/db.js";

const Salon = connection.define(
    "salons",
    {
        id_salon: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_salon: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        latitude_salon: {
            type: Sequelize.DECIMAL(10, 7),
            allowNull: true,
        },
        longitude_salon: {
            type: Sequelize.DECIMAL(11, 7),
            allowNull: true,
        },
        radius_salon: {
            type: Sequelize.DOUBLE(8, 2),
            allowNull: true,
        },
    },
    {
        tableName: "salons",
    }
);

export default Salon;
