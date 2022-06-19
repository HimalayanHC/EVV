import { evvHandler } from '../handlers/index.js';
const routes = async (fastify, options) => {
  fastify.post('/hhc', async (request, reply) => {
    return evvHandler(request.body);
  });
};

export default routes;
