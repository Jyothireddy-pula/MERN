const movieData = {
    "2025-03-27": ["Avengers: Endgame", "GOAT"],
    "2025-03-28": ["Interstellar", "Kalki"],
    "2025-03-29":["MAD","NONE"]
};

const theatreData = {
    "Avengers: Endgame": ["PVR Cinemas", "INOX"],
    "GOAT": ["Cinepolis", "Carnival Cinemas"],
    "Interstellar": ["PVR IMAX", "Galaxy Cinema"],
    "Kalki ": ["INOX", "Cinepolis"],
    "MAD":["Cinepolis", "Carnival Cinemas"],
    "NONE":["PVR","Cinepolis"]
};

const ticketPrice = 200; 

function showMovies() {
    const date = document.getElementById("movieDate").value;
    const movieList = document.getElementById("movieList");
    movieList.innerHTML = "";

    if (movieData[date]) {
        movieData[date].forEach(movie => {
            const movieBtn = document.createElement("button");
            movieBtn.textContent = movie;
            movieBtn.onclick = () => showTheatres(movie);
            movieList.appendChild(movieBtn);
        });
    } else {
        movieList.innerHTML = "<p>No movies available on this date.</p>";
    }
}

function showTheatres(movie) {
    const theatreSelect = document.getElementById("theatreSelect");
    theatreSelect.innerHTML = "";

    theatreData[movie].forEach(theatre => {
        const option = document.createElement("option");
        option.textContent = theatre;
        theatreSelect.appendChild(option);
    });

    document.getElementById("theatreSection").style.display = "block";
    document.getElementById("bookingForm").style.display = "block";
}

function calculateTotal() {
    const tickets = document.getElementById("tickets").value;
    document.getElementById("totalPrice").textContent = tickets * ticketPrice;
}

function redirectToConfirmation(event) {
    event.preventDefault();

    const date = document.getElementById("movieDate").value;
    const movie = document.getElementById("movieList").querySelector("button").textContent;
    const theatre = document.getElementById("theatreSelect").value;
    const tickets = document.getElementById("tickets").value;
    const total = document.getElementById("totalPrice").textContent;

    if (!date || !movie || !theatre || !tickets || total === "0") {
        alert("Please complete the booking details.");
        return;
    }

   
    window.location.href = `confirmation.html?date=${date}&movie=${movie}&theatre=${theatre}&tickets=${tickets}&total=${total}`;



}