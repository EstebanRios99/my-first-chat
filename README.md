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

Luego creamos el método para iniciar sesión *(signIn)* el cual recibe los parámetros *email* y *password* y utilizando un método de la clase de autenticación de Firebase llamado *signInWithEmailAndPassword* toma los parámetros enviados hace la autenticación y si la información concuerda con el registro ingresa a la sesión solicitada.  

También se crea el método para cerrar sesión *(signOut)* el cual no recibe parámetros simplemente utiliza un método de Firebase que detecta las credenciales que se están usando y las deshabilita.  

![Image text](https://raw.githubusercontent.com/EstebanRios99/my-first-chat/master/capturas/7.JPG)  

Luego nos vamos a la página de login y dentro del archivo login.module.ts importamos la clase *ReactiveFormsModule*.  

![Image text](https://raw.githubusercontent.com/EstebanRios99/my-first-chat/master/capturas/8.JPG)  

Luego vamos al archivo *login.page.ts* importamos las siguientes clases que vamos utilizar, asignamos a la propiedad *credentialForm* los métodos de la clase *FormGroup*, esta clase permite conectar los formularios con los métodos. Y finalmente creamos nuestras variables privadas con las diferentes clases que vamos a implementar.  

![Image text](https://raw.githubusercontent.com/EstebanRios99/my-first-chat/master/capturas/9.JPG)

El método *ngOnInit* se ejecuta inmediatamente exista un cambio, lo primero que se hace es utilizando la clase *FormBuilder* creamos una nueva instancia de un *FormGroup* en donde a las propiedades de *email* y *password* realizamos la respectiva validación utilizando la clase *Validators* con los métodos *required, email, minLength.*  

![Image text](https://raw.githubusercontent.com/EstebanRios99/my-first-chat/master/capturas/10.JPG)

Luego creamos el método asíncrono de registro *(async signUp)*, creamos una constante de *loading* y usando la clase *loadingController* y el método *create* creamos una página de carga mientras se realiza el proceso de registrar al usuario.  

Utilizando el método de *signUp* que previamente se creó en nuestro *chat.service.ts* enviamos las credenciales que se encuentran en el formulario *(credentialForm.value)*, luego de esto la página de carga debe desaparecer para lograr esto se usa el método *dismiss*. Se crea un *alert* que nos avisará que la sesión se creó satisfactoriamente utilizando la clase *alertController* y el método *create*, vamos a enviar los siguientes parámetros: *header, message, buttons.*  

Con el método *present* mostramos el *alert* de creación exitosa.   

Y utilizado la clase *NavController* y el método *navigateForward* re-direccionamos la página a la ruta del chat.   

Este método tiene un método interno asíncrono que detecta los posibles errores que puede ocurrir al momento de crear el usuario, de igual manera lo primero que hace es desaparecer la página de carga, crea un nuevo *alert* con los mismos parámetros *(header, message, buttons)* con la diferencia que en el parámetro *message* enviamos el error presente de la siguiente manera *err.message.*  

Finalmente presentamos el *alert* con el error ocurrido.  

![Image text](https://raw.githubusercontent.com/EstebanRios99/my-first-chat/master/capturas/11.JPG)

El método de inicio de sesión *(async signIn)* es similar al método anterior, con la diferencia de que se utiliza el método *signIn* implementado en nuestro *chat.service.ts*  y en vez de recibir un usuario como tal la función asíncrona interna de aceptación recibe el parámetro de respuesta *(res)* en vez de recibir un usuario como tal.  

Si funciona se utiliza el método para re-direccionar a la página del chat y sino utiliza el método asíncrono interno para extraer y mostrar el error ocurrido.  

Luego creamos 2 métodos para obtener la información del formulario, estos métodos son *get email* y *get password*. Lo que hacen estos métodos es identificar el nombre *(email)* y *(password)* dentro del formulario y se guarda este valor.  

![Image text](https://raw.githubusercontent.com/EstebanRios99/my-first-chat/master/capturas/12.JPG)  

Por último en nuestro *login.page.html* implementamos un formulario y asignamos el *formGroup* que creamos anteriormente *(credentialForm)*, dentro del formulario creamos dos *ion-item*, el primero tendrá un *input* y usando el método *formControlName* le asignamos el nombre de nuestra variable dentro del formulario en este caso *email* para que el valor asignado se guarde.  

Adicional se crea un *div* que recibirá los posibles errores de validación que pueden ocurrir y dentro de este creamos dos *spam* que se mostraran dependiendo del error.  

Para el segundo ion-item creamos un *input* de tipo *password* y de igual manera usando el método *formControlName* le asignamos el nombre de *password* para que el valor del campo se guarde.   

De igual manera se crea el *div* pero esta vez debe tomar los posibles errores de validación establecidos para la parte del *password.*  

![Image text](https://raw.githubusercontent.com/EstebanRios99/my-first-chat/master/capturas/13.JPG)

Finalmente creamos dos botones que vamos a utilizar para registrar un nuevo usuario o para iniciar sesión con un usuario creado y usando el método *(click)* le asignamos a cada botón el método adecuado que se creó en la *login.page.ts.*  

![Image text](https://raw.githubusercontent.com/EstebanRios99/my-first-chat/master/capturas/14.JPG)












