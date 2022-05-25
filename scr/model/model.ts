
import { DataTypes, Model, Optional } from 'sequelize'

interface wallet {
  id: number;
  income: number;
  expenses: number;
}

export interface WalletInput extends Optional<wallet, 'id' > {}
export interface WalletOuput extends Required<wallet> {}