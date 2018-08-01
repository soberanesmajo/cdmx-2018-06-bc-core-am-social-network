socialNetwork.initializeFirebase();
let db = firebase.firestore();

const logoutProfile = document.getElementById('logout-profile').addEventListener('click', event => {
  firebase.auth().signOut();
  location.href = '../index.html';
});

document.getElementById('help-button').addEventListener('click', event => {
  swal('(55) 5259-8121', 'Llama al Saptel: linea de atención psicologíca gratuita 24/7 para toda la República Mexicana');
});

const makeUserProfile = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      let postDate = firebase.firestore.FieldValue.serverTimestamp();
      db.collection('userProfile').add({ // En database, agrega una colección llamada 'post' que tiene los siguientes datos
        content: contentPost,
        date: postDate,
        userID: user.displayName,
        userID2: user.email,
        userPhoto: User.photoUrl,
        likes: []
      })
        .then(docRef => {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch(error => {
          console.error('Error adding document: ', error);
        });
    } else {
      location.href = ('../index.html');
    }
  });
};

// let userFeeling = document.getElementById('input-emotion').value;
// let userintensity = document.getElementById('input-intensity').value;
// let usercomment = document.getElementById('inputComments').value;

// let printFeeling = document.getElementById('input-emotion').innerHTML ='';

