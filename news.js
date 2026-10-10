// ==========================================
// TASK 3: NEWS HEADLINE AGGREGATOR
// ==========================================

/*
    We are using sample data instead of GNews.

    This allows us to focus on the important assignment
    skills: arrays, filtering, DOM manipulation and
    displaying information on the page.
*/

const sampleArticles = [

    {
        title: "Safaricom Launches New M-Pesa Feature",
        source: "Business Daily",
        date: "2026-05-03",
        url: "#",
        category: "technology"
    },

    {
        title: "Kenya's Tech Hub Growth Surges in 2026",
        source: "TechCrunch",
        date: "2026-05-02",
        url: "#",
        category: "technology"
    },

    {
        title: "New Technology Startups Attract More Investors",
        source: "Tech News",
        date: "2026-05-01",
        url: "#",
        category: "technology"
    },

    {
        title: "Kenya Business Sector Reports Strong Growth",
        source: "Business Daily",
        date: "2026-04-30",
        url: "#",
        category: "business"
    },

    {
        title: "Small Businesses Adopt Digital Payment Systems",
        source: "Business Weekly",
        date: "2026-04-29",
        url: "#",
        category: "business"
    },

    {
        title: "Kenyan Athletes Prepare for Major Competition",
        source: "Sports News",
        date: "2026-04-28",
        url: "#",
        category: "sports"
    },

    {
        title: "Local Football Clubs Begin New Season",
        source: "Sports Daily",
        date: "2026-04-27",
        url: "#",
        category: "sports"
    },

    {
        title: "New Health Campaign Encourages Regular Exercise",
        source: "Health News",
        date: "2026-04-26",
        url: "#",
        category: "health"
    },

    {
        title: "Doctors Highlight Importance of Preventive Healthcare",
        source: "Medical Daily",
        date: "2026-04-25",
        url: "#",
        category: "health"
    },

    {
        title: "Digital Healthcare Services Expand Across Kenya",
        source: "Health Today",
        date: "2026-04-24",
        url: "#",
        category: "health"
    }

];


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const categorySelect =
    document.getElementById("category");

const newsList =
    document.getElementById("newsList");

const newsLoading =
    document.getElementById("newsLoading");

const newsError =
    document.getElementById("newsError");


// ==========================================
// DISPLAY NEWS
// ==========================================

function displayNews(category = "all") {

    // Clear old articles before displaying new ones.
    newsList.innerHTML = "";

    newsError.textContent = "";

    // Show a loading message briefly.
    newsLoading.textContent = "Loading headlines...";


    /*
        filter() creates a new array containing only
        articles that match the selected category.

        If "all" is selected, every article is displayed.
    */

    const filteredArticles =
        category === "all"
            ? sampleArticles
            : sampleArticles.filter(function(article) {
                return article.category === category;
            });


    // ==========================================
    // HANDLE EMPTY RESULTS
    // ==========================================

    if (filteredArticles.length === 0) {

        newsLoading.textContent = "";

        newsError.textContent =
            "No articles found for this category.";

        return;
    }


    // ==========================================
    // CREATE ARTICLE CARDS
    // ==========================================

    filteredArticles.forEach(function(article) {

        const articleCard =
            document.createElement("article");

        articleCard.className = "news-card";


        // Article title
        const title =
            document.createElement("h2");

        title.textContent = article.title;


        // Source name
        const source =
            document.createElement("p");

        source.textContent =
            `Source: ${article.source}`;


        // Format the date so it is easier to read.
        const date =
            document.createElement("p");

        const formattedDate =
            new Date(article.date).toLocaleDateString(
                "en-KE",
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            );

        date.textContent =
            `Published: ${formattedDate}`;


        // Read More link
        const readMore =
            document.createElement("a");

        readMore.textContent = "Read More";
        readMore.href = article.url;
        readMore.target = "_blank";


        // Put all article information into the card.
        articleCard.appendChild(title);
        articleCard.appendChild(source);
        articleCard.appendChild(date);
        articleCard.appendChild(readMore);


        // Add the card to the page.
        newsList.appendChild(articleCard);
    });


    // Loading message is no longer needed.
    newsLoading.textContent = "";
}


// ==========================================
// CATEGORY FILTER
// ==========================================

categorySelect.addEventListener("change", function() {

    // Get the category selected by the user.
    const selectedCategory = categorySelect.value;

    // Display only matching articles.
    displayNews(selectedCategory);
});


// ==========================================
// START APPLICATION
// ==========================================

displayNews();