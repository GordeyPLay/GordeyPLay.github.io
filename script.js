const firebaseDatabaseURL = "https://so2project-2e2b2-default-rtdb.firebaseio.com/";
const username = localStorage.getItem('username'); // Получаем логин из localStorage

if (!username) {
    alert("Пожалуйста, войдите в систему");
    window.location.href = 'login.html'; // Перенаправляем на страницу входа, если логин не найден
}

const inventoryURL = `${firebaseDatabaseURL}users/${username}/inventory.json`; // URL для инвентаря
const goldURL = `${firebaseDatabaseURL}users/${username}/gold.json`; // URL для золота

// Пример доступных скинов для покупки
const skinsForSale = [
    { name: "M4_Samurai", price: 500 },
    { name: "Deagle_Aureate", price: 99999 }
];

// Функция для получения золота пользователя
async function fetchGold() {
    const goldResponse = await fetch(goldURL);
    const goldData = await goldResponse.json();
    return goldData && goldData.gold ? goldData.gold : 0; // Извлекаем количество золота
}

// Функция для отображения доступных скинов
async function displaySkins() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = ''; // Очищаем список

    const goldAmount = await fetchGold(); // Получаем текущее количество золота
    document.getElementById('balance').textContent = goldAmount; // Отображаем золото

    skinsForSale.forEach(skin => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        const skinName = document.createElement('span');
        skinName.textContent = skin.name;

        const skinPrice = document.createElement('span');
        skinPrice.textContent = `Цена: ${skin.price} золота`;

        const buyButton = document.createElement('button');
        buyButton.className = 'buy-button';
        buyButton.textContent = 'Купить';
        buyButton.disabled = goldAmount < skin.price; // Делаем кнопку недоступной, если недостаточно золота

        // Обработчик события для покупки
        buyButton.onclick = () => purchaseSkin(skin.name, skin.price);

        itemDiv.appendChild(skinName);
        itemDiv.appendChild(skinPrice);
        itemDiv.appendChild(buyButton);
        itemList.appendChild(itemDiv);
    });
}

// Функция для покупки скина
async function purchaseSkin(skinName, skinPrice) {
    try {
        const goldAmount = await fetchGold(); // Получаем текущее количество золота
        if (goldAmount < skinPrice) {
            alert("Недостаточно золота для покупки!");
            return;
        }

        // Уменьшаем золото
        const newGoldAmount = goldAmount - skinPrice;
        await fetch(goldURL, {
            method: 'PATCH',
            body: JSON.stringify({ gold: newGoldAmount })
        });

        // Добавляем скин в инвентарь
        const inventoryResponse = await fetch(inventoryURL);
        const inventoryData = await inventoryResponse.json();
        const itemNames = inventoryData.ItemNames || [];
        itemNames.push(skinName); // Добавляем новый скин
        await fetch(inventoryURL, {
            method: 'PATCH',
            body: JSON.stringify({ ItemNames: itemNames })
        });

        alert("Скин успешно куплен!");
        displaySkins(); // Обновляем список скинов и золота
    } catch (error) {
        console.error("Ошибка при покупке скина:", error);
        alert("Ошибка при покупке: " + error.message);
    }
}

// Загружаем доступные скины при загрузке страницы
displaySkins();
