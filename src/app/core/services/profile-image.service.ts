import { Injectable, inject } from "@angular/core";
import { AuthService } from "../modules/auth/services/auth.service";
import { Storage, StorageReference, getDownloadURL, ref, uploadBytes } from "@angular/fire/storage";
import { MessageService } from "src/app/shared/services/message.service";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProfileImageService {
  private readonly storage = inject(Storage);
  private readonly auth = inject(AuthService);
  private readonly message = inject(MessageService);

  readonly valid = {
    types: ["image/png", "image/jpeg", "image/jpg"],
    extensions: [".png", ".jpeg", ".jpg"]
  };

  private ref! : StorageReference;
  readonly $src = new BehaviorSubject<string | undefined>(undefined);
  readonly $upload = new Subject<boolean>();

  constructor(){
    this.auth.$user.subscribe(user => {
      this.ref = ref(this.storage, `users/${user.uid}/profile`);
      this.updateSrc();
    });
  }

  private updateSrc(){
    return getDownloadURL(this.ref)
      .then(src => { this.$src.next(src); })
      .catch(() => { this.$upload.next(false); });
  }

  private getSizeMB(sizeBytes: number): number{ return sizeBytes / 1024 / 1024; }


  async upload(file: File): Promise<void>{
    this.$upload.next(true);
    try {
      if(!this.valid.types.includes(file.type)) throw "Tipo de archivo no valido. PNG/JPG/JPEG";
      if(this.getSizeMB(file.size) > 5) throw "Tamaño de imagen no soportada. Limite 5MB";

      return uploadBytes(this.ref, file).then(response => {
        this.message.success("Foto de perfil actualizada correctamente.");
        this.ref = response.ref;
        return this.updateSrc();
      });
    } catch (error) {
      if(error instanceof Error){ this.message.error(error); }
      throw error;
    }
  }

}
