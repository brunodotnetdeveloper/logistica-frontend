import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from '../../../services/client.service'; // Ajuste o caminho conforme necessário
import { ClientViewModel } from '../../../models/client'; // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-client-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  client: ClientViewModel = { id: 0, name: '', gender: '', birthDate: new Date() };
  selectedGender: string | undefined;
  
  genders = [
    { value: 'MASCULINO', viewValue: 'Masculino' },
    { value: 'FEMININO', viewValue: 'Feminino' }
  ];

  constructor(
    private clientService: ClientService,
    public router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('id');
    if (clientId) {
      this.clientService.getClientById(+clientId).subscribe(clientData => {
        console.log(clientData.name);
        this.client = clientData;
      });
    }
  }

  saveClient(): void {
    this.client.gender = this.selectedGender;
    
    if (this.client.id) {
      this.clientService.updateClient(this.client.id, this.client).subscribe(() => {
        this.snackBar.open('Cliente atualizado com sucesso!', 'Fechar', {
          duration: 3000
        });
        this.router.navigate(['/clients']);
      }, error => {
        this.snackBar.open('Erro ao atualizar cliente.', 'Fechar', {
          duration: 3000
        });
      });
    } else {
      this.clientService.createClient(this.client).subscribe(() => {
        this.snackBar.open('Cliente criado com sucesso!', 'Fechar', {
          duration: 3000
        });
        this.router.navigate(['/clients']);
      }, error => {
        this.snackBar.open('Erro ao criar cliente.', 'Fechar', {
          duration: 3000
        });
      });
    }
  }
}
