// Загрузка инвентаря из Firebase
document.addEventListener("DOMContentLoaded", function () {
    const userLogin = localStorage.getItem('userLogin'); // Получаем логин пользователя из localStorage

    const databaseURL = `https://so2project-2e2b2-default-rtdb.firebaseio.com/users/${userLogin}/inventory/ItemNames.json`;

    fetch(databaseURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть не отвечает');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Проверяем, что данные загружаются
            displayItems(data); // Вызов функции для отображения предметов
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });

    function displayItems(items) {
        const itemList = document.getElementById('itemList');
        itemList.innerHTML = ''; // Очищаем элемент перед добавлением новых элементов
        
        if (items) {
            items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.textContent = item; // Добавляем текст с названием предмета
                itemList.appendChild(itemElement);
            });
        } else {
            itemList.textContent = 'Инвентарь пуст.';
        }
    }
});
