const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/soma_aureum', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB conectado!"))
  .catch(err => console.log("Erro na conexão: ", err));