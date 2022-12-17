function deleteAllChildren(node){
    while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
}

function updateRepos(loginId){
    fetch(`https://api.github.com/users/${loginId}/repos`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        }).then(res => res.json()).then(data => {
            const repoList = document.querySelector("#repos-list");
            deleteAllChildren(repoList);
            for(repo of data){
                const repoListElem = document.createElement("li");
                repoList.appendChild(repoListElem);
                const repoLink = document.createElement("a");
                repoLink.href=repo["html_url"];
                repoLink.textContent=repo.name; 
                repoListElem.appendChild(repoLink);
            }
        })

}


const init = () => {
    document.addEventListener('submit', function(evt){
        evt.preventDefault();
        const requestedName = document.querySelector("#github-form").value;

        fetch(`https://api.github.com/search/users?q=${requestedName}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        }).then(res => res.json()).then(data => {
            const userList = document.querySelector("#user-list");
            deleteAllChildren(userList);
            const usersInResponse = data.items;
            for(user of usersInResponse){
                const userListElem = document.createElement("li");
                userList.appendChild(userListElem);
                const userLink = document.createElement("a");
                userLink.href="#";
                userLink.textContent=user.login; 
                userLink.addEventListener('click', (evt) => updateRepos(evt.target.textContent));
                userListElem.appendChild(userLink);
                
            }
        })
        evt.target.reset();
    });
}

function updateSummary(data){
    const titleNode = document.querySelector("#movieDetails h4");
    const summaryNode = document.querySelector("#movieDetails p");
    titleNode.textContent = data.title;
    summaryNode.textContent = data.summary;
}

document.addEventListener('DOMContentLoaded', init);