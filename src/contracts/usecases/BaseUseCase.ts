export interface BaseUseCase {
  execute: (input: any) => Promise<any>;
}
