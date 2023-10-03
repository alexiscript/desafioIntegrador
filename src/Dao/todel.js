// Importa los módulos necesarios
import fs from "fs";
import { CartModel } from "../db/models/Carts.model";

export default class CartManagerDB {
    // Método para crear un carrito en la base de datos
    createCart = async (arr) => {
        try {
            let lg = arr?.length;

            // Crea un nuevo carrito en la base de datos usando el modelo CartModel
            await CartModel.create();

            if (lg > 0) {
                
            } else {
                
                return "Cart Created";
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    // Método para obtener todos los carritos
    getCarts = async () => {
        try {
            // Obtiene todos los carritos desde la base de datos
            const data = await CartModel.find();
            return data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    // Método para obtener un carrito por su ID
    getCartById = async (id) => {
        try {
            // Busca un carrito por su ID y también carga los productos relacionados
            let cart = await CartModel.findById(id).populate("products");
            return cart;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    // Método para actualizar un carrito
    updateCart = async (cid, arr) => {
        // Obtiene todos los carritos
        let carts = await this.getCarts();

        if (Array.isArray(carts)) {
            // Filtra el carrito correspondiente al ID especificado
            let response = carts.filter((el) => el.id == cid);

            if (response.length > 0) {
                // Actualiza los productos del carrito
                response[0].products = [...arr];
                let toModify = response[0];

                let toWrite = carts.filter((el) => el.id !== cid);
                toWrite.push(toModify);
                toWrite.sort((a, b) => {
                    if (a.id < b.id) {
                        return -1;
                    }
                    if (a.id > b.id) {
                        return 1;
                    }
                    return 0;
                });

                try {
                    // Escribe los carritos actualizados en un archivo 
                    await fs.promises.writeFile(this.path, JSON.stringify(toWrite));
                    return toModify;
                } catch (error) {
                    return error;
                }
            } else {
                return "No se encontraron coincidencias con el ID del carrito";
            }
        } else {
            return "Error db";
        }
    }
}




