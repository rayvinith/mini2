document.addEventListener('DOMContentLoaded', function() {
    const menuItemsContainer = document.getElementById('menu-items');
    const sortOptions = document.getElementById('sortOptions');
    const priceFilter = document.getElementById('priceFilter');
    const priceRange = document.getElementById('priceRange');

    let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];

    displayMenuItems(menuItems);

    sortOptions.addEventListener('change', function() {
        const sortedItems = sortMenuItems(menuItems, sortOptions.value);
        displayMenuItems(sortedItems);
    });

    priceFilter.addEventListener('input', function() {
        priceRange.textContent = `0 - ${priceFilter.value}`;
        const filteredItems = filterMenuItemsByPrice(menuItems, parseFloat(priceFilter.value));
        displayMenuItems(filteredItems);
    });

    function displayMenuItems(items) {
        menuItemsContainer.innerHTML = items.map(item => `
            <div class="col-md-4 mb-3">
                <div class="card h-100">
                    <img src="${item.imageUrl}" class="card-img-top" alt="${item.name}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">$${item.price}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function sortMenuItems(items, sortOrder) {
        if (sortOrder === 'asc') {
            return items.slice().sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            return items.slice().sort((a, b) => b.price - a.price);
        }
        return items;
    }

    function filterMenuItemsByPrice(items, maxPrice) {
        return items.filter(item => item.price <= maxPrice);
    }
});
