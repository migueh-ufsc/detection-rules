import { default as Database } from 'infra/database/Connection';
import { default as Broker } from 'infra/message-broker/Manager';
import { default as Server } from 'infra/server/Server';
import { TestPublisher } from './infra/message-broker/publishers/TestPublisher';

(async () => {
  Promise.all([Database.init(), Broker.init(), Server.init()]).then(
    async () => {
      const test = new TestPublisher();
      test.publish(
        JSON.stringify({
          word: 'mensgaem enviada',
          isItTrue: false,
          value: 654,
        }),
      );
    },
  );
})();
