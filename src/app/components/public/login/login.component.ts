import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { LojistaService } from './../../../services/lojista.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: '/login.component.html',
  styleUrls: ['/login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  email: string;
  senha: string;
  mensagem: string;
  emailEnviado: boolean;
  admin: boolean;
  constructor(private authServ: AuthenticationService, private router: Router, private lojistaService:LojistaService ) { }
  
  ngOnInit() {
    
  }
  
  logar() {
    try {
      if (this.email == undefined ||
        this.senha == undefined) {
        this.mensagem = 'Usuário ou senha vazios'
        return
      }
      this.authServ.login(this.email, this.senha)
        .then((user) => {
          var uid = user.user.uid
          this.lojistaService.validaLojista(uid).subscribe(dados => {
            if(dados.exists){
              
              
              this.router.navigate(['/admin/pedidos'])
            }else{
              this.authServ.logout()
              
              Swal.fire('Oops!','Você não tem permissão para acessar esse módulo','error');
            }
          })
          
        }).catch(erro => {
          let detalhes = "";
          switch (erro.code) {
            case 'auth/user-not-found': {
              detalhes = 'Não existe usuário para o email informado';
              break;
            }
            case 'auth/invalid-email': {
              detalhes = 'Email inválido';
              break;
            }
            case 'auth/wrong-password': {
              detalhes = 'senha inválida'
              break;
            }
            default: {
              detalhes = erro.message;
              break;
            }
              
          }
          this.mensagem = `${detalhes}`
        });
      } catch (erro){
        this.mensagem = `Erro ao logar. Detalhes ${erro}`
      }

    }
  async enviaLink(){
      const { value: email } = await Swal.fire({
        title: 'Informe o email cadastrado',
        input: 'email',
        inputPlaceholder: 'email'
      })
      if (email) {
        this.authServ.resetPassword(email)
        .then(() => {
          this.emailEnviado = true;
          this.mensagem = `Email enviado para ${email}`
        }).catch(erro =>{
          this.mensagem = `Erro ao locaizar o email ${erro.message}`
        })
      }
    }
    

  }
