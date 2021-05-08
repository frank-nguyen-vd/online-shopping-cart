const productRepository = require('./repository');

exports.create = async (req, res) => {
    const payload = {
        name: req.body.name,
        price: parseFloat(req.body.price)
    };

    if (!payload.name || !payload.price) {
        res.status(200).json({
            success: false,
            message: 'Missing product information'
        });
    } else {
        try {
            const product = await productRepository.create({ ...payload });

            res.status(200).json({
                success: true,
                data: product
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: err,
                success: false
            });
        }
    }
};

exports.findAll = async (req, res) => {
    try {
        const products = await productRepository.findAll();
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err
        });
    }
};

exports.findById = async (req, res) => {
    const id = req.params.id;
    const productDetails = await productRepository.findById(id);

    if (!productDetails) {
        res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    } else {
        res.status(200).json({
            success: true,
            data: productDetails
        });
    }
};

exports.updateById = async (req, res) => {
    const id = req.params.id;

    const payload = {
        name: req.body.name,
        price: parseFloat(req.body.price)
    };

    if (!payload.name || !payload.price) {
        res.status(200).json({
            success: false,
            message: 'Missing product information'
        });
    } else {
        const productDetails = await productRepository.updateById(id, payload);

        if (!productDetails) {
            res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        } else {
            res.status(200).json({
                success: true,
                data: productDetails
            });
        }
    }
};

exports.removeProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const productDetails = await productRepository.removeById(id);
        res.status(200).json({
            success: true,
            data: productDetails
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        });
    }
};
