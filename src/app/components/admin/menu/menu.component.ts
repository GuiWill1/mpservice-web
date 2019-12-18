import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Lojista } from './../../../models/lojista.model';
import { LojistaService } from './../../../services/lojista.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],

})
export class MenuComponent implements OnInit {

  user: Observable<firebase.User>;
  public status: Boolean = null
  uid: string;
  lojista$: Observable<Lojista>;
  //public admin: boolean = null;

  constructor(private authServ: AuthenticationService, private router: Router, private lojistaService: LojistaService) { }

  ngOnInit() {

    this.currentUser()

  }
  async currentUser() {
    this.user = this.authServ.authUser();
    await this.user
      .subscribe(data => {
        if (data) {
          this.uid = data.uid
          this.lojista$ = this.lojistaService.get(this.uid)
          this.lojista$.subscribe(dados => this.status = dados.estaAberto)
        } else {
          return
        }

      })
  }
  abrirFecharLoja() {

    if (this.uid) {
      if (this.lojista$) {
        this.lojista$.subscribe(dados => {
          if (this.status) {
            this.lojistaService.abrirFecharLoja(this.uid).update({
              "estaAberto": false
            }).then(() => {
              this.status = false
              dados.estaAberto = false
            })
          } else {
            this.lojistaService.abrirFecharLoja(this.uid).update({
              "estaAberto": true
            }).then(() => {
              this.status = true
              dados.estaAberto = true
            });
          }
        })
      }


    } else {
      return
    }

  }
  sair() {
    this.authServ.logout().then(() => this.router.navigate(['/']));
  }
}
