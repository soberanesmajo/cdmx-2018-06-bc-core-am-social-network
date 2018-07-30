// Añadiendo el evento del botón de registrarse

socialNetwork.initializeFirebase(); 

const signupName = document.getElementById('signup-name');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');

signup.addEventListener('click', event => {
  event.preventDefault();
  const signupNameValue = signupName.value;
  const signupEmailValue = signupEmail.value;
  const signupPasswordValue = signupPassword.value;
  const auth = firebase.auth();
  
  const promise = auth.createUserWithEmailAndPassword(signupEmailValue, signupPasswordValue) // Para registrar un nuevo usuario con correo y contraseña y también hacer que entre.
    .then(function(promise) {
      location.href = '../views/muro.html';
      promise.catch(event => console.log(event.message));
    });
});
  
firebase.auth().onAuthStateChanged(firebaseUser => { // cuando detecta que el usuario se ha "logeado"
  if (firebaseUser) {
    location.href = '../views/muro.html';
  } else {
    console.log('not logged in');
    logout.classList.add('hide');
  }
});