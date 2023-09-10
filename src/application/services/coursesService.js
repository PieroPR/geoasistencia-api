class coursesService {
    constructor(coursesRepository) {
        this.coursesRepository = coursesRepository;
    }

    async getAllCourses() {
        try {
            const courses = await this.coursesRepository.getAllCourses();
            return courses;
        } catch (error) {
            throw new Error("Error al obtener los cursos: " + error.message);
        }
    }

    // async getSalonById(id) {
    //     try {
    //         const salon = await this.salonsRepository.getSalonById(id);
    //         return salon;
    //     } catch (error) {
    //         throw new Error("Error al obtener el salon por ID: " + error.message);
    //     }
    // }

    async createCourse(dataCourse) {
        try {
            const course = await this.coursesRepository.createCourse(dataCourse);
            return course;
        } catch (error) {
            throw new Error("(SERVICE - createCourse) Error al crear el curso: " + error.message);
        }
    }

    // async updateSalon(salonId, dataSalon) {
    //     try {
    //         return await this.salonsRepository.updateSalon(salonId, dataSalon);
    //     } catch (error) {
    //         console.error("(SERVICE - updateSalon) Error al actualizar el salon");
    //         throw error;
    //     }
    // }

}

export default coursesService;