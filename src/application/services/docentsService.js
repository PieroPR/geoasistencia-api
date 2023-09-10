class docentsService {
  constructor(docentsRepository) {
    this.docentsRepository = docentsRepository;
  }

  async authenticateDocent(email, password) {
    try {
      return await this.docentsRepository.authenticateDocent(email, password);
    } catch (error) {
      throw new Error("(SERVICE - authenticateDocent) Error al autenticar el docente: " + error.message);
    }
  }

  async getAllDocents() {
    try {
      const docents = await this.docentsRepository.getAllDocents();
      return docents;
    } catch (error) {
      throw new Error("Error al obtener los docentes: " + error.message);
    }
  }

  async getDocentById(id) {
    try {
      const docent = await this.docentsRepository.getDocentById(id);
      return docent;
    } catch (error) {
      throw new Error("Error al obtener el docente por ID: " + error.message);
    }
  }

  async getDocentsGeneral(search) {
    try {
      const docents = await this.docentsRepository.getDocentsGeneral(search);
      return docents;
    } catch (error) {
      throw error;
    }
  }

  async createDocent(dataDocent) {
    try {
      const docent = await this.docentsRepository.createDocent(
        dataDocent
      );
      return docent;
    } catch (error) {
      throw new Error(
        "(SERVICE - createDocent) Error al crear el docente: " +
        error.message
      );
    }
  }

  async updateDocent(docentId, dataDocent) {
    try {
      return await this.docentsRepository.updateDocent(docentId, dataDocent);
    } catch (error) {
      console.error("(SERVICE - updateDocent) Error al actualizar el docente");
      throw error;
    }
  }
}

export default docentsService;
