import { Injectable, inject } from "@angular/core";
import { User } from "@angular/fire/auth";
import { Storage, getDownloadURL, ref, uploadBytes } from "@angular/fire/storage";
import { BehaviorSubject, filter, firstValueFrom, map, of, switchMap } from "rxjs";

import { AuthService } from "../modules/auth/services/auth.service";
import { MessageService } from "src/app/shared/services/message.service";

@Injectable({
  providedIn: "root"
})
export class ProfileImageService {
  private readonly auth = inject(AuthService);
  private readonly storage = inject(Storage);
  private readonly message = inject(MessageService);
  private readonly validTypes = ["image/png", "image/jpeg", "image/jpg"];
  private readonly $time = new BehaviorSubject<Date>(new Date());

  readonly $ref = this.auth.$user.pipe(
    filter(user => user !== null),
    map(user => user as User),
    switchMap(({ uid }) => {
      return of(ref(this.storage, `users/${uid}/profile`));
    })
  );

  readonly $src = this.$time.pipe(
    switchMap(() => this.$ref),
    switchMap(async (reference) => {
      try {
        return await getDownloadURL(reference);
      } catch (error) {
        return "/assets/profile.png";
      }
    })
  );

  private getSizeMB(sizeBytes: number): number{
    return sizeBytes / 1024 / 1024;
  }


  async upload(file: File): Promise<string>{
    try {
      if(!this.validTypes.includes(file.type)) throw "Tipo de archivo no valido. PNG/JPG/JPEG";
      if(this.getSizeMB(file.size) > 5) throw "Tamaño de imagen no soportada. Limite 5MB";

      const ref = await firstValueFrom(this.$ref);
      return uploadBytes(ref, file).then(response => {
        this.message.success("✅ Foto de perfil actualizada correctamente.");
        this.$time.next(new Date());
        return response.ref.fullPath;
      });
    } catch (error) {
      if(error instanceof Error){ this.message.error(error); }
      throw error;
    }
  }
}
