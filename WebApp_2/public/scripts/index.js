const gameList = document.querySelector('.Games');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

// Displays the Navbar menus if the user is logged in or logged out
const setupUI = (user) => {
  if(user) {
    // Account Info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
      <dv>Email: ${user.email}</div>
      <div>Username: ${doc.data().username}</div>
      `;
      accountDetails.innerHTML = html;
    });
    
    // Toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // Hide Account Info
    accountDetails.innerHTML = '';
    // Toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

// Setup Games
const setupGames = (data) => {
  if(data.length){
    let html = '';
    data.forEach(doc => { 
      const game = doc.data();
      const li = `
        <li>
          <div class="collapsible-header black blue-text text-darken-1">${game.Name}</div>
          <div class="collapsible-body blue lighten-5 black-text">${game.Description}</div>
        </li>
      `;
      html += li
    });

    gameList.innerHTML = html;
  
  } else {

    gameList.innerHTML = '<h5 class ="center-align">Please Login or Sign up to view the List of Games</h5>'
  }
}

// Setup materialize components
document.addEventListener('DOMContentLoaded', function() {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
  
  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});

$(document).ready(function(){
  $('.sidenav').sidenav();
});