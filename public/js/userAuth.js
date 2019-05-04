const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPS');
const userName = document.getElementById("userName");
const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById('btnSignup')
const btnLogout = document.getElementById("btnLogout");
emsg = document.getElementById("emsg");

//Add log in event
btnLogin.addEventListener('click', e => {
    //get email and ps
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //sign in
    const promise = auth.signInWithEmailAndPassword(email,pass);
    //check validation
    promise.catch(e => emsg.innerHTML = e.message);
    promise.then(e => emsg.innerHTML = "");
  });
  
  //Add sign up event
  btnSignup.addEventListener('click', e => {
    //get email and ps
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const uname = userName.value;
    const auth = firebase.auth();
    //sign in
    const promise = auth.createUserWithEmailAndPassword(email,pass);
    //check validation
    promise.catch(e => emsg.innerHTML = e.message);
    promise.then(e => {
      emsg.innerHTML = "";
      var user = firebase.auth().currentUser;
      console.log(uname);
      user.updateProfile({
        name: uname,
      })
    });  
  });
  
  //Add log out event
  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
   });
  
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        console.log(firebaseUser);
        btnLogout.classList.remove('hide');
        btnLogin.classList.add('hide');
        btnSignup.classList.add('hide');
        txtEmail.style.display="none";
        txtPS.style.display="none";
        userName.style.display="none";
        
  
        //gets the saved score for user from database and display
        getScoreData(firebaseUser.uid); 
  
    } else {
        console.log("not logged in");
        btnLogout.classList.add('hide');
        btnLogin.classList.remove('hide');
        btnSignup.classList.remove('hide');
        txtEmail.style.display="block";
        txtPS.style.display="block";
        userName.style.display="block";
    }
  });


  