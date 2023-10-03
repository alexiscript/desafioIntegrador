import { MessagesModel } from "../db/models/Messages.model.js";

export default class MessageManager {

    // Método para agregar un nuevo mensaje
    newMsg = async ({ user, message }) => {
        try {
            // Crear un nuevo mensaje en la base de datos
            let msg = await MessagesModel.create({ user, message });
            return msg;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    // Método para obtener todos los mensajes
    getMsgs = async () => {
        try {
            // Obtener todos los mensajes desde la base de datos
            const data = await MessagesModel.find();
            return data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
