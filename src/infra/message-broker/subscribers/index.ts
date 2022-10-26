/**  Neste arquivo serão importados todos os subscribers criados e
 * será configurado para que ouçam uma determinada exchange/queue/routinKey*/

import { default as TestSubscriber } from './TestSubscriber';

export const initSubscribers = (): Promise<void>[] => {
  return [TestSubscriber.consume()];
};
