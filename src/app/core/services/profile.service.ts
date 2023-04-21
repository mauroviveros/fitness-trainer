import { Injectable } from "@angular/core";
import { Storage, ref, getDownloadURL, uploadBytes } from "@angular/fire/storage";
import { AuthService } from "../../modules/auth/services/auth.service";
import { firstValueFrom, BehaviorSubject, filter, map } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  private validTypes = ["image/png", "image/jpeg", "image/jpg"];
  private getSizeMB(size: number){ return size / 1024 / 1024; }
  private _imageURL = new BehaviorSubject<string | null | undefined>(null);

  get imageURL(){
    return this._imageURL.pipe(
      filter(url => url !== null),
      map(url => url as string | undefined)
    );
  }

  constructor(
    private snackBar: MatSnackBar,
    private storage: Storage,
    private auth: AuthService
  ){
    this.getPictureURL().then(imageURL => {
      this._imageURL.next(imageURL);
    }).catch(() => {
      this._imageURL.next(undefined);
    });
  }

  private async getPictureRef(){
    const user = await firstValueFrom(this.auth.user);
    return ref(this.storage, `users/${user.uid}/profile`);
  }

  private async getPictureURL(){
    const ref = await this.getPictureRef();
    return getDownloadURL(ref);
  }

  async uploadPicture(file: File){
    const ref = await this.getPictureRef();

    try {
      if(!this.validTypes.includes(file.type)) throw "Tipo de archivo no valido. PNG/JPG/JPEG";
      if(this.getSizeMB(file.size) > 5) throw "Tamaño de imagen no soportada. Limite 5MB";
      return uploadBytes(ref, file).then(async () => {
        this._imageURL.next(`${await this.getPictureURL()}?${new Date().getTime()}`);
        this.snackBar.open("✅ Foto de perfil actualizada correctamente.");
      });
    } catch (error) {
      this.snackBar.open(error as string, "cerrar", { duration: 5000 });
      throw error;
    }
  }
}
