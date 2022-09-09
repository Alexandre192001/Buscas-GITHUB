const users = [];
async function fetchUser(userName) {
    const response = await fetch(`https://api.github.com/users/${userName}`);
    const user = await response.json();
    if (user.message) {
        console.log("Usuario não encontrado");
    }
    else {
        users.push(user);
        console.log(`User: ${user.login} \n Name: ${user.name} \n Bio: ${user.bio} \n Repo: ${user.public_repos}`);
    }
}
async function ShowUser(userName) {
    const user = users.find((user) => user.login === userName);
    if (typeof user === "undefined") {
        console.log("Usuário não encontrado");
    }
    else {
        const response = await fetch(user.repos_url);
        const repositorio = await response.json();
        let message = ` id:${user.id} \n name:${user.name} \n Bio: ${user.bio} \n Repositorios publicos: ${user.public_repos}`;
        repositorio.forEach((repo) => {
            message += `\n Nome: ${repo.name} \n Descrição: ${repo.description} \n Estrelas: ${repo.stargazers_count} \n Fork: ${repo.fork}`;
        });
        console.log(message);
    }
}
