import Swal, { SweetAlertResult } from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  swalSuccessMessage(message: any): any {

    return Swal.fire({
      title: "Başarılı",
      text: message,
      icon: 'success',
      confirmButtonText: 'Kapat'
    })
  }
  swalErrorMessage(message: any): any {
    return Swal.fire({
      title: 'Hata!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Kapat'
    })
  }
  swalConfirm(title: any, message: any): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: title,
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, SİL',
      cancelButtonText: "Vazgeç"
    })
  }

}
