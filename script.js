document.addEventListener("DOMContentLoaded", function () {
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const countrySelect = document.getElementById("country");
  const scoreInput = document.getElementById("score");
  const addScoreButton = document.getElementById("addScore");
  const leaderboardBody = document.querySelector("#leaderboard tbody");

  addScoreButton.addEventListener("click", function () {
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const country = countrySelect.value;
    const score = parseInt(scoreInput.value.trim());

    if (firstName && lastName && country && !isNaN(score)) {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${country}</td>
                <td>${score}</td>
                <td class="actions">
                    <button class="increase">+5</button>
                    <button class="decrease">-5</button>
                    <button class="delete">Delete</button>
                </td>
            `;
      leaderboardBody.appendChild(row);

      const increaseButton = row.querySelector(".increase");
      const decreaseButton = row.querySelector(".decrease");
      const deleteButton = row.querySelector(".delete");

      increaseButton.addEventListener("click", function () {
        const scoreCell = row.children[3];
        let currentScore = parseInt(scoreCell.textContent);
        currentScore += 5;
        scoreCell.textContent = currentScore;
        sortLeaderboard();
      });

      decreaseButton.addEventListener("click", function () {
        const scoreCell = row.children[3];
        let currentScore = parseInt(scoreCell.textContent);
        currentScore -= 5;
        scoreCell.textContent = currentScore;
        sortLeaderboard();
      });

      deleteButton.addEventListener("click", function () {
        leaderboardBody.removeChild(row);
      });

      firstNameInput.value = "";
      lastNameInput.value = "";
      countrySelect.value = "";
      scoreInput.value = "";

      sortLeaderboard();
    } else {
      alert("Please enter valid player details and score.");
    }
  });

  function sortLeaderboard() {
    const rows = Array.from(leaderboardBody.querySelectorAll("tr"));
    rows.sort((a, b) => {
      const scoreA = parseInt(a.children[3].textContent);
      const scoreB = parseInt(b.children[3].textContent);
      return scoreB - scoreA;
    });
    leaderboardBody.innerHTML = "";
    rows.forEach((row) => leaderboardBody.appendChild(row));
  }
});
