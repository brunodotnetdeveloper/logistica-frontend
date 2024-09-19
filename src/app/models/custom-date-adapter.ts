import { NativeDateAdapter } from '@angular/material/core';

export class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (!date) {
      return '';
    }
    // Aqui você define o formato dd/MM/yyyy
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  override parse(value: any): Date | null {
    if (typeof value === 'string') {
      const [day, month, year] = value.split('/').map((str: string) => parseInt(str, 10));
      return new Date(year, month - 1, day);
    }
    return super.parse(value);
  }
}
