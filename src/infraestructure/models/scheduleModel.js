import Sequelize from "sequelize";
import Course from './courseModel.js';
import Salon from './salonModel.js';
import connection from "../config/db.js";

const Schedule = connection.define(
    "horarios",
    {
        id_horario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_curso: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Course,
                key: 'id_curso'
            }
        },
        id_salon: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Salon,
                key: 'id_salon'
            }
        },
        hora: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        minuto: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "horarios",
    }
);

Schedule.belongsTo(Course, { foreignKey: 'id_curso', targetKey: 'id_curso' });
Schedule.belongsTo(Salon, { foreignKey: 'id_salon', targetKey: 'id_salon' });

export default Schedule;
