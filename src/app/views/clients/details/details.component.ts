import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressViewModel, ClientViewModel } from '../../../models/client';
import { ClientService } from '../../../services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { EditClientModalComponent } from './edit-client-modal/edit-client-modal.component';
import { EditAddressModalComponent } from './edit-address-modal/edit-address-modal.component';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  client: ClientViewModel | null = null; // Cliente carregado
  clientId: number = 0; // ID do cliente passado pela rota

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,   
    private http: HttpClient // Necessário para a API de CEP
  ) {}

  ngOnInit(): void {
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

  // Abre o modal para editar o cliente
  openEditClientModal(client: ClientViewModel): void {
    const dialogRef = this.dialog.open(EditClientModalComponent, {
      width: '650px',
      data: { client },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadClientDetails(); // Recarrega os dados do cliente após a edição
      }
    });
  }

  // Abre o modal para editar o endereço
  openEditAddressModal(address: AddressViewModel): void {
    const dialogRef = this.dialog.open(EditAddressModalComponent, {
      width: '650px',
      data: { address },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.isAddressValid(result)) {
        this.loadClientDetails(); // Recarrega os dados do cliente após a edição
      } else {
        alert('Por favor, preencha todos os campos obrigatórios do endereço.');
      }
    });
  }

  // Valida se os campos obrigatórios do endereço estão preenchidos
  isAddressValid(address: AddressViewModel): boolean {
    return true;
    // return (
    //   address.zipCode && address.street && address.city && address.state && address.number
    // );
  }

  // Abre o modal para adicionar um novo endereço
  openAddAddressModal(): void {
    const dialogRef = this.dialog.open(EditAddressModalComponent, {
      width: '650px',
      data: {
        address: {
          complement: '',
          type: '',
          street: '',
          city: '',
          zipCode: '',
          state: '',
          number: '',
          clientId: this.clientId          
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.isAddressValid(result)) {
        this.loadClientDetails(); // Recarrega os dados do cliente após a adição
      } else {
        alert('Por favor, preencha todos os campos obrigatórios do endereço.');
      }
    });
  }

  // Remove o cliente
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
    if (this.client) {
      if (confirm('Tem certeza que deseja excluir este endereço?')) {
        this.client.addresses = this.client.addresses.filter(
          (addr) => addr !== address
        );

        // Atualiza o cliente no backend
        this.clientService.deleteAddress(this.client.id, address.id).subscribe(
          () => {
            console.log('Endereço removido com sucesso');
            this.loadClientDetails(); // Recarrega os detalhes do cliente após remoção
            this.snackBar.open('Endereço removido com sucesso!', 'Fechar', {
              duration: 3000,
            });
          },
          (error: any) => {
            console.error('Erro ao remover o endereço', error);
          }
        );
      }
    }
  }

  // Método opcional para buscar o endereço por CEP
  fetchAddressByCep(cep: string): void {
    if (cep) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe((data: any) => {
        if (!data.erro) {
          // Atualizar o modal com as informações obtidas
          const dialogRef = this.dialog.open(EditAddressModalComponent, {
            width: '400px',
            data: {
              address: {
                street: data.logradouro,
                neighborhood: data.bairro,
                city: data.localidade,
                state: data.uf,
                zipCode: cep,
                number: '', // Usuário deve preencher
                clientId: this.clientId,
              },
            },
          });
        }
      });
    }
  }
}
