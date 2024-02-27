import { atom } from 'recoil';
import { Card } from '../interfaces/interface';

export const selectedCardState = atom({
  key: "selectedCardState",
  default: {} as Card,
});