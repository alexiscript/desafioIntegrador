import fs from "fs";
import { ProductsModel } from "../db/models/Products.model.js";
import { CartModel } from "../db/models/Carts.model.js";

export default class CartManagerDB {

    // Método para crear un carrito
    createCart = async (arr) => {
        let lg = arr?.length;
        let cart;
        let prod;

        if (lg > 0) {
            // Crear un carrito vacío
            cart = await CartModel.create({ products: [] });

            // Recorrer los elementos del arreglo y agregarlos al carrito
            for (let index = 0; index < arr.length; index++) {
                const element = arr[index];
                prod = await ProductsModel.findById(element);

                // Si se encuentra el producto, agregarlo al carrito
                if (prod) {
                    cart.products.push({ item: prod._id, qty: prod.qty });
                }
            }
            await cart.save();
        } else {
            // Si no hay elementos en el arreglo, crear un carrito vacío
            cart = await CartModel.create({ products: [] });
        }
        return cart;
    }

    // Método para obtener todos los carritos
    getCarts = async () => {
        const data = await CartModel.find().populate("products.item");
        return data;
    }

    // Método para obtener un carrito por su ID
    getCartById = async (id) => {
        let cart = await CartModel.findById(id).populate("products.item");
        return cart;
    }

    // Método para actualizar un carrito agregando un producto
    updateCart = async (cid, pid) => {
        let cart = await this.getCartById(cid);
        let pro = await ProductsModel.findById(pid);

        // Si no se encuentra el producto o el carrito, lanzar un error
        if (!pro || !cart) {
            throw Error("No se encontraron coincidencias con el ID del carrito");
        }

        // Agregar el producto al carrito
        cart.products.push({
            item: pro._id
        });

        await cart.save();
        return cart;
    }
}
