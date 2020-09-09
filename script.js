// function to create a list of users
function createUsersList (json) {

  json.items.forEach( user => {

    // creating list for each user
    let li1 = document.createElement("li");
    let li2 = document.createElement("li");
    let li3 = document.createElement("li");
    let li4 = document.createElement("li");
    let btn= document.createElement("button");
    let img = document.createElement("img");
    let anchor = document.createElement("a");
    let br = document.createElement("br");

    // Saving data to every user into a list
    li1.innerHTML = `<b style="font-size: large">UserName: <span style="color:#449970">${user.login}</span>  </b>`;
    img.setAttribute("src", `${user.avatar_url}`);
    img.setAttribute("width", `${75}`);
    li3.appendChild(img);

    // creating link to user's profile
    anchor.innerHTML = `go to <b>${user.login}</b> profile.`;
    anchor.setAttribute("href", `${user.html_url}`);
    li4.appendChild(anchor);

    // setting up a button for user's repos
    btn.textContent = "repos";
    btn.addEventListener("click", function () {
      showUserRepos(user.login, user.repos_url);
    });

    li2.classList.add("none_li");
    li3.classList.add("none_li");
    li4.classList.add("none_li");

    // Appending children elements of user list
    let ul = document.getElementById("user-list");
    li2.appendChild(btn);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(br);

  });

}


// function to show a list of user's repos
function showUserRepos (userName, reposURL) {

  let repos = document.getElementById("repos-list");
  repos.scrollIntoView(); // scrolling to user's repos list
  repos.innerHTML = "";

  fetch(reposURL)
  .then(function(response) {
    return response.json();})
  .then( json => {

    function isEmpty (obj) {
      return Object.keys(obj).length === 0;
    }

    if ( isEmpty(json) ) {

      let liName = document.createElement("li");
      liName.innerHTML=`<b>Repositories of <span style="color:#862C4B"><i>${userName}</i></span> :<b>`;
      let ulRepos = document.createElement("ul");
      let liRepo = document.createElement("li");
      liRepo.classList.add("none_li");
      liRepo.innerHTML = `<h3 style="color:#756d67">Sorry! this user has NO repos !!</h3>`;
      ulRepos.appendChild(liRepo);
      liName.appendChild(ulRepos);
      repos.appendChild(liName);

    } else {

      let liName = document.createElement("li");
      liName.innerHTML=`<b>Repositories of <span style="color:#862C4B"><i>${userName}</i></span> :<b>`;

      // a loop to create list of all user's respos
      json.forEach( repo => {
        let ulRepos = document.createElement("ul");
        let liRepo = document.createElement("li");
        liRepo.classList.add("circle_li");
        liRepo.innerHTML = repo.name;
        ulRepos.appendChild(liRepo);
        liName.appendChild(ulRepos);
      });

      repos.appendChild(liName);
    }

  });

}


// fetching users data of GitHub website 
document.getElementById("github-form").addEventListener("submit", function(e){
  e.preventDefault();

  // clearing previous search results
  document.getElementById("user-list").innerHTML = "";
  document.getElementById("repos-list").innerHTML = "";

  let search = document.getElementById("search").value;
  let url = "https://api.github.com/search/users?q=" + search;

  fetch(url)
  .then(function(response) {
    return response.json();})
  .then( json => {
    createUsersList(json);
  });

});



window.onload = function() {
  console.log("Page loaded!");
};

