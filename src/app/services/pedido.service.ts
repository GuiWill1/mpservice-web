import { Injectable } from '@angular/core';
import { ServiceFirebase } from '../core/iservice-firebase.service';
import { Pedido }  from '../models/pedido.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends ServiceFirebase<Pedido> {

  constructor(firestore: AngularFirestore) { 
    super(Pedido, firestore, 'Pedido')
  }
  getPedidosAndamento(uid: string) {
    return this.firestore.collection<Pedido>('Pedido', ref =>
      ref.where('uidLojista', '==', uid).where('status','==','EM_ANDAMENTO')
    ).valueChanges()
  }
  getPedidosNovos(uid: string) {
    return this.firestore.collection<Pedido>('Pedido', ref =>
      ref.where('uidLojista', '==', uid).where('status','==','AGUARDANDO')
    ).valueChanges()
  }
}
