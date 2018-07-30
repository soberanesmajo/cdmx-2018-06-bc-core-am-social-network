socialNetwork.initializeFirebase();
let db = firebase.firestore(); // Variable que inicializa Firestore


const logout = document.getElementById('logout').addEventListener('click', event => {
  firebase.auth().signOut();
  location.href = '../index.html';
});

const publicar = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      document.getElementById('publish').addEventListener('click', event => { // Evento que detona el botón de 'publicar'
        event.preventDefault();
        let postDate = firebase.firestore.FieldValue.serverTimestamp();
        const contentPost = document.getElementById('publication-content').value;
        db.collection('post').add({ // En database, agrega una colección llamada 'post' que tiene los siguientes datos
          content: contentPost,
          date: postDate,
          userID: user.displayName,
          likes: []
        })
          .then(docRef => {
            console.log('Document written with ID: ', docRef.id);
            document.getElementById('publication-content').value = ''; // Vacía el contenido de la text area después de publicar.
            drawPost();
          })
          .catch(error => {
            console.error('Error adding document: ', error);
          });
      });
    } else {
      location.href = ('../index.html');
    }
  });
};

function deletePost(id) {
  db.collection('post').doc(id).delete().then(function () {
    console.log('Document successfully deleted!');
  }).catch(function (error) {
    console.error('Error removing document: ', error);
  });
};


const drawPost = () => {
  const postContainer = document.getElementById('publications'); // Este id es el contenedor que pinta las publicaciones.
  db.collection('post').onSnapshot((querySnapshot) => { // onSnapshot es un agente de escucha, que va a estar 'escuchando' cada que se haga un cambio en la base de datos.
    querySnapshot.forEach((doc) => {
      postContainer.innerHTML += `<div class="card card-post card-round" my-5 px-2>
                                   <div class="card-header1" id= "${doc.id}">
                                     <h5> <i class="fas fa-user-circle"></i> ${doc.data().userID}</h5>
                                     <p>${doc.data().date}</p>
                                    </div>
                                    <div class="card-body">
                                      <h6 class="card-text" id="user${doc.id}">${doc.data().content}</h6>
                                    </div>
                                    <div class="card-footer1 mr-auto">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                       <button class="btn btn-info1  float-right">
                                         <i class="fas fa-heart"></i> 0
                                       </button>
                                       <button class="btn btn-info1 float-right" onclick ="editPost('${doc.id}')">
                                        <i class="fas fa-edit"></i> Editar
                                       </button>
                                       <button class="btn btn-info1 float-right" onclick ="deletePost('${doc.id}')">
                                        <i class= "fas fa-trash-alt"></i> Eliminar
                                       </button>
                                    </div>
                                   </div>
                                </div>
                                <br/>`;
    });
  });
};

const editPost = (id) => { // Id es el parámetro del post a editar
  db.collection('post').doc(id).get() // entra a post y entra en el comentario con el ID especificado y lo llama
    .then(res => { // Obtiene la respuesta
      const currentContent = res.data().content; // Declaramos variable que contiene al post
      document.getElementById(`user${res.id}`).innerHTML = `<textarea cols="30" id="text${res.id}">${currentContent} </textarea> <button class="btn btn-info1 float-right" onclick ="saveEditedPost('${res.id}')"><i class="fas fa-save"></i></button> `;
    }); // Imprime un textarea con el contenido del post para habilitar la edición y llama a la función "saveEditedPost"
};

const saveEditedPost = (id) => {
  const newContent = document.getElementById(`text${id}`).value; // Guarda los nuevos datos del post
  console.log(newContent);
  db.collection('post').doc(id).update({ // Actualizamos el post con el id especificado 
    content: newContent // Le dice a firebase que el contenido del post es equivalente al nuevo contenido
  }).then(res => {
    alert('Publicacion Editada'); // Muestra una alerta de que la edicion fue exitosa
    drawPost(); // llama a drawPost para que pinte el post actualizado
  });
};


publicar();
drawPost();