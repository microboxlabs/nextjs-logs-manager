import { createLogs, getLogs } from "../models/Log";

class LogsController{
    static async addLogs(
        timestamp: string, 
        level: string, 
        service: string, 
        message: string 
      ) {
        if (!timestamp || !level || !service || !message) {
          throw new Error('All fields (timestamp, level, service, message) are required.');
        }
        const newLogs = await createLogs(timestamp, level, service, message);
        console.log(newLogs)
        return newLogs;
      }
    static async listLogs(){
      try{
        const logs = await getLogs();
        console.log('this is the user controller: ', logs)
        return logs;
      } catch (error) {
      console.error("Error adding user:", error);
      throw new Error("No se pudo agregar el usuario.");
    }
    }
}

export default LogsController