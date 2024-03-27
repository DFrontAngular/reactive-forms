export interface Iban {
  valid: boolean;
  messages: string[];
  iban: string;
  bankData: BankData;
  checkResults: CheckResults;
}

export interface BankData {
  bankCode: string;
  name: string;
  zip: string;
  city: string;
  bic: string;
}

export interface CheckResults {
  bankCode: boolean;
}
