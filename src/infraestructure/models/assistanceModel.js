import Sequelize from "sequelize";
import Docent from './docentModel.js';
import Schedule from './scheduleModel.js';
import connection from "../config/db.js";

const Assistance = connection.define(
    "asistencias",
    {
        id_asistencia: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_docente: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Docent,
                key: 'id_docente'
            }
        },
        id_horario: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Schedule,
                key: 'id_horario'
            }
        },
        latitude_asistencia: {
            type: Sequelize.DECIMAL(10, 7),
            allowNull: true,
        },
        longitude_asistencia: {
            type: Sequelize.DECIMAL(11, 7),
            allowNull: true,
        },
        hora_registro_asistencia: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    },
    {
        tableName: "asistencias",
    }
);

Assistance.belongsTo(Docent, { foreignKey: 'id_docente', targetKey: 'id_docente' });
Assistance.belongsTo(Schedule, { foreignKey: 'id_horario', targetKey: 'id_horario' });

export default Assistance;
