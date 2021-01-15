# my-first-chat
### Instalación
***
* ionic start [nombre-del-proyecto] blank --type=angular
**Al momento que solicite capacitor ponemos que no**
* npm install firebase @angular/fire --save
* ionic generate page pages/login
* ionic generate page pages/chat
* ionic generate service services/chat
### Congfiguración Inicial
***
Primero en el archivo *environment.ts* creamos una propiedad para poder asignar las claves de uso y poder conectar nuestro proyecto con firebase. Estas claves se las obtiene al momento de crear una aplicación dentro de firebase.
![Image text](https://raw.githubusercontent.com/EstebanRios99/my-first-chat/master/capturas/1.JPG)
Luego lo que se debe hacer es importar a nuestro proyecto todos los módulos de angular y firebase que vamos a utilizar, en el módulo *AngularFireModule* debemos inicializarlo para que reconozca las variables de firebase creadas previamente.
![Image text](https://raw.githubusercontent.com/EstebanRios99/my-first-chat/master/capturas/2.JPG)
El siguiente paso a realizar es configurar el archivo de rutas, para que nuestra ruta principal sea la página de *Login*.
![Image text](https://raw.githubusercontent.com/EstebanRios99/my-first-chat/master/capturas/2.JPG)

