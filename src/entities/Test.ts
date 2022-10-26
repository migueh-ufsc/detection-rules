import { ITest } from 'contracts/entities/ITest';

export class Test implements ITest {
  readonly value: number;
  readonly word: string;
  readonly isItTrue: boolean;

  constructor(props: ITest) {
    this.value = props.value;
    this.word = props.word;
    this.isItTrue = props.isItTrue;
  }
}
