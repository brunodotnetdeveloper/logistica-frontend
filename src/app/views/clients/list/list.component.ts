import { Component, OnInit } from '@angular/core';
import { ClientViewModel } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'birthDate', 'details'];
  clients: ClientViewModel[] = [];

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAll().subscribe(
      (data: ClientViewModel[]) => (this.clients = data),
      (error: any) => console.error('Erro ao carregar clientes', error)
    );
  }

  redirectToCreate() {
    this.router.navigate(['/clients/create']);
  }

  viewDetails(client: ClientViewModel): void {    
    this.router.navigate(['/clients/details', client.id]);
  }
}
