# Fitness - Trainer
The Fitness Trainer project is a frontend web application designed for managing routines and exercises for clients. This intuitive and user-friendly web application provides trainers with the ability to create and customize workout routines, while also enabling clients to access their assigned routines, track their performance, and receive personalized recommendations. Fitness Trainer offers a comprehensive and efficient experience for effective routine and exercise management, enhancing users' results and physical performance.

![Angular][angular-badge]
![Firebase][firebase-badge]

![ESLint][eslint-badge]
![TypeScript][typescript-badge]
![RxJS][rxjs-badge]

## 📦 Requeriments
- [NodeJS][nodejs-link] _v18.16.0_
- [AngularCLI][angular-link] _v15.2.5_

## 📟 Setup

```typescript
// src/environments/environment.ts
export const environment = {
  POWEREDBY: "<string URL || default: https://github.com/maurodviveros>",
  MAX_LENGTH: "<number || default: 24>",
};

export const FIREBASE = {
  API_KEY             : "<api_key>",
  APP_ID              : "<app_id>",
  AUTH_DOMAIN         : "<auth_domain>",
  MEASUREMENT_ID      : "<measurenment_id>",
  MESSAGING_SENDER_ID : "<messaging_sender_id>",
  PROJECT_ID          : "<project_id>",
  STORAGE_BUCKET      : "<storage_bucket>"
};

```

```bash
$ npm install
$ npm start
```

## 📜 License
MIT © [Mauro Daniel Viveros][github-profile]

[github-profile]: https://github.com/maurodviveros
[nodejs-link]: https://nodejs.org
[angular-link]: https://angular.io
[angular-badge]: https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white
[firebase-badge]: https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase
[eslint-badge]: https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white
[typescript-badge]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[rxjs-badge]: https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white