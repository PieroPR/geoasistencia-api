import Sequelize from "sequelize";
import Docent from './docentModel.js';
import Salon from './salonModel.js';
import connection from "../config/db.js";

const Course = connection.define(
    "cursos",
    {
        id_curso: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_curso: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        id_docente: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Docent,
                key: 'id_docente'
            }
        },
        descripcion: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        semestre: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        hora_ingreso_curso: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "cursos",
    }
);


Course.belongsTo(Docent, { foreignKey: 'id_docente', targetKey: 'id_docente' });

export default Course;
