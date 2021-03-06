const jwtService = require('../../services/authentication/jwt-authenticate');
const authService = require('../../services/authorization/casbin-authorization');

const productRepository = require('./repository');
exports.create = async (req, res) => {
    const { role } = await jwtService.getCredential(req);
    const allowed = await authService.authorize(role, 'products', 'create');
    if (!allowed) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
        return;
    }
    const payload = {
        name: req.body.name,
        price: parseFloat(req.body.price)
    };

    if (!payload.name || !payload.price) {
        res.status(400).json({
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

    const { role } = await jwtService.getCredential(req);
    const allowed = await authService.authorize(role, 'products', 'update');
    if (!allowed) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
        return;
    }

    const payload = {
        name: req.body.name,
        price: parseFloat(req.body.price)
    };

    if (!payload.name || !payload.price) {
        res.status(400).json({
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

exports.removeById = async (req, res) => {
    const { role } = await jwtService.getCredential(req);
    const allowed = await authService.authorize(role, 'products', 'delete');
    if (!allowed) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
        return;
    }
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
