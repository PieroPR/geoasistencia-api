import CoursesRepository from "../../domain/repositories/coursesRepository.js";
import CoursesService from "../../application/services/coursesService.js";
import connection from "../../infraestructure/config/db.js";

const coursesRepository = new CoursesRepository(connection);
const coursesService = new CoursesService(coursesRepository);

const getAllCourses = async (req, res) => {
    try {
        const courses = await coursesService.getAllCourses();

        if (!courses || courses.length <= 0) {
            res.status(404).json({ error: "No se encontraron cursos" });
        } else {
            res.json(courses);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Ocurrió un error en el servidor (Controller - getAllCourses)",
        });
    }
};

// const getSalonById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const salons = await coursesService.getSalonById(id);

//         if (salons) {
//             res.json(salons);
//         } else {
//             res.status(404).json({ error: "Salon no encontrado por ID" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             error: "Ocurrió un error en el servidor (Controller - getSalonById)",
//         });
//     }
// };


const createCourse = async (req, res) => {
    try {
        const dataCourse = req.body;
        const newCourse = await coursesService.createCourse(dataCourse);

        if (!newCourse) {
            res.status(400).json({ error: "El curso ya está registrado" });
        } else {
            res.json({ message: "Curso registrado exitosamente" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error en el servidor (controller - createCourse)" });
    }
};

// const updateSalon = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const dataSalon = req.body;

//         const updatedSalon = await salonsService.updateSalon(id, dataSalon);

//         // Si se actualizó correctamente
//         if (updatedSalon) {
//             res.json({ message: "Salon actualizado exitosamente" });
//         } else {
//             res.status(400).json({ error: "No se pudo actualizar, por favor revise sus datos e intente nuevamente." });
//         }
//     } catch (error) {
//         console.error("Error en el servidor al actualizar el salon (controller - updateSalon)");
//         res.status(500).json({ error: error.message });
//     }
// };

export { getAllCourses, createCourse};
// export { getAllSalons, getSalonById, createSalon, updateSalon };