// Ejercicio M4-E4
/*
  Simulación de Funciones de API
  Estas funciones simulan llamadas a una red. No las modifiques.
*/

// API para obtener datos de un usuario
const obtenerUsuario = (id, callback) => {
  // Simula una demora aleatoria entre 0.5 y 1.5 segundos
  const demora = Math.random() * 1000 + 500;
  setTimeout(() => {
    // Simula un posible error
    if (!id) {
      callback("Error: ID de usuario no proporcionado.", null);
      return;
    }
    console.log(`Buscando usuario con ID: ${id}...`);
    const usuario = {
      id: id,
      nombre: "John Doe",
      email: "john.doe@example.com",
    };
    callback(null, usuario);
  }, demora);
};

// API para obtener los posts de un usuario
const obtenerPosts = (userId, callback) => {
  const demora = Math.random() * 1000 + 500;
  setTimeout(() => {
    if (!userId) {
      callback(
        "Error: ID de usuario no proporcionado para buscar posts.",
        null
      );
      return;
    }
    console.log(`Buscando posts del usuario con ID: ${userId}...`);
    const posts = [
      { id: 101, titulo: "Mi primer post", contenido: "..." },
      { id: 102, titulo: "Mi segundo post", contenido: "..." },
    ];
    callback(null, posts);
  }, demora);
};

// API para obtener los comentarios de un post
const obtenerComentarios = (postId, callback) => {
  const demora = Math.random() * 1000 + 500;
  setTimeout(() => {
    if (!postId) {
      callback(
        "Error: ID de post no proporcionado para buscar comentarios.",
        null
      );
      return;
    }
    console.log(`Buscando comentarios del post con ID: ${postId}...`);
    const comentarios = [
      { id: 1, texto: "¡Excelente post!" },
      { id: 2, texto: "Muy informativo, gracias." },
    ];
    callback(null, comentarios);
  }, demora);
};

//////////////////
//  Soluciones  //
//////////////////

// Parte 1: Solución con Callbacks (Callback Hell)
console.log("--- Iniciando Parte 1: Callbacks ---");

obtenerUsuario(1, (error, usuario) => {
  if (error) {
    console.error("Parte 1 Error:", error);
  } else {
    console.log("Parte 1: Usuario obtenido:", usuario);

    obtenerPosts(usuario.id, (error, posts) => {
      if (error) {
        console.error("Parte 1 Error:", error);
      } else {
        console.log("Parte 1: Posts obtenidos:", posts);

        obtenerComentarios(posts[0].id, (error, comentarios) => {
          if (error) {
            console.error("Parte 1 Error:", error);
          } else {
            console.log("Parte 1: Comentarios obtenidos:", comentarios);
            console.log("--- Fin Parte 1 ---");
          }
        });
      }
    });
  }
});

// Parte 2: Refactorización a Promesas
const obtenerUsuarioPromesa = (id) => {
  return new Promise((resolve, reject) => {
    obtenerUsuario(id, (error, usuario) => {
      if (error) reject(error);
      else resolve(usuario);
    });
  });
};

const obtenerPostsPromesa = (userId) => {
  return new Promise((resolve, reject) => {
    obtenerPosts(userId, (error, posts) => {
      if (error) reject(error);
      else resolve(posts);
    });
  });
};

const obtenerComentariosPromesa = (postId) => {
  return new Promise((resolve, reject) => {
    obtenerComentarios(postId, (error, comentarios) => {
      if (error) reject(error);
      else resolve(comentarios);
    });
  });
};

// Encadenamiento de Promesas (Chain)
// Usamos setTimeout para que no se mezcle visualmente instantáneamente con la parte 1 en consola (opcional, pero ayuda)
setTimeout(() => {
  console.log("\n--- Iniciando Parte 2: Promesas ---");
  obtenerUsuarioPromesa(1)
    .then((usuario) => {
      console.log("Parte 2: Usuario obtenido:", usuario);
      return obtenerPostsPromesa(usuario.id);
    })
    .then((posts) => {
      console.log("Parte 2: Posts obtenidos:", posts);
      return obtenerComentariosPromesa(posts[0].id);
    })
    .then((comentarios) => {
      console.log("Parte 2: Comentarios obtenidos:", comentarios);
      console.log("--- Fin Parte 2 ---");
    })
    .catch((error) => {
      console.error("Parte 2 Error:", error);
    });
}, 5000); // Iniciamos esto después de unos segundos para dar tiempo a la parte 1

// Parte 3: La Solución Moderna con Async/Await (Usando las mismas funciones "Promesa" creadas en la Parte 2)
const mostrarPerfilDeUsuario = async () => {
  try {
    console.log("\n--- Iniciando Parte 3: Async/Await ---");

    const usuario = await obtenerUsuarioPromesa(1);
    console.log("Parte 3: Usuario obtenido:", usuario);

    const posts = await obtenerPostsPromesa(usuario.id);
    console.log("Parte 3: Posts obtenidos:", posts);

    const comentarios = await obtenerComentariosPromesa(posts[0].id);
    console.log("Parte 3: Comentarios obtenidos:", comentarios);

    console.log("--- Fin Parte 3 ---");
  } catch (error) {
    console.error("Parte 3 Error:", error);
  }
};

// Ejecutamos la función
mostrarPerfilDeUsuario();
