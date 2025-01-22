const Customer = require('../models/Customer');

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) return res.status(404).json({ error: 'Customer not found' });
        res.json(customer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCustomer = async (req, res) => {
    try {
        const { name, email, phone, company } = req.body;
        const customer = await Customer.create({ name, email, phone, company });
        res.status(201).json(customer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) return res.status(404).json({ error: 'Customer not found' });
        await customer.update(req.body);
        res.json(customer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) return res.status(404).json({ error: 'Customer not found' });
        await customer.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
