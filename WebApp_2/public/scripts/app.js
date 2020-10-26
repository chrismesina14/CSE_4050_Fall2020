// Listen for auth status changes
auth.onAuthStateChanged(user => {
    if(user) {
        // Get Data
        db.collection('Games').onSnapshot(snapshot => {
        setupGames(snapshot.docs);
        setupUI(user);
    }, err => {
        console.log(err.message);
    });
} else {
    setupUI();
    setupGames([]);
    } 
});

// Add new game
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('Games').add({
        Name: createForm['name'].value,
        Description: createForm['description'].value
    }).then(() => {
        // Closes the signup modal and resets the form
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }).catch(err => {
        console.log(err.message);
    })
});

// Sign Up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // Sign Up the User
    // Create the user -> Create the user document inside the user's collection inside the username
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            username: signupForm['signup-username'].value
        });
    }).then(() => {
        // Closes the signup modal and resets the form
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        // Displays an error message when inputting wrong detail e.g. email or password
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    });
});

// Logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut();
});

// Log in
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // Log in the User
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // Closes the login modal and resets the form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        // Displays an error message when inputting wrong detail e.g. email or password
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    });
});

/* Add Admin Cloud Functions
const adminForm = document.querySelector('#admin-email').value;
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({ email: adminEmail }).then(result => {
        console.log(result);
    });
});
*/