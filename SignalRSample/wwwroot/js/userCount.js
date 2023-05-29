//create connection
var connectionUserCount = new signalR.HubConnectionBuilder()
  .configureLogging(signalR.LogLevel.Trace)
  //.withUrl("/hubs/userCount", signalR.HttpTransportType.WebSockets)
  .withUrl("/hubs/userCount", signalR.HttpTransportType.WebSockets)
  //.withUrl("/hubs/userCount", signalR.HttpTransportType.LongPolling)
  .build();

//connect to methods that hub invokes aka receive notfications from hub
connectionUserCount.on("updateTotalViews", (value) => {
  var newCountSpan = document.getElementById("totalViewsCounter");
  newCountSpan.innerText = value.toString();
});

//invoke hub methods aka send notification to hub

connectionUserCount.on("updateTotalUsers", (value) => {
  var newCountSpan = document.getElementById("totalUsersCounter");
  newCountSpan.innerText = value.toString();
});

function newWindowLoadedOnClient() {
  //connectionUserCount.send("NewWindowLoaded");  // send vs invoke
  connectionUserCount
    .send("NewWindowLoaded", "Bhrugen")
    .then((value) => console.log(value));
}

//start connection
function fulfilled() {
  //do something on start
  console.log("Connection to User Hub Successful");
  newWindowLoadedOnClient();
}
function rejected() {
  //rejected logs
}

connectionUserCount.start().then(fulfilled, rejected);
