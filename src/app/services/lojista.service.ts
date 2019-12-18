import { Injectable } from '@angular/core';
import { ServiceFirebase } from '../core/iservice-firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Lojista } from '../models/lojista.model';
import { Observable,} from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class LojistaService extends ServiceFirebase<Lojista> {

  constructor(firestore: AngularFirestore) {
    super(Lojista, firestore, 'Lojista')
   }
  
    
  
    validaLojista(uid: string){
      return this.firestore.collection<Lojista>('Lojista').doc(uid).get()
      
    }
    abrirFecharLoja(uid: string){

      return this.firestore.collection<Lojista>('Lojista').doc(uid)
      
    }
    docToClass(snapshotDoc):Lojista{
      let obj = {
          id: snapshotDoc.id ,
          ...(snapshotDoc.data() as Lojista)
      }
      let typed = plainToClass(Lojista, obj)
      return typed;
  }
}
