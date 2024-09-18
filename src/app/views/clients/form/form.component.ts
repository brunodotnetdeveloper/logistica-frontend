import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from '../../../services/client.service'; // Ajuste o caminho conforme necessário
import { ClientViewModel, CreateClientViewModel } from '../../../models/client'; // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-client-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  client: CreateClientViewModel = {
    name: '',
    gender: '',
    birthDate: new Date(),
    addresses: [],
  };
  selectedGender: string | undefined;
  clientId: number = 0;
  genders = [
    { value: 'MASCULINO', viewValue: 'Masculino' },
    { value: 'FEMININO', viewValue: 'Feminino' },
  ];
  statesBrazil = [
    { sail: 'AC', name: 'Acre' },
    { sail: 'AL', name: 'Alagoas' },
    { sail: 'AP', name: 'Amapá' },
    { sail: 'AM', name: 'Amazonas' },
    { sail: 'BA', name: 'Bahia' },
    { sail: 'CE', name: 'Ceará' },
    { sail: 'DF', name: 'Distrito Federal' },
    { sail: 'ES', name: 'Espírito Santo' },
    { sail: 'GO', name: 'Goiás' },
    { sail: 'MA', name: 'Maranhão' },
    { sail: 'MT', name: 'Mato Grosso' },
    { sail: 'MS', name: 'Mato Grosso do Sul' },
    { sail: 'MG', name: 'Minas Gerais' },
    { sail: 'PA', name: 'Pará' },
    { sail: 'PB', name: 'Paraíba' },
    { sail: 'PR', name: 'Paraná' },
    { sail: 'PE', name: 'Pernambuco' },
    { sail: 'PI', name: 'Piauí' },
    { sail: 'RJ', name: 'Rio de Janeiro' },
    { sail: 'RN', name: 'Rio Grande do Norte' },
    { sail: 'RS', name: 'Rio Grande do Sul' },
    { sail: 'RO', name: 'Rondônia' },
    { sail: 'RR', name: 'Roraima' },
    { sail: 'SC', name: 'Santa Catarina' },
    { sail: 'SP', name: 'São Paulo' },
    { sail: 'SE', name: 'Sergipe' },
    { sail: 'TO', name: 'Tocantins' }
  ];

  constructor(
    private clientService: ClientService,
    public router: Router,
    private route: ActivatedRoute,    
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('id');
    if (clientId) {
      this.clientService.getById(+clientId).subscribe((clientData) => {
        this.clientId = Number.parseInt(clientId);
        this.client = clientData;
        this.selectedGender = clientData.gender;
      });
    }
  }

  saveClient(): void {
    // Atribui o gênero selecionado ao cliente
    this.client.gender = this.selectedGender;
  
    if (this.clientId) {
      // Atualiza o cliente existente
      this.clientService.update(this.clientId, this.client as ClientViewModel).subscribe(
        () => {
          this.snackBar.open('Cliente atualizado com sucesso!', 'Fechar', {
            duration: 3000
          });
          this.router.navigate(['/clients']);
        },
        () => {
          this.snackBar.open('Erro ao atualizar cliente.', 'Fechar', {
            duration: 3000
          });
        }
      );
    } else {
      // Cria um novo cliente
      this.clientService.create(this.client as CreateClientViewModel).subscribe(
        () => {
          this.snackBar.open('Cliente criado com sucesso!', 'Fechar', {
            duration: 3000
          });
          this.router.navigate(['/clients']);
        },
        () => {
          this.snackBar.open('Erro ao criar cliente.', 'Fechar', {
            duration: 3000
          });
        }
      );
    }
  }

  addAddress(): void {
    this.client.addresses.push({
      type: '',
      street: '',
      number: '',
      city: '',
      state: '',
      zipCode: '',
    });
  }

  removeAddress(index: number): void {
    this.client.addresses.splice(index, 1);
  }
}
