document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
  
    function fetchUsers(searchTerm) {
      fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((response) => response.json())
        .then((data) => displayUsers(data.items))
        .catch((error) => console.error("Error fetching users:", error));
    }
  
    function displayUsers(users) {
      userList.innerHTML = "";
      reposList.innerHTML = ""; 
  
      users.forEach((user) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <h3>${user.login}</h3>
          <img src="${user.avatar_url}" alt="${user.login}" width="100" height="100">
          <a href="${user.html_url}" target="_blank">View Profile</a>
        `;
        li.addEventListener("click", () => fetchRepos(user.login));
        userList.appendChild(li);
      });
    }
  
    function fetchRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((response) => response.json())
        .then((repos) => displayRepos(repos))
        .catch((error) => console.error("Error fetching repos:", error));
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = "";
  
      repos.forEach((repo) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <h4>${repo.name}</h4>
          <a href="${repo.html_url}" target="_blank">View Repository</a>
          <p>Description: ${repo.description || "No description provided"}</p>
        `;
        reposList.appendChild(li);
      });
    }
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        fetchUsers(searchTerm);
      }
      searchInput.value = ""; 
    });
  });
  