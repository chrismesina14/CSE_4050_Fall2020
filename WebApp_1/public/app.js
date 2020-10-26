const gamesList = document.querySelector('#games-list');
const form = document.querySelector('#add-games-form');

// Create an element and render game
function renderGame(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let platform = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    platform.textContent = doc.data().platform;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(platform);
    li.appendChild(cross);

    gamesList.appendChild(li);

    // Deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('games').doc(id).delete();
    })
}

// Real-time listener
db.collection('games').orderBy('platform').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderGame(change.doc);
        }
        else if(change.type == 'removed'){
            let li = gamesList.querySelector('[data-id=' + change.doc.id + ']');
            gamesList.removeChild(li);
        }
    })
})

// Saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('games').add({
        name: form.name.value,
        platform: form.platform.value
    });
    form.name.value = ' ';
    form.platform.value = ' ';
})

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Get elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

// Add login event
btnLogin.addEventListener('click', e => {
    // Get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

// Add signup event
btnSignUp.addEventListener('click', e => {
    // Get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    // Sign up
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

btnLogout.addEventListener('click', (e) => {
    firebase.auth().signOut();
});

// Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        console.log(firebaseUser);
        btnLogout.classList.remove('hide');
    } else {
        console.log('Not Logged in');
        btnLogout.classList.add('hide');
    }
});