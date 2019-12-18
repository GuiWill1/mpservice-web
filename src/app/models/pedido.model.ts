import { Model } from '../core/model';

export class Pedido extends Model {
    nome: string;
    status: string;
    preco: number;
    aprovado: boolean;
}