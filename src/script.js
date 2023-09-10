       // Získání aktuálního měsíce a roku
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();

        // Funkce pro zjištění počtu dnů v měsíci
        function getDaysInMonth(month, year) {
            return new Date(year, month + 1, 0).getDate();
        }

        // Funkce pro zjištění prvního dne v měsíci (0 = Neděle, 1 = Pondělí, ...)
        function getFirstDayOfMonth(month, year) {
            const firstDay = new Date(year, month, 1).getDay();
            return firstDay === 0 ? 6 : firstDay - 1; // Převod na indexy pondělí (0) až neděle (6)
        }

        // Generování kalendáře
        function generateCalendar() {
            const table = document.querySelector('table');
            const daysInMonth = getDaysInMonth(currentMonth, currentYear);
            const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
            let dayCounter = 1;

            // Nastavení názvu aktuálního měsíce a roku
            const currentMonthYear = document.getElementById('currentMonthYear');
            currentMonthYear.textContent = `${currentMonth + 1}. ${currentYear}`;

            for (let i = 0; i < 6; i++) {
                const newRow = table.insertRow();
                newRow.id = `week-${i + 1}`;

                for (let j = 0; j < 7; j++) {
                    if (i === 0 && j < firstDay) {
                        newRow.insertCell().textContent = '';
                    } else if (dayCounter <= daysInMonth) {
                        const cell = newRow.insertCell();
                        cell.textContent = dayCounter;
                        dayCounter++;

                        if (dayCounter - 1 === new Date().getDate() && currentMonth === new Date().getMonth()) {
                            cell.classList.add('current-day');
                        }
                    }
                }
            }
        }

        // Obsluha tlačítek pro přechod mezi měsíci
        const prevMonthButton = document.getElementById('prevMonth');
        const nextMonthButton = document.getElementById('nextMonth');

        prevMonthButton.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            clearCalendar();
            generateCalendar();
        });

        nextMonthButton.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            clearCalendar();
            generateCalendar();
        });

        // Vymazání stávajícího kalendáře
        function clearCalendar() {
            const table = document.querySelector('table');
            while (table.rows.length > 1) {
                table.deleteRow(1);
            }
        }

        generateCalendar();