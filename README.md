# my-first-chat
### Instalación
***
* ionic start [nombre-del-proyecto] blank --type=angular
**Al momento que solicite capacitor ponemos que no**
* npm install firebase @angular/fire --save   //instalar la librería de firebase
* ionic generate page pages/login
* ionic generate page pages/chat
* ionic generate service services/chat
### Congfiguración Inicial
***
Primero en el archivo *environment.ts* creamos una propiedad para poder asignar las claves de uso y poder conectar nuestro proyecto con Firebase. Estas claves se las obtiene al momento de crear una aplicación dentro de Firebase.  

![Image text](https://raw.githubusercontent.com/EstebanRios99/my-first-chat/master/capturas/1.JPG)  

Luego lo que se debe hacer es importar a nuestro proyecto todos los módulos de angular y firebase que vamos a utilizar, en el módulo *AngularFireModule* debemos inicializarlo para que reconozca las variables de firebase creadas previamente.  

![Image text](https://raw.githubusercontent.com/EstebanRios99/my-first-chat/master/capturas/2.JPG)
El siguiente paso a realizar es configurar el archivo de rutas, para que nuestra ruta principal sea la página de *Login*.
![Image text](https://raw.githubusercontent.com/EstebanRios99/my-first-chat/master/capturas/3.JPG)  
### Implementación de Login
***
Implementar nuestros métodos dentro del archivo *chat.service.ts* que previamente creamos.  
Lo primero que se realiza es importar las siguientes librerías que se muestran en la imagen y generar nuestra interfaz de usuario con su uid y su correo.  
![Image text](https://raw.githubusercontent.com/EstebanRios99/my-first-chat/master/capturas/4.JPG)  
Luego creamos una propiedad para el usuario *(currentUser)* y la declaramos como **null**, adicional a esto declaramos o asignamos una propiedad a las clases *AngularFireAuth* y *AngularFirestore*.  
También se crea nuestro constructor el cual con el método llamado *onAuthStateChanged* detecta los cambios que se están realizando para la autenticación de un nuevo usuario, guarda estos cambios y luego lo que se hace es al *currentUser* asignamos la información extraída por este método.  
![Image text](https://raw.githubusercontent.com/EstebanRios99/my-first-chat/master/capturas/5.JPG)  
Luego dentro del mismo archivo creamos el método para el registro de un nuevo usuario *(signUp)* , los parámetros que recibirá el método serán *email* y *password*, se declara una constante en donde se van a almacenar la información del nuevo usuario, y la clase que permite crear el usuario dentro de firebase tiene un método el cual permite crear el usuario con el correo y la contraseña, este método se llama *createUserWithEmailAndPassword* y mandamos los parámetros que se recibe en este caso, *email* y *password*.  
Luego se imprime en consola la información del nuevo usuario esto más que nada para saber si este proceso se está cumpliendo correctamente.  
Después, a una nueva constante le asignamos el uid del nuevo usuario creado y con la clase de *AngularFirestore* utilizamos el método *doc* para poder crear una colección llamada *users*, a la cual le asignamos el uid del usuario creado y usando el método *set* enviamos dicho uid y el correo del nuevo usuario para que se almacene dentro del *Cloud Firestore* de Firebase.  
![Image text](https://raw.githubusercontent.com/EstebanRios99/my-first-chat/master/capturas/6.JPG)  



