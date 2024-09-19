import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressViewModel } from '../../../../models/client';
import { ClientService } from '../../../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-address-modal',
  templateUrl: './edit-address-modal.component.html',
})
export class EditAddressModalComponent {
  addressForm!: FormGroup; // Formulário reativo para controle dos campos
  isEditing: boolean; // Determina se é uma edição ou adição de endereço
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
    public dialogRef: MatDialogRef<EditAddressModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { address: AddressViewModel },
    private clientService: ClientService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar    
  ) {
    this.isEditing = !!data.address.id; // Verifica se é uma edição
    this.createForm(); // Inicializa o formulário
  }

  // Método para inicializar o formulário com validações
  createForm(): void {
    this.addressForm = this.fb.group({
      clientId: [this.data.address.clientId, Validators.required],
      street: [this.data.address.street, Validators.required],
      city: [this.data.address.city, Validators.required],
      zipCode: [this.data.address.zipCode, Validators.required],
      state: [this.data.address.state, Validators.required],
      number: [this.data.address.number, Validators.required],
      complement: [this.data.address.complement],
      type: [this.data.address.type, Validators.required]
    });
  }

  // Método para salvar o endereço (editar ou adicionar)
  onSave(): void {
    if (this.addressForm.valid) {
      if (this.isEditing) {
        // Edita o endereço
        this.clientService
          .updateAddress(this.data.address.clientId!, this.data.address.id!, this.addressForm.value)
          .subscribe(() => {
            this.dialogRef.close(true); // Fecha o modal com sucesso
          });

          this.snackBar.open('Endereço atualizado com sucesso!', 'Fechar', {
            duration: 3000,
          });
      } else {
        // Adiciona novo endereço
        this.clientService
          .addAddressToClient(this.data.address.clientId, this.addressForm.value)
          .subscribe(() => {
            this.dialogRef.close(true); // Fecha o modal com sucesso
          });

          this.snackBar.open('Endereço adicionado com sucesso!', 'Fechar', {
            duration: 3000,
          });
      }
    }
  }

  // Fecha o modal sem salvar
  onCancel(): void {
    this.dialogRef.close();
  }
}
