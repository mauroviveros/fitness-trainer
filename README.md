# Fitness Trainer
Proyecto Frontend WebApp de Gestión de Rutinas y Ejercicios para Clientes


## 📟 Setup
- [NodeJS](https://nodejs.org) _v18.16.0_
- [AngularCLI](https://angular.io) _v15.2.6_

Generate `src/environments/environment.ts` file with following content


```typescript
export const environment = {
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

> server on: `http://localhost:4200/`

## 📜 License
MIT © [Mauro Daniel Viveros](https://github.com/maurodviveros)