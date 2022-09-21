const users = [];
const fetchUser = document.querySelector(".buscar")
fetchUser.addEventListener("click", async () => {
    const userName = document.querySelector(".user").value;
    const response = await fetch(`https://api.github.com/users/${userName}`);
    const user = await response.json();
    if (user.message) {
        console.log("Usuario não encontrado");
    } else {
        // Campos para preenchimento
        const loginUser = document.querySelector(".login-user")
        const nameUser = document.querySelector(".name-user")
        const bioUser = document.querySelector(".bio-user")
        const repoUser = document.querySelector(".repo-user")

        users.push(user);

        // Adicionando os dados nos campos
        loginUser.innerHTML = user.login
        nameUser.innerHTML = user.name
        bioUser.innerHTML = user.bio
        repoUser.innerHTML = user.public_repos

        ShowUser(userName)

        document.querySelector(".user").value = ""
    }
})
async function ShowUser(userName) {
    const user = users.find((user) => user.login === userName);
    if (typeof user === "undefined") {
        console.log("Usuário não encontrado");
    } else {
        const response = await fetch(user.repos_url);
        const repositorio = await response.json();
        repositorio.map((repo) => {
            // componentes para ser preenchidos

            let repoUser = document.createElement("div")
            repoUser.innerHTML = `
            <h2>Nome: ${repo.name}</h2>
            <h3>Descrição: ${repo.description}</h3>
            <p>Número de estrelas: ${repo.stargazers_count}</p>
            <p>Fork: ${repo.fork}</p>
            <hr>`
            document.querySelector(".card-repo").append(repoUser)

        });
    }
}