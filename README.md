# SICA


![module](https://github.com/user-attachments/assets/65329bb8-1783-44ea-8613-1b753ab9e61e)
![module_2](https://github.com/user-attachments/assets/fb6bd95c-491b-4afe-85d6-0640a3a4377e)
![module_3](https://github.com/user-attachments/assets/b9963ec3-4bbc-44b9-bbc5-b5fd6e9ecb1c)
![module_4](https://github.com/user-attachments/assets/efc851af-2c7a-4664-8e78-2d8d74f55021)






Proyecto para el control de asistencia y de ingreso al restaurante

### Prerrequisitos

**Version de node 20.10.x**

### Clonar el repositorio

```shell
git clone https://github.com/Tatanstii/iesla-assistance-control.git
```

### Instalar paquetes

```shell
npm i
```

### Inicializar archivo .env

```js
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
NEXTAUTH_URL=http://localhost:3000/api/auth
AUTH_SECRET=

```

### Iniciar aplicación

```shell
npx prisma migrate
npx prisma db push
npm run dev
```

## Comandos disponibles

Correr los comandos con npm `npm run [command]`

| comando      | descripción                                                            |
| :----------- | :--------------------------------------------------------------------- |
| `dev`        | Inicia la aplicación en modo desarrollador                             |
