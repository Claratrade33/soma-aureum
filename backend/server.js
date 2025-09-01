import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config';
import aportRoutes from './routes/aport.routes';
import errorHandler from './middlewares/errorHandler';
import connectDB from './db';

const app = express();

// Conexão ao banco
connectDB(config.mongoUri);

// Middlewares globais
app.use(helmet());
app.use(cors({ origin: config.corsOrigins }));
app.use(express.json());
app.use(morgan('dev'));

// Rotas
app.use('/api/aportes', aportRoutes);

// Tratamento central de erros
app.use(errorHandler);

// Inicialização
app.listen(config.port, () =>
  console.log(`Server running on port ${config.port}`)
);
