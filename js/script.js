const itemsPerPage = 2;
let currentPage = 1;

function displayArticles(pageNumber) {
    const articlesContainer = document.getElementById("articles");
    const articlesElements = articlesContainer.querySelectorAll(".article");

    articlesElements.forEach((articleElement, index) => {
        if (index >= (pageNumber - 1) * itemsPerPage && index < pageNumber * itemsPerPage) {
            articleElement.style.display = "block";
        } else {
            articleElement.style.display = "none";
        }
    });
}

function updatePagination() {
    const articlesContainer = document.getElementById("articles");
    const articlesElements = articlesContainer.querySelectorAll(".article");
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(articlesElements.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.addEventListener("click", () => {
            currentPage = i;
            displayArticles(currentPage);
        });
        pagination.appendChild(button);
    }
}

function updateCategoryFilter() {
    const filterCategory = document.getElementById("filterCategory");
    const articlesContainer = document.getElementById("articles");
    const articlesElements = articlesContainer.querySelectorAll(".article");

    filterCategory.addEventListener("change", () => {
        const selectedCategory = filterCategory.value;

        articlesElements.forEach(articleElement => {
            if (selectedCategory === "all" || articleElement.classList.contains(selectedCategory)) {
                articleElement.style.display = "block";
            } else {
                articleElement.style.display = "none";
            }
        });

        currentPage = 1;
        updatePagination();
    });
}

function updateSearchFilter() {
    const searchInput = document.getElementById("searchInput");
    const articlesContainer = document.getElementById("articles");
    const articlesElements = articlesContainer.querySelectorAll(".article");

    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.trim().toLowerCase();

        articlesElements.forEach(articleElement => {
            const titleElement = articleElement.querySelector("h2");
            const articleTitle = titleElement.textContent.toLowerCase();

            if (searchText === "" || articleTitle.includes(searchText)) {
                articleElement.style.display = "block";
            } else {
                articleElement.style.display = "none";
            }
        });

        currentPage = 1;
        updatePagination();
    });
}

window.addEventListener("DOMContentLoaded", () => {
    displayArticles(currentPage);
    updatePagination();
    updateCategoryFilter();
    updateSearchFilter();
});