import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    // TODO

    if (type === 'outcome' && !this.checkIfCanAdd(value)) {
      throw Error('No add transactions');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }

  private checkIfCanAdd(value: number): boolean {
    const { total } = this.transactionsRepository.getBalance();

    if (total < value) {
      return false;
    }

    return true;
  }
}

export default CreateTransactionService;
