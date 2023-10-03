import fs from "fs";
import { ProductsModel } from "../db/models/Products.model.js";

export default class ProductManager {

    // Método para agregar un producto
    addProduct = async (productEn) => {
        const { title, description, code, price, status, stock, category, thumbnails } = productEn;

        if (title !== undefined && description !== undefined && code !== undefined && price !== undefined && stock !== undefined && category !== undefined) {
            // Validar y formatear los valores del producto
            let titleValidated = title.toString();
            let descriptionValidated = description.toString();
            let codeValidated = code.toString();
            let priceValidated = parseFloat(price);
            let statusValidated = Boolean(status ? status : true);
            let stockValidated = parseInt(stock);
            let categoryValidated = category.toString();
            let thumbnailsValidated = thumbnails;

            if (thumbnails && Array.isArray(thumbnails)) {
                for (let i = 0; i < thumbnails.length; i++) {
                    thumbnailsValidated[i] = thumbnails[i].toString();
                }
            }

            // Crear un objeto de producto formateado
            let product = {
                title: titleValidated,
                description: descriptionValidated,
                price: priceValidated,
                thumbnails: thumbnailsValidated,
                code: codeValidated,
                stock: stockValidated,
                status: statusValidated,
                category: categoryValidated
            };

            try {
                // Crear el producto en la base de datos
                await ProductsModel.create(product);
                return "Producto agregado";
            } catch (error) {
                console.log(error);
                return error;
            }
        } else {
            return "Error: Algunos campos están vacíos";
        }
    }

    // Método para obtener todos los productos
    getProducts = async () => {
        try {
            // Obtener todos los productos desde la base de datos
            const data = await ProductsModel.find();
            return data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    // Método para obtener un producto por su ID
    getProductById = async (id) => {
        try {
            // Buscar un producto por su ID en la base de datos
            let product = await ProductsModel.findById(id);
            if (product) {
                return product;
            } else {
                return { Error: "No encontrado" };
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    // Método para actualizar un producto
    updateProduct = async (id, keysObject) => {
        try {
            // Actualizar un producto en la base de datos por su ID
            const msg = await ProductsModel.findOneAndUpdate({ _id: id }, keysObject);
            return msg;
        } catch (error) {
            return error;
        }
    }

    // Método para eliminar un producto
    deleteProduct = async (id) => {
        try {
            // Eliminar un producto por su ID en la base de datos
            await ProductsModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
