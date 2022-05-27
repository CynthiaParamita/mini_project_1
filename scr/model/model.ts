
import { DataTypes, Model, Optional } from 'sequelize'

interface wallet {
  id: number;
  income: number;
  expenses: number;
}

interface user{
  id: number;
  full_name: string;
  email: string;
  password: string;
}

export interface WalletInput extends Optional<wallet, 'id' > {}
export interface WalletOuput extends Required<wallet> {}
export interface UserInput extends Optional<user, 'id'>{}
export interface UserOutput extends Required<user>{}