const itemsPerPage = 6;
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

    // Bouton "précédent"
    const prevButton = document.createElement("button");
    prevButton.textContent = "Précédent";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => {
        currentPage--;
        displayArticles(currentPage);
        updatePagination();
    });
    pagination.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("pagination-button");
        if (i === currentPage) {
            button.classList.add("active");
        }
        button.addEventListener("click", () => {
            currentPage = i;
            displayArticles(currentPage);
            updatePagination();
        });
        pagination.appendChild(button);
    }

    // Bouton "Suivant"
    const nextButton = document.createElement("button");
    nextButton.textContent = "Suivant";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => {
        currentPage++;
        displayArticles(currentPage);
        updatePagination();
    });
    pagination.appendChild(nextButton);
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


function limitContentTo150Chars() {
    const paragraphs = document.querySelectorAll(".article p");
    paragraphs.forEach((paragraph) => {
        const content = paragraph.textContent;
        if (content.length > 150) {
            paragraph.textContent = content.slice(0, 150) + "...";
        }
    });
}

window.addEventListener("DOMContentLoaded", () => {
    displayArticles(currentPage);
    updatePagination();
    updateCategoryFilter();
    updateSearchFilter();
    limitContentTo150Chars();
});