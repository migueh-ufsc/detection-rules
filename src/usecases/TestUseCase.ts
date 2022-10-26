import { ITest } from 'contracts/entities/ITest';
import { BaseUseCase } from 'contracts/usecases/BaseUseCase';
import { Test } from 'entities/Test';
import { TestService } from 'services/TestService';

export class TestUseCase implements BaseUseCase {
  constructor(private readonly testService: TestService) {}

  async execute(input: ITest): Promise<void> {
    console.log('Printing message', input);

    const entity = new Test(input);

    const createdObjs = await Promise.all([
      this.testService.create(entity),
      this.testService.create(entity),
      this.testService.create(entity),
    ]);

    console.log(createdObjs);

    console.log(`Deletando com id ${createdObjs[0]._id}`);
    await this.testService.delete({
      _id: createdObjs[0]._id,
    });

    console.log(`Atualizando com id ${createdObjs[1]._id}`);
    await this.testService.update(
      {
        _id: createdObjs[1]._id,
      },
      {
        $set: { isItTrue: false, value: 1000000 },
      },
    );

    const returned = await this.testService.find({ value: 654 });
    console.log(returned);
  }
}
