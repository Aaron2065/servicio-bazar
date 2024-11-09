// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Cargar productos desde el archivo JSON
const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'), 'utf-8'));

// Endpoint: Buscar productos
app.get('/api/items', (req, res) => {
    const query = req.query.q?.toLowerCase();
    if (!query) return res.json([]);
    
    const results = products.filter(product =>
        product.title.toLowerCase().includes(query)
    );
    res.json(results);
});

// Endpoint: Detalle de un producto
app.get('/api/items/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    res.json(product);
});

// Endpoint: Registrar una compra
app.post('/api/addSale', (req, res) => {
    const { productId } = req.body;
    const product = products.find(p => p.id === productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    // Aquí simulamos el registro de la compra
    // En una base de datos real, guardaríamos la compra aquí
    res.json({ success: true });
});

// Endpoint: Obtener las compras registradas
app.get('/api/sales', (req, res) => {
    // Retornaremos una lista de compras ficticia
    const sales = [
        { id: 1, productId: 1, date: new Date().toISOString(), quantity: 1 },
        { id: 2, productId: 2, date: new Date().toISOString(), quantity: 2 },
    ];
    res.json(sales);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
