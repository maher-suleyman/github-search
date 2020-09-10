// function to create a list of users
function createUsersList(json) {
  json.items.forEach((user) => {
    const result = document.createElement("h3");
    const userContainer = document.createElement("div");
    result;
    userContainer.setAttribute("class", "userContainer");
    const userInfoContainer = document.createElement("div");
    userInfoContainer.setAttribute("class", "userInfoContainer");
    const userTitle = document.createElement("h2");
    const userAvatar = document.createElement("img");
    const userReposBtn = document.createElement("div");
    const userReposContainer = document.createElement("dev");
    const userProfile = document.createElement("a");
    userReposBtn.innerHTML = `
      <button 
        type="button" 
        class="btn btn-info" 
        style="width: 100px; height: 35px;" 
        data-toggle="modal" data-target="#${user.login}Modal"
      >Repositories</button>
    `;
    userReposContainer.innerHTML = `
    <div class="modal fade" id="${user.login}Modal" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title text-left"><b>${user.login}</b>'s repositories</h4>
          </div>
          <div class="modal-body">
            <ul id="${user.login}Repos" class="userReposList">
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" style="width: 100px; height: 35px;" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `;

    userReposBtn.addEventListener("click", () => {
      getUserRepos(user.login, user.repos_url);
    });

    userTitle.innerHTML = user.login;
    userAvatar.setAttribute("src", `${user.avatar_url}`);
    userProfile.innerHTML = `go to <b>${user.login}</b> profile.`;
    userProfile.setAttribute("href", `${user.html_url}`);

    userInfoContainer.appendChild(userTitle);
    userInfoContainer.appendChild(userReposBtn);
    userInfoContainer.appendChild(userReposContainer);
    userInfoContainer.appendChild(userProfile);
    userContainer.appendChild(userAvatar);
    userContainer.appendChild(userInfoContainer);
    let searchResultUL = document.getElementById("user-list");
    searchResultUL.appendChild(userContainer);
    console.log("result", result);
  });
}

// function to show a list of user's repos
function getUserRepos(userTitle, reposURL) {
  let userReposList = document.getElementById(`${userTitle}Repos`);
  userReposList.innerHTML = "";

  fetch(reposURL)
    .then((response) => response.json())
    .then((json) => {
      function isEmpty(obj) {
        return Object.keys(obj).length === 0;
      }

      if (isEmpty(json)) {
        userReposList.innerHTML = `<h3>This user has NO repos!</h3>`;
      } else {
        const reposArray = [];
        json.forEach((repo) => {
          const repoItem = document.createElement("li");
          repoItem.innerHTML = repo.name;
          userReposList.appendChild(repoItem);
        });
      }
    });
}

// fetching users data of GitHub website
document.getElementById("github-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // clearing previous search results
  document.getElementById("user-list").innerHTML = "";
  // document.getElementById("repos-list").innerHTML = "";

  let search = document.getElementById("search").value;
  let url = "https://api.github.com/search/users?q=" + search;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then((json) => {
      createUsersList(json);
    });
});

window.onload = function () {
  console.log("Page loaded!");
};
