import { Op } from "sequelize";
import Course from "../../infraestructure/models/courseModel.js";

class coursesRepository {
    constructor(connection) {
        this.connection = connection;
    }

    async getAllCourses() {
        try {
            const courses = await Course.findAll({
                include: [],
                order: [["nombre_curso", "ASC"]],
            });

            if (courses.length <= 0) {
                return false;
            }

            const coursesData = courses.map((course) => ({
                id_curso: course.id_curso,
                nombre_curso: course.nombre_curso,
                id_docente: course.id_docente,
                descripcion: course.descripcion,
                semestre: course.semestre,
                hora_ingreso_curso: course.hora_ingreso_curso,
            }));

            return coursesData;
        } catch (error) {
            throw error;
        }
    }

    async createCourse(dataCourse) {
        try {
            const { nombre_curso } = dataCourse;
            const courseExists = await Course.findOne({
                where: { nombre_curso: nombre_curso },
            });

            if (courseExists) { return false; }

            const course = await Course.create(dataCourse);
            return course;
        } catch (error) {
            throw error;
        }
    }

    // async getSalonById(id) {
    //     try {
    //         const salon = await Salon.findOne({
    //             where: { id_salon: id }
    //         });

    //         if (!salon) { return false; }

    //         return salon;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // async createSalon(dataSalon) {
    //     try {
    //         const { nombre_salon, latitude_salon, longitude_salon, radius_salon } = dataSalon;

    //         // Verificar si el salón ya existe
    //         const salonExist = await Salon.findOne({
    //             where: { nombre_salon: nombre_salon },
    //         });

    //         if (salonExist) {
    //             return false; // El salón ya existe, puedes manejar esto de acuerdo a tus necesidades
    //         }

    //         // Crear un nuevo salón en la base de datos
    //         const newSalon = await Salon.create({
    //             nombre_salon: nombre_salon,
    //             latitude_salon: latitude_salon,
    //             longitude_salon: longitude_salon,
    //             radius_salon: radius_salon,
    //         });

    //         return newSalon;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // async updateSalon(id_salon, dataSalon) {
    //     try {
    //         const salon = await Salon.findOne({
    //             where: { id_salon: id_salon },
    //         });

    //         const { nombre_salon, latitude_salon, longitude_salon, radius_salon } = dataSalon;

    //         if (!salon) {
    //             throw new Error('Salon no encontrado');
    //         }

    //         salon.nombre_salon = nombre_salon;
    //         salon.latitude_salon = latitude_salon;
    //         salon.longitude_salon = longitude_salon;
    //         salon.radius_salon = radius_salon;

    //         await salon.save();
    //         return salon;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}

export default coursesRepository;
