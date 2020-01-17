const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')
const http = require('http')
const {setupWebsocket} = require('./websocket')

const app = express();
const server = http.Server(app);
setupWebsocket(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-k9a9f.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());

app.use(routes);

//Métodos http: get, post, put, delete

// Tipos de parâmetros:
// Query params: req.query(Filtros, ordenacao, paginacao, ...) para acessar os parametros listados request.query

// Route params: (atualizacao etc) para acessar é request.params(identificar um recurso na alteração ou remoção)
// Body

server.listen(3333)