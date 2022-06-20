import { Router } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';

import { sendEmail } from '../helpers/mod.ts';

const router = new Router();
router.post('/hhc', oakCors(), async (context) => {
  const payload = await context.request.body().value;
  await sendEmail(payload);
  context.response.body = { message: 'success' };
  context.response.status = 200;
});
router.get('/', (context) => {
  context.response.body = 'Muhaaaaaaaaa!';
});
export default router;
