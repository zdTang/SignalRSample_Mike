var cloakSpan = document.getElementById("cloakCounter");
var stoneSpan = document.getElementById("stoneCounter");
var wandSpan = document.getElementById("wandCounter");


//create connection
var connectionDeathlyHallows = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/deathyhallows").build();

//connect to methods that hub invokes aka receive notfications from hub
connectionDeathlyHallows.on("updateDealthyHallowCount", (cloak, stone, wand) => {
    cloakSpan.innerText = cloak.toString();
    stoneSpan.innerText = stone.toString();
    wandSpan.innerText = wand.toString();
});



//invoke hub methods aka send notification to hub
function newWindowLoadedOnClientDeathlyHallows() {
    //connectionUserCount.send("NewWindowLoaded");  // send vs invoke
    connectionDeathlyHallows
        .send("NewWindowLoaded");
        //.then((value) => {
        //    console.log(value);
        //    cloakSpan.innerText = value.cloak.toString();
        //    stoneSpan.innerText = value.stone.toString();
        //    wandSpan.innerText = value.wand.toString();});
}
//start connection
function fulfilled() {
    //do something on start
    console.log("Connection to User Hub Successful");
    newWindowLoadedOnClientDeathlyHallows()
}
function rejected() {
    //rejected logs
}

connectionDeathlyHallows.start().then(fulfilled, rejected);