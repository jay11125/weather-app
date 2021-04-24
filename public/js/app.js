const address = document.querySelector("#address");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

address.addEventListener("click", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});

document.getElementById("geolocation").addEventListener("click", (e) => {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition((position) => {
    if (!navigator.geolocation) {
      return alert("Your browser does not support geolocation!");
    }

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch(
      `/weather/current-location?lat=${position.coords.latitude}&long=${position.coords.longitude}`
    ).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    });
  });
});
