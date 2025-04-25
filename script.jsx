document.addEventListener("DOMContentLoaded", function () {
	const categoryLinks = document.querySelectorAll(".filter-category");
	const newsCards = document.querySelectorAll(".news-card");
	const sortDateSelect = document.getElementById("sort-date");
	const sortPopularitySelect = document.getElementById("sort-popularity");

	function filterNews() {
		const activeCategory = document.querySelector(".filter-category.active")
			.dataset.category;
		const dateSort = sortDateSelect.value;
		const popularitySort = sortPopularitySelect.value;

		let filtered = Array.from(newsCards);

		// Фільтрація за категорією
		if (activeCategory !== "all") {
			filtered = filtered.filter(
				(card) => card.dataset.category === activeCategory
			);
		}

		// Сортування за датою
		filtered.sort((a, b) => {
			const dateA = new Date(a.dataset.date);
			const dateB = new Date(b.dataset.date);
			return dateSort === "newest" ? dateB - dateA : dateA - dateB;
		});

		// Сортування за популярністю
		filtered.sort((a, b) => {
			const popA = parseInt(a.dataset.popularity);
			const popB = parseInt(b.dataset.popularity);
			return popularitySort === "most" ? popB - popA : popA - popB;
		});

		// Очищення та оновлення контейнера новин
		const container = document.getElementById("news-container");
		container.innerHTML = "";
		filtered.forEach((card) => container.appendChild(card));
	}

	// Клік по категорії
	categoryLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();
			categoryLinks.forEach((l) => l.classList.remove("active"));
			this.classList.add("active");
			filterNews();
		});
	});

	// Зміна сортувань
	sortDateSelect.addEventListener("change", filterNews);
	sortPopularitySelect.addEventListener("change", filterNews);

	// Ініціалізація при завантаженні
	filterNews();
});
