const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config({ path: '../.env.local' });
const productRouter = require('./routes/product');
const port = process.env.BACKEND_PORT

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

const app = express()

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/products',productRouter)


app.get('/', (req, res) => {
    res.send('API is running...');
})

app.listen(port, () => {
    console.log(`Server running on ${process.env.NEXT_PUBLIC_BACKEND_URL}`);
});


