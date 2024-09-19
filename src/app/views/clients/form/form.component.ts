import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    name: undefined,
    gender: undefined,
    birthDate: undefined,
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
    { sail: 'TO', name: 'Tocantins' },
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
        // Ajuste a data para garantir que está no formato correto
        // this.client.birthDate = new Date(clientData.birthDate);
      });
    }
  }

  addAddress(): void {
    this.client.addresses.push({
      complement: '',
      type: '',
      street: '',
      number: '',
      city: '',
      state: '',
      zipCode: '',
      id: 0,
      clientId: 0,
    });
  }

  removeAddress(index: number): void {
    this.client.addresses.splice(index, 1);
  }

  saveClient(): void {
    if (this.client.name == undefined || this.client.name == '') {
      this.snackBar.open('Nome do cliente é obrigatório!', 'Fechar', {
        duration: 3000,
      });
      return;
    }

    if (this.client.birthDate == undefined) {
      this.snackBar.open('Data de nascimento é obrigatória!', 'Fechar', {
        duration: 3000,
      });
      return;
    }

    if (this.selectedGender == undefined || this.selectedGender == '') {
      this.snackBar.open('Gênero é obrigatório!', 'Fechar', {
        duration: 3000,
      });
      return;
    }

    // Atribui o gênero selecionado ao cliente
    this.client.gender = this.selectedGender;

    this.client.birthDate = this.formatarData(this.client.birthDate);
    // this.client.birthDate = new Date(this.client.birthDate);
    // Cria um novo cliente
    this.clientService.create(this.client as CreateClientViewModel).subscribe(
      () => {
        this.snackBar.open('Cliente criado com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/clients']);
      },
      (error: any) => {
        this.snackBar.open('Erro ao criar cliente.', 'Fechar', {
          duration: 3000,
        });
      }
    );
  }

  formatarData(data: string): string {
    if (data.length !== 8) {
      return 'Data inválida';
    }

    const dia = data.slice(0, 2);
    const mes = data.slice(2, 4);
    const ano = data.slice(4);

    return `${dia}/${mes}/${ano}`;
  }
}
