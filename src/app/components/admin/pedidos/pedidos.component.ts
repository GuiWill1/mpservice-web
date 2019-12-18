import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import Swal from 'sweetalert2';
import { async } from 'q';
import { Pedido } from './../../../models/pedido.model';
import { PedidoService } from './../../../services/pedido.service' 
import { Observable } from 'rxjs';
import { Lojista } from './../../../models/lojista.model';
import { LojistaService } from './../../../services/lojista.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PedidosComponent implements OnInit {

  pedidosNovos$: Observable<Pedido[]>;
  pedidosAndamento$: Observable<Pedido[]>
  lojista$: Observable<Lojista>;
  user: Observable<firebase.User>;
  uid: string;

  constructor(private authServ: AuthenticationService, private pedidoService:PedidoService,private lojistaService: LojistaService) { }

  ngOnInit() {
    //setTimeout( () => { this.playAudio()}, 4000 );
    
    this.currentUser()
    
   
 }
 async currentUser(){
    this.user = this.authServ.authUser();
    await  this.user
    .subscribe(data =>{
      if(data){
        this.uid = data.uid
        this.lojista$ = this.lojistaService.get(this.uid)
        this.pedidosAndamento$ = this.pedidoService.getPedidosAndamento(this.uid)
        this.pedidosNovos$ = this.pedidoService.getPedidosNovos(this.uid)
      }else{
        return
      }
     
      this.pedidosNovos$.forEach(doc => {
        for(var document of doc){
          if(document.status==="AGUARDANDO"){
            //this.playAudio()
            break
          }
        }
       /* doc.forEach(doc=>{
          if(doc.status==="AGUARDANDO"){
            this.playAudio()
           
          }
          
        })*/
      });
     
      
    })
  }
  aprovarPedido(){

  }
  playAudio(){
    let audio = new Audio();
    audio.src = '../../../assets/audio/audio1.wav'
    audio.load();
    audio.play();
    audio.loop = true;
    audio.muted = false
    
    Swal.fire({
      title: 'Você tem um pedido!',
      
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'recusar',
      confirmButtonText: 'Aceitar'
    }).then((result) => {
      if (result.value) {
       audio.muted = true
        audio.pause()
        
        Swal.fire(
          'Pedido aceito!',
          '',
          'success'
        )
      }
    })
  }
  
}
