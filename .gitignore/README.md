🛠️ E4-M4 Ejercicio

**Simulación de Consulta a Múltiples APIs (Asincronía) 🌐**

**Objetivo:**

Comprender y aplicar los diferentes mecanismos de la programación
asíncrona en JavaScript para gestionar operaciones dependientes que
simulan una demora, como las consultas a una API. Refactorizarás el
mismo problema
utilizando **Callbacks**, **Promesas** y **Async/Await** para distinguir
sus ventajas y desventajas.

**Escenario del Problema:**

Imagina que necesitas construir el perfil de un usuario para una
aplicación. Para ello, debes consultar tres \"APIs\" diferentes en un
orden específico:

1.  Primero, obtienes los datos básicos del usuario.

2.  Luego, con el ID del usuario, obtienes sus posts.

3.  Finalmente, con el primer post, obtienes sus comentarios.

Cada consulta a la \"API\" tarda un tiempo aleatorio en responder. Hemos
preparado unas funciones que simulan este comportamiento.

**Código Base (app.js adjunto)**

**Instrucciones por Parte:**

**Parte 1: La Solución con Callbacks (El \"Callback Hell\")**

1.  Llama a la función obtenerUsuario con un ID de tu elección (ej: 1).

2.  **Dentro del callback** de obtenerUsuario, una vez que tengas el
    objeto usuario, llama a obtenerPosts usando el usuario.id.

3.  **Dentro del callback** de obtenerPosts, una vez que tengas el array
    de posts, llama a obtenerComentarios usando el id del **primer
    post** (posts\[0\].id).

4.  Finalmente, **dentro del callback** de obtenerComentarios, imprime
    en la consola los comentarios obtenidos.

5.  Asegúrate de manejar los posibles errores en cada paso, imprimiendo
    el error en la consola si ocurre.

_Observa la estructura anidada que se forma. Esto es conocido como
\"Callback Hell\" o \"Pyramid of Doom\"._

**Parte 2: Refactorización a Promesas**

Ahora, reescribiremos las funciones de la API para que retornen
Promesas.

1.  Copia las tres funciones
    (obtenerUsuario, obtenerPosts, obtenerComentarios) y modifícalas
    para que ya no acepten un callback. En su lugar, deben retornar
    una new Promise().

    - Dentro de la promesa, si la operación es exitosa, llama
      a resolve(datos).

    - Si ocurre un error, llama a reject(error).

2.  Usando tus nuevas funciones basadas en promesas, encadena las
    llamadas con .then():

    - Llama a tu obtenerUsuarioPromesa(1).

    - En el primer .then(), recibe el usuario y retorna la llamada
      a obtenerPostsPromesa(usuario.id).

    - En el segundo .then(), recibe los posts y retorna la llamada
      a obtenerComentariosPromesa(posts\[0\].id).

    - En el último .then(), recibe los comentarios y muéstralos en la
      consola.

3.  Añade un único bloque .catch() al final de la cadena para capturar
    cualquier error que pueda ocurrir en cualquiera de las promesas.

_Compara la legibilidad y la estructura lineal de este código con el de
la Parte 1._

**Parte 3: La Solución Moderna con Async/Await**

1.  Crea una función asíncrona (async function)
    llamada mostrarPerfilDeUsuario.

2.  Dentro de esta función, utiliza await para llamar a cada una de tus
    funciones de promesa en secuencia, guardando el resultado en
    variables (ej: const usuario = await obtenerUsuarioPromesa(1);).

3.  Utiliza un bloque try\...catch para envolver tus llamadas await.

    - Dentro del try, realiza las tres llamadas y, al final, imprime
      los comentarios en la consola.

    - Dentro del catch, captura cualquier error que ocurra y muéstralo
      en la consola.

4.  Llama a tu función mostrarPerfilDeUsuario() para ejecutar todo el
    proceso.

_Analiza cómo async/await permite escribir código asíncrono que se lee
casi como si fuera síncrono, mejorando aún más la claridad._

**Conceptos a Aplicar:**

- **Asincronía:** setTimeout, código no bloqueante.

- **Callbacks:** Paso de funciones como argumentos, manejo de errores
  manual, \"Callback Hell\".

- **Promesas:** new Promise(), resolve, reject, encadenamiento
  con .then(), manejo centralizado de errores con .catch().

- **Async/Await:** async, await para sintaxis síncrona, manejo de
  errores con try\...catch.
