const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherDiv = document.querySelector('.weatherInformation')
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value


    fetch('/weather?address=' + location)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                weatherDiv.innerHTML = ` <p> ${data.error} </p>`

            } else {

                weatherDiv.innerHTML =
                    `<p><b> Location:</b> ${data.location} </p>
                 <p><b> Current Temperature:</b> ${data.temperature} Fahrenheit </p
                 <p> <b>Rain Chance:</b> ${data.rainchance}% </p
                `
            }
        })
})




