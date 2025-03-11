// Импортируем данные
import { workouts } from './data.js';
const workoutsInfo = JSON.parse(workouts);

// Функция рендеринга расписания
function renderWorkoutSchedule(workoutsInfo) {
    const scheduleBox = document.querySelector('.schedule-box');
    
    workoutsInfo.forEach((item, index) => {
        const isFull = item.current_number_of_participants >= item.max_number_of_participants;
        
        const html = ` <div class="schedule_item-box" id="${item.name_of_workout}"> <div class="schedule_item"> <p class="schedule_item-title">${item.name_of_workout}</p> <p class="schedule_item-time">${item.time_of_workout}</p> <p class="schedule_item-maxnumber">Максимальное количество участников: <span>${item.max_number_of_participants}</span></p> <p data-id=${item.id} class="schedule_item-currentnumber">Текущее количество записанных участников: <span>${item.current_number_of_participants}</span></p> <div class="button-box"> <button class="button-submit ${isFull ? 'disabled' : ''}" id="${item.id}">Записаться</button> <button class="button-reject ${!isFull ? 'disabled' : ''}" data-id="${item.name_of_workout}">Отменить запись</button> </div> </div> </div> `;
        
        scheduleBox.insertAdjacentHTML('beforeend', html);
    });
}

// Обновляем интерфейс после изменений
function updateUI(index) {
    const currentNumberSpan = document.querySelector(`[data-id="${workoutsInfo[index].id}"] span`);
    currentNumberSpan.textContent = workoutsInfo[index].current_number_of_participants;
    
    const submitButton = document.getElementById(`${workoutsInfo[index].id}`);
    const rejectButton = document.querySelector(`[data-id="${workoutsInfo[index].name_of_workout}"]`);
    
    if (workoutsInfo[index].current_number_of_participants >= workoutsInfo[index].max_number_of_participants) {
        submitButton.disabled = true;
        rejectButton.disabled = false;
    } else {
        submitButton.disabled = false;
        rejectButton.disabled = true;
    }
}

// Рендерим расписание
renderWorkoutSchedule(workoutsInfo);

// Добавляем обработчики событий
document.querySelectorAll('.button-submit').forEach(button => {
    button.addEventListener('click', () => {
        const index = button.id - 1;
        
        if (workoutsInfo[index].current_number_of_participants < workoutsInfo[index].max_number_of_participants) {
            workoutsInfo[index].current_number_of_participants++;
            updateUI(index);
        }
    });
});

document.querySelectorAll('.button-reject').forEach(button => {
    button.addEventListener('click', () => {
        const workoutName = button.dataset.id;
        const index = workoutsInfo.findIndex(item => item.name_of_workout === workoutName);
        
        if (workoutsInfo[index].current_number_of_participants > 0) {
            workoutsInfo[index].current_number_of_participants--;
            updateUI(index);
        }
    });
});