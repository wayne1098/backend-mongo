const express= require('express');
const path= require('path');
const app = express();
const productRouter = require('./app/productv1/routes');
const productRouterV2 = require('./app/productv2/routes');
// const productRouterV3 = require('./app/productv3/routes');
// const ProductRouterV4 = require("./app/productv4/routes");
require("./config/mongoose");
const logger = require ('morgan');
const port = process.env.PORT || 3003;
const cors = require('cors');



app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1', productRouter);
app.use('/api/v2', productRouterV2);
// app.use('/api/v3', productRouterV3);
// app.use('/api/v4', ProductRouterV4);
app.use((req, res, next) => {
    res.status(404);
    res.send({
        status: 'failed',
        message: 'Resource ' + req.originalUrl + ' Not Found'
    })
})

app.listen(port, () => console.log(`Server: http://localhost:${port}`));