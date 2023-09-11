import AssitancesRepository from "../../domain/repositories/assistancesRepository.js";
import AssitancesService from "../../application/services/assistancesService.js";
import connection from "../../infraestructure/config/db.js";

const assistancesRepository = new AssitancesRepository(connection);
const assistancesService = new AssitancesService(assistancesRepository);

const getAllAssistances = async (req, res) => {
    try {
        const assistances = await assistancesService.getAllAssistances();

        if (!assistances || assistances.length <= 0) {
            res.status(404).json({ error: "No se encontraron asistencias" });
        } else {
            res.json(schedules);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Ocurrió un error en el servidor (Controller - getAllSchedules)",
        });
    }
};

const createAssistance = async (req, res) => {
    try {
        const dataAssistance = req.body;
        const newAssistance = await assistancesService.createAssistance(dataAssistance);

        console.log("dssf: " + newAssistance);

        switch (newAssistance) {
            case 1:
                res.status(400).json({ error: "Registro inválido: antes de la hora de inicio o después de la tolerancia." });
                break;
            case 2:
                res.status(400).json({ error: "Registro inválido: Fuera del rango de 10 metros." });
                break;
            case 3:
                res.json({ message: "Asistencia registrada exitosamente." });
                break;
            default:
                res.status(400).json({ error: "Error desconocido!" });
                break;
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error en el servidor (controller - createAssistance)" });
    }
};


export { getAllAssistances, createAssistance };