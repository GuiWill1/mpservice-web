import { NgModule } from '@angular/core';
import { AuthguardService } from './services/authguard.service';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';


const routes: Routes = [
  { path: "", redirectTo: 'admin/pedidos', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin/pedidos', loadChildren: () => import('./components/admin/pedidos/pedidos.module').then(m => m.PedidosModule), canActivate: [AuthguardService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
