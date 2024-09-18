import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressViewModel, ClientViewModel } from '../../../models/client';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  client: ClientViewModel | null = null; // Cliente carregado
  clientId: number = 0; // ID do cliente passado pela rota

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    // Captura o ID da rota
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.clientId) {
      this.loadClientDetails();
    }
  }

  // Método para carregar os detalhes do cliente
  loadClientDetails(): void {
    this.clientService.getById(this.clientId).subscribe(
      (clientViewModel: ClientViewModel) => {
        this.client = clientViewModel; 
      },
      (error: any) => {
        console.error('Erro ao carregar os detalhes do cliente', error);
        this.router.navigate(['/clients']);
      }
    );
  }

  removeClient(): void {
    if (this.client) {
      this.clientService.delete(this.client.id).subscribe(
        () => {
          this.router.navigate(['/clients']);
        },
        (error: any) => {
          console.error('Erro ao remover o cliente', error);
        }
      );
    }
  }

  // Método para remover um endereço
  removeAddress(address: AddressViewModel): void {
    if (this.client) { // Verifica se client não é nulo
      if (confirm('Tem certeza que deseja excluir este endereço?')) {
        // Filtra o array de endereços para remover o endereço selecionado
        this.client.addresses = this.client.addresses.filter(addr => addr !== address);

        // Atualiza o cliente no backend
        this.clientService.deleteAddress(this.client.id, address.id).subscribe(
          () => {
            console.log('Endereço removido com sucesso');
          },
          (error: any) => {
            console.error('Erro ao remover o endereço', error);
          }
        );
      }
    } else {
      console.error('Cliente não encontrado.');
    }
  }
}
