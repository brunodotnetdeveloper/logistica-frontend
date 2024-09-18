import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './views/clients/list/list.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { FormComponent } from './views/clients/form/form.component';
import { DetailsComponent } from './views/clients/details/details.component';

const routes: Routes = [
  // Redireciona a rota vazia para o dashboard
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
  // Rota para o dashboard principal
  { path: 'dashboard', component: DashboardComponent },
  
  // Rotas para clientes
  { path: 'clients', component: ListComponent },
  { path: 'clients/create', component: FormComponent },
  
  // Rota para detalhes de um cliente específico usando o parâmetro id
  { path: 'clients/details/:id', component: DetailsComponent },

  // Caso a rota não seja encontrada, pode-se redirecionar para uma página de erro ou dashboard
  { path: '**', redirectTo: 'dashboard' }  // Redireciona para o dashboard se a rota não for encontrada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
