import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectKategoriConverter'
})
export class ProjectKategoriConverterPipe implements PipeTransform {

  transform(value: any, project): unknown {
    if (project.IS_WEB) {
      return 'Web Uygulaması'
    }
    else if (project.IS_MOBILE) {
      return 'Mobile Uygulaması'
    }
    else if (project.IS_DESKTOP) {
      return 'Masaüstü Uygulaması'
    }
    return 'Kategori yok!'

  }

}
