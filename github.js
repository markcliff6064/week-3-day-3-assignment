// ==========================================
// TASK 2: GITHUB PROFILE VIEWER
// ==========================================

// GitHub provides a public API that does not require
// an API key for basic requests.
const GITHUB_API = "https://api.github.com/users/";

// Get elements from the HTML page.
const githubForm = document.getElementById("githubForm");
const usernameInput = document.getElementById("username");

const githubLoading = document.getElementById("githubLoading");
const githubError = document.getElementById("githubError");
const profile = document.getElementById("profile");

const clearCacheBtn = document.getElementById("clearCacheBtn");


// ==========================================
// FETCH GITHUB PROFILE
// ==========================================

async function searchGithub(username) {

    // Clear previous information.
    githubError.textContent = "";
    profile.innerHTML = "";

    // Show loading state.
    githubLoading.textContent = "Loading profile...";

    try {

        /*
            First check whether we already have
            this user's profile stored in localStorage.
        */
        const cachedData = localStorage.getItem(`github_${username}`);

        if (cachedData) {

            const cached = JSON.parse(cachedData);

            // Work out how old the cached information is.
            const age = Date.now() - cached.timestamp;

            // Five minutes expressed in milliseconds.
            const fiveMinutes = 5 * 60 * 1000;

            // If the cached information is less than 5 minutes old,
            // use it instead of making another API request.
            if (age < fiveMinutes) {

                displayProfile(cached.profile, cached.repos);

                githubLoading.textContent = "Cached profile";

                return;
            }
        }


        // ==========================================
        // FETCH PROFILE
        // ==========================================

        const profileResponse =
            await fetch(`${GITHUB_API}${username}`);

        // A 404 means the GitHub user does not exist.
        if (profileResponse.status === 404) {
            throw new Error("GitHub user not found.");
        }

        if (!profileResponse.ok) {
            throw new Error("Unable to fetch GitHub profile.");
        }

        const user = await profileResponse.json();


        // ==========================================
        // FETCH REPOSITORIES
        // ==========================================

        const reposResponse = await fetch(
            `${GITHUB_API}${username}/repos?sort=stars&per_page=5`
        );

        if (!reposResponse.ok) {
            throw new Error("Unable to fetch repositories.");
        }

        const repos = await reposResponse.json();


        // ==========================================
        // SAVE TO LOCAL STORAGE
        // ==========================================

        /*
            Save both the profile and repositories.

            timestamp tells us when the information
            was downloaded.
        */
        localStorage.setItem(
            `github_${username}`,
            JSON.stringify({
                profile: user,
                repos: repos,
                timestamp: Date.now()
            })
        );


        // Display the profile.
        displayProfile(user, repos);

        githubLoading.textContent = "";

    } catch (error) {

        githubLoading.textContent = "";

        githubError.textContent =
            error.message || "Something went wrong.";

        console.error(error);
    }
}


// ==========================================
// DISPLAY PROFILE
// ==========================================

function displayProfile(user, repos) {

    /*
        The assignment specifically requires createElement.

        Instead of writing the whole profile using innerHTML,
        we create the HTML elements using JavaScript.
    */

    const profileCard = document.createElement("div");
    profileCard.className = "profile-card";


    // ==========================================
    // AVATAR
    // ==========================================

    const avatar = document.createElement("img");

    avatar.src = user.avatar_url;
    avatar.alt = `${user.login}'s GitHub avatar`;
    avatar.className = "avatar";

    profileCard.appendChild(avatar);


    // ==========================================
    // NAME
    // ==========================================

    const name = document.createElement("h2");

    name.textContent =
        user.name || user.login;

    profileCard.appendChild(name);


    // ==========================================
    // BIO
    // ==========================================

    const bio = document.createElement("p");

    bio.textContent =
        user.bio || "No bio available.";

    profileCard.appendChild(bio);


    // ==========================================
    // STATISTICS
    // ==========================================

    const stats = document.createElement("div");

    stats.className = "stats";

    stats.innerHTML = `
        <span>Followers: ${user.followers}</span>
        <span>Following: ${user.following}</span>
        <span>Repositories: ${user.public_repos}</span>
    `;

    profileCard.appendChild(stats);


    // ==========================================
    // REPOSITORY HEADING
    // ==========================================

    const repoHeading = document.createElement("h3");

    repoHeading.textContent = "Top 5 Repositories";

    profileCard.appendChild(repoHeading);


    // ==========================================
    // REPOSITORY LIST
    // ==========================================

    const repoList = document.createElement("ul");

    repoList.className = "repo-list";


    repos.forEach(function(repo) {

        // Create one list item for each repository.
        const repoItem = document.createElement("li");


        // Create repository name as a clickable link.
        const repoLink = document.createElement("a");

        repoLink.textContent = repo.name;
        repoLink.href = repo.html_url;
        repoLink.target = "_blank";

        repoItem.appendChild(repoLink);


        // Repository description.
        const description = document.createElement("p");

        description.textContent =
            repo.description || "No description available.";

        repoItem.appendChild(description);


        // Repository information.
        const repoInfo = document.createElement("small");

        repoInfo.textContent =
            `⭐ ${repo.stargazers_count} | Language: ${repo.language || "Not specified"}`;

        repoItem.appendChild(repoInfo);


        // Add repository to the list.
        repoList.appendChild(repoItem);
    });


    profileCard.appendChild(repoList);


    // Add everything to the page.
    profile.appendChild(profileCard);
}


// ==========================================
// FORM SUBMISSION
// ==========================================

githubForm.addEventListener("submit", function(event) {

    // Prevent the browser from refreshing the page.
    event.preventDefault();

    const username = usernameInput.value.trim();

    // Do not search if the input is empty.
    if (!username) {
        githubError.textContent =
            "Please enter a GitHub username.";
        return;
    }

    searchGithub(username);
});


// ==========================================
// CLEAR CACHE
// ==========================================

clearCacheBtn.addEventListener("click", function() {

    /*
        The GitHub data is stored using keys such as:

        github_torvalds
        github_octocat

        localStorage.clear() would remove unrelated
        information from other applications, so we only
        remove keys beginning with "github_".
    */

    Object.keys(localStorage).forEach(function(key) {

        if (key.startsWith("github_")) {
            localStorage.removeItem(key);
        }
    });

    githubLoading.textContent = "GitHub cache cleared.";
    profile.innerHTML = "";
});