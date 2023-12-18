birth_day = document.getElementById("dob")
result = document.getElementById('result');

const ageCalculate = () => {
    const today = new Date();
    const inputDate = new Date(birth_day.value);

    if (birth_day.value.length > 0) {

        const birthDetails = {
            date: inputDate.getDate(),
            month: inputDate.getMonth() + 1,
            year: inputDate.getFullYear(),
        };

        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1;
        const currentDate = today.getDate();

        if (isFutureDate(birthDetails, currentYear, currentMonth, currentDate)) {
            displayResult("-", "-", "-");
            result.innerText = `You are not Born yet!`;
            result.style.color = "red"
            speak()
            return;
        }

        const { years, months, days } = calculateAge(
            birthDetails,
            currentYear,
            currentMonth,
            currentDate
        );

        displayResult(days, months, years);
    } else {
        alertmessage()
        result.innerText = "Please enter your Birthday date.";
    }
};

const isFutureDate = (birthDetails, currentYear, currentMonth, currentDate) => {
    return (
        birthDetails.year > currentYear ||
        (birthDetails.year === currentYear &&
            (birthDetails.month > currentMonth ||
                (birthDetails.month === currentMonth &&
                    birthDetails.date > currentDate)))
    );
};

const calculateAge = (birthDetails, currentYear, currentMonth, currentDate) => {
    let years = currentYear - birthDetails.year;
    let months, days;

    if (currentMonth < birthDetails.month) {
        years--;
        months = 12 - (birthDetails.month - currentMonth);
    } else {
        months = currentMonth - birthDetails.month;
    }

    if (currentDate < birthDetails.date) {
        months--;
        const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const daysInLastMonth = getDaysInMonth(lastMonth, currentYear);
        days = daysInLastMonth - (birthDetails.date - currentDate);
    } else {
        days = currentDate - birthDetails.date;
    }
    return { years, months, days };
};

const getDaysInMonth = (month, year) => {
    const isLeapYear = year % 4 === 0 && (year % 100 != 0 || year % 400 === 0);
    const getDaysInMonth = [
        31,
        isLeapYear ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];
    return getDaysInMonth[month - 1];
};

const displayResult = (bdate, bMonth, bYear) => {
    result.innerText = `You are ${bYear} year, ${bMonth} month and ${bdate} days old.`;
    result.style.color = "green"
};

function alertmessage() {
    result.innerText = "Please enter your Birthday date.";
    result.style.color = "red"
    speak()
}

function speak() {
    speak_text = new SpeechSynthesisUtterance(result.innerText);
    speechSynthesis.speak(speak_text);
}

