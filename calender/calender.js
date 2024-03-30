document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    const monthYearElement = document.getElementById('monthYear');
    const daysElement = document.querySelector('.days');
    const prevMonthButton = document.querySelector('.prevMonth');
    const nextMonthButton = document.querySelector('.nextMonth');
    const addEventForm = document.getElementById('addEventForm');
    const jumpToDayForm = document.getElementById('jumpToDayForm');

    // Events array to store added events
    let events = [];

    renderCalendar(currentYear, currentMonth);

    prevMonthButton.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentYear, currentMonth);
    });

    nextMonthButton.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentYear, currentMonth);
    });

    addEventForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const eventDate = new Date(document.getElementById('eventDate').value);
        const eventName = document.getElementById('eventName').value;
        events.push({ date: eventDate, name: eventName });
        renderCalendar(currentYear, currentMonth);
        addEventForm.reset();
    });

    jumpToDayForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const jumpToDate = new Date(document.getElementById('jumpToDate').value);
        const jumpToYear = jumpToDate.getFullYear();
        const jumpToMonth = jumpToDate.getMonth();
        renderCalendar(jumpToYear, jumpToMonth);
    });

    function deleteEvent(index) {
        events.splice(index, 1);
        renderCalendar(currentYear, currentMonth);
    }

    function renderCalendar(year, month) {
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        monthYearElement.textContent = `${firstDayOfMonth.toLocaleString('default', { month: 'long' })} ${year}`;

        daysElement.innerHTML = '';

        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        daysOfWeek.forEach(dayOfWeek => {
            const dayName = document.createElement('div');
            dayName.classList.add('dayName');
            dayName.textContent = dayOfWeek.substring(0, 3);
            daysElement.appendChild(dayName);
        });

        for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('day');
            daysElement.appendChild(emptyDay);
        }

        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            const day = document.createElement('div');
            day.classList.add('day');
            day.textContent = i;
            daysElement.appendChild(day);

            // Check if the current day has an event
            const eventForDay = events.find(event => event.date.getDate() === i && event.date.getMonth() === month && event.date.getFullYear() === year);
            if (eventForDay) {
                const eventIndicator = document.createElement('div');
                eventIndicator.classList.add('event');
                eventIndicator.textContent = eventForDay.name;
                
                // Add delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '❌';
                deleteButton.classList.add('deleteButton');
                deleteButton.addEventListener('click', function() {
                    deleteEvent(events.indexOf(eventForDay));
                });
                eventIndicator.appendChild(deleteButton);
                
                day.appendChild(eventIndicator);
            }
        }
    }
});
