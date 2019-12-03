import { Injectable } from '@angular/core';
import { ServiceFirebase } from '../core/iservice-firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Lojista } from '../models/lojista.model';

@Injectable({
  providedIn: 'root'
})
export class LojistaService extends ServiceFirebase<Lojista> {

  constructor(firestore: AngularFirestore) {
    super(Lojista, firestore, 'Lojistas')
   }
}
