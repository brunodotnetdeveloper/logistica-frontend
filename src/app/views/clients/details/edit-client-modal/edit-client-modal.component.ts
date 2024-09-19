import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientViewModel } from '../../../../models/client';
import { ClientService } from '../../../../services/client.service';

@Component({
  selector: 'app-edit-client-modal',
  templateUrl: './edit-client-modal.component.html',
})
export class EditClientModalComponent implements OnInit {
  // Campo de entrada para a data no formato 'dd/MM/yyyy'
  birthDateDisplay: string = '';

  constructor(
    public dialogRef: MatDialogRef<EditClientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { client: ClientViewModel },
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    if (this.data.client.birthDate) {
      // console.log('Data de Aniversário:' + this.data.client.birthDate);
      // console.log('Data de Aniversário:' + this.formatDateToDDMMYYYY(this.data.client.birthDate));
      // let dateParsed = this.formatDateToDDMMYYYY(this.data.client.birthDate);
      // console.log(dateParsed);
      // this.data.client.birthDate = this.parseDateFromDDMMYYYY(dateParsed);

      // console.log('date parsed:' + this.data.client.birthDate)
    }
  }

  // formatDateToDDMMYYYY(date: Date): string {
  //   return date.toLocaleDateString('pt-BR');
  // }

  onSave(): void {
    this.clientService
      .update(this.data.client.id, this.data.client)
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
