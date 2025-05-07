import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'any',
})
export class Sweetalert2Service {
  private swal = Swal;

  async confirmAction(title: string): Promise<boolean> {
    return (
      (
        await this.swal.fire({
          titleText: title,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
        })
      ).isConfirmed ?? false
    );
  }
}
