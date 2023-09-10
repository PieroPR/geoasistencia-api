import SchedulesRepository from "../../domain/repositories/schedulesRepository.js";
import SchedulesService from "../../application/services/schedulesService.js";
import connection from "../../infraestructure/config/db.js";

const schedulesRepository = new SchedulesRepository(connection);
const schedulesService = new SchedulesService(schedulesRepository);

const getAllSchedules = async (req, res) => {
    try {
        const schedules = await schedulesService.getAllSchedules();

        if (!schedules || schedules.length <= 0) {
            res.status(404).json({ error: "No se encontraron horarios" });
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

const getScheduleById = async (req, res) => {
    try {
        const { id } = req.params;
        const schedules = await schedulesService.getScheduleById(id);

        if (schedules) {
            res.json(schedules);
        } else {
            res.status(404).json({ error: "Horario no encontrado por ID" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Ocurrió un error en el servidor (Controller - getScheduleById)",
        });
    }
};

const createSchedule = async (req, res) => {
    try {
        const dataSchedule = req.body;
        const newSchedule = await schedulesService.createSchedule(dataSchedule);

        if (!newSchedule) {
            res.status(400).json({ error: "El horario ya existe" });
        } else {
            res.json({ message: "Horario registrado exitosamente" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ocurrió un error en el servidor (controller - createSchedule)" });
    }
};

const updateSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const dataSchedule = req.body;

        const updatedSchedule = await schedulesService.updateSchedule(id, dataSchedule);

        // Si se actualizó correctamente
        if (updatedSchedule) {
            res.json({ message: "Horario actualizado exitosamente" });
        } else {
            res.status(400).json({ error: "No se pudo actualizar, por favor revise sus datos e intente nuevamente." });
        }
    } catch (error) {
        console.error("Error en el servidor al actualizar el horario (controller - updateSchedule)");
        res.status(500).json({ error: error.message });
    }
};


export { getAllSchedules, getScheduleById, createSchedule, updateSchedule };