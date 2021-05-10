const cartRepository = require('./repository');
const productRepository = require('../products/repository');

exports.view = async (req, res) => {};

exports.addItem = async (req, res) => {
    const customerId = req.params.customerId;
    const payload = {
        productId: req.body.productId,
        quantity: parseInt(req.body.quantity)
    };

    if (!customerId) {
        res.status(400).json({
            success: false,
            message: 'Missing customer information'
        });
        return;
    }

    if (!payload.productId || !payload.quantity) {
        res.status(400).json({
            success: false,
            message: 'Missing product information'
        });
        return;
    }

    try {
        const productDetails = await productRepository.findById(
            payload.productId
        );

        if (!productDetails) {
            res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        let cart = await cartRepository.find(customerId);
        if (!cart) {
            const subTotal = productDetails.price * payload.quantity;
            cart = {
                customerId: customerId,
                items: [
                    {
                        productId: payload.productId,
                        quantity: payload.quantity,
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
                (item) => item.productId === payload.productId
            );
            const isItemFound = foundAtIndex !== -1;
            if (isItemFound) {
                if (payload.quantity <= 0) {
                    cart.items.splice(foundAtIndex, 1);
                } else {
                    const foundItem = cart.items[foundAtIndex];
                    foundItem.quantity += payload.quantity;
                    foundItem.subTotal =
                        foundItem.quantity * productDetails.price;
                }
            } else if (payload.quantity > 0) {
                const subTotal = productDetails.price * payload.quantity;
                cart.items.push({
                    productId: payload.productId,
                    quantity: payload.quantity,
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
            const updatedCart = await cartRepository.update(customerId, cart);
            res.status(200).json({
                success: true,
                message: 'Cart is updated successfully',
                data: updatedCart
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
