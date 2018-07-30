socialNetwork.initializeFirebase();

const logoutProfile = document.getElementById('logout-profile').addEventListener('click', event => {
  firebase.auth().signOut();
  location.href = '../index.html';
});
