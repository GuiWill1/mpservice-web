import { Model } from '../core/model';
import { Usuario } from '../models/usuario.model';

export class Lojista extends Model implements Usuario  {
    nomeFantasia: string;
    telefone3?: string;
    //endereco:Endereco
    possuiLojaFisica: Boolean;
    categoriaPrimaria: string;
    avaliacao: number;
    qtdeAvaliacao: number;
    imagemPerfil: string;
    marketingBanner: string;
    //tema: Tema;
    tempoEntrega: number;
    taxaEntrega: number;
    estaAberto: Boolean;
    pagamentoCartao: Boolean;
    //Classe Usuario
    email: string;
    nome: string;
    usuarioAtivo: Boolean;
    dataHoraCadastro: number;
    telefone1: string;
    telefone2: string;
}
