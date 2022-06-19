// ESM
import Fastify from 'fastify';
import Cors from '@fastify/cors';
import Routes from './routes/index.js';

const fastify = Fastify({
  logger: true,
});

fastify.register(Routes);
fastify.register(Cors, () => (req, callback) => {
  const corsOptions = {
    origin: true,
  };
  // do not include CORS headers for requests from localhost
  if (/^localhost$/m.test(req.headers.origin)) {
    corsOptions.origin = false;
  }
  // callback expects two parameters: error and options
  callback(null, corsOptions);
});
/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
