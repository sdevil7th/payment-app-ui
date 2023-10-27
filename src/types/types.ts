export interface ICardTxnDetails {
  name: string;
  amount: number;
  currency: string;
  desc: string;
  date: string;
  category: 'unknown' | 'flight' | 'entertainment';
  txnType: 'debit' | 'credit';
  id: number;
}

export interface ICardDetails {
  name: string;
  cardNumber: string;
  validThru: string;
  cvv: string;
  type: 'visa' | 'mastercard';
  transactions: ICardTxnDetails[];
  frozen: boolean;
  cancelled: boolean;
}
