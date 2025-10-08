export type Transaction = {
  id: number;
  title: string;
  details: string | null;
  amount: number;
  date: string;
  account_id: number | null;
};
