import moment from 'moment';
import { ICardDetails } from 'src/types/types';

function generateRandom16DigitNumber() {
  const prefix = '4101';
  let randomNumber = prefix;
  let lastDigit = parseInt(prefix[prefix.length - 1]);
  let count = 0;
  while (randomNumber.length < 16) {
    let digit = Math.floor(Math.random() * 10);
    if (digit !== lastDigit) {
      randomNumber += digit;
      lastDigit = digit;
      count = 0;
    } else {
      count++;
      if (count === 2) {
        digit === 9 ? (digit = 0) : digit++;
        randomNumber += digit;
        lastDigit = digit;
        count = 0;
      }
    }
  }
  return randomNumber;
}

function generateCVV() {
  return (Math.floor(Math.random() * 900) + 99).toString();
}

export const generateRandomCardDetails = (name: string) => {
  const currentDate = new Date();
  const validThru = new Date(
    currentDate.getFullYear() + 5,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const newCardDetails: ICardDetails = {
    name: name,
    cardNumber: generateRandom16DigitNumber(),
    cvv: generateCVV(),
    validThru: moment(validThru).format('DD MMM YYYY'),
    type: 'visa',
    transactions: [],
    frozen: false,
    cancelled: false,
  };
  return newCardDetails;
};

export const DUMMY_NAME = 'dummyCardAddNew';
