const cartRepository = require('./repository');
const productRepository = require('../products/repository');
const jwtService = require('../../services/authentication/jwt-authenticate');

exports.findById = async (customerId) => {
    const cart = await cartRepository.find(customerId);
    return cart;
};

exports.empty = async (customerId) => {
    const cart = await cartRepository.update(customerId, {
        customerId: customerId,
        items: [],
        totalPrice: 0
    });
    return cart;
};

exports.view = async (req, res) => {
    try {
        const credential = await jwtService.getCredential(req);
        const userId = credential.id;
        let cart = await this.findById(userId);
        if (!cart) {
            cart = await cartRepository.create({
                customerId: userId,
                items: [],
                totalPrice: 0
            });
        }
        res.status(200).json({
            success: true,
            message: 'Cart is retrieved',
            data: cart
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.addItem = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    if (!userId) {
        res.status(400).json({
            success: false,
            message: 'Missing customer information'
        });
        return;
    }

    if (productId === undefined || quantity === undefined) {
        res.status(400).json({
            success: false,
            message: 'Missing product information'
        });
        return;
    }
    let productDetails;
    try {
        productDetails = await productRepository.findById(productId);
    } catch (err) {
        res.status(404).json({
            success: false,
            message: 'Product not found'
        });
        return;
    }
    try {
        let cart = await cartRepository.find(userId);
        if (!cart) {
            const subTotal = productDetails.price * quantity;
            cart = {
                customerId: userId,
                items: [
                    {
                        productId: productId,
                        quantity: quantity,
                        subTotal: subTotal
                    }
                ],
                totalPrice: subTotal
            };
            const newCart = await cartRepository.create(cart);
            res.status(200).json({
                success: true,
                data: newCart
            });
        } else {
            const foundAtIndex = cart.items.findIndex(
                (item) => item.productId === productId
            );
            const isItemFound = foundAtIndex !== -1;
            if (isItemFound) {
                if (quantity <= 0) {
                    cart.items.splice(foundAtIndex, 1);
                } else {
                    const foundItem = cart.items[foundAtIndex];
                    foundItem.quantity += quantity;
                    foundItem.subTotal =
                        foundItem.quantity * productDetails.price;
                }
            } else if (quantity > 0) {
                const subTotal = productDetails.price * quantity;
                cart.items.push({
                    productId: productId,
                    quantity: quantity,
                    subTotal: subTotal
                });
            }

            if (cart.items.length === 0) {
                cart.totalPrice = 0;
            } else {
                cart.totalPrice = cart.items
                    .map((item) => item.subTotal)
                    .reduce((acc, val) => acc + val);
            }
            await cartRepository.update(userId, cart);
            res.status(200).json({
                success: true,
                message: 'Cart is updated successfully',
                data: cart
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
