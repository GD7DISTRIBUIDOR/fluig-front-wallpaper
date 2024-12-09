import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { WallpaperService } from '../services/wallpaper.service';
import { MessageService } from 'primeng/api';
import { UserAuthorizationService } from '../services/userAuthorization.service';

@Component({
  selector: 'app-wallpaper-form',
  templateUrl: './wallpaper-form.component.html',
})
export class WallpaperFormComponent implements OnInit{
  displayDialog: boolean = false;
  imageSrc: string | ArrayBuffer | null = null;
  @ViewChild('fileInput') fileInput!: FileUpload;
  showWgtWallpaper: boolean = false;

  constructor(private wallpaperService: WallpaperService, private messageService: MessageService, private userAuthorizationService: UserAuthorizationService){}

  ngOnInit(): void {
      this.userAuthorizationService.checkAuthorization().subscribe((data)=>{
        this.showWgtWallpaper = data
      })
  }

  openDialog() {
    this.displayDialog = true;
  }

  closeDialog() {
    this.displayDialog = false;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileInput.files = [file]; // Adiciona o arquivo à lista de arquivos do p-fileUpload
    }
  }

  sendImage(){
    if(this.fileInput.files.length > 0){
      console.log(this.fileInput.files[0])
      this.convertToBase64(this.fileInput.files[0])
    }
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.imageSrc = e.target?.result ?? null;

      // Enviar a imagem em Base64 para o backend
      const base64String = this.imageSrc?.toString().split(',')[1]; // Remover o prefixo "data:image/..."
      this.uploadToBackend(base64String);
    };
    reader.readAsDataURL(file);
  }

  uploadToBackend(base64String: string | undefined) {
    if (base64String) {
      const payload = { wallpaper64: base64String };
      this.wallpaperService.sendWallpaper(payload).subscribe((data)=>{
        console.log(data.status)
        if(data.status == 200){
          this.fileInput.clear()
          this.messageService.add({severity: 'info', summary: 'Imagem Enviada com Sucesso.'})
        }else{
          this.fileInput.clear()
          this.messageService.add({severity: 'error', summary: 'Erro tente novamente mais tarde.'})
        }
      })
    }
  }

}
