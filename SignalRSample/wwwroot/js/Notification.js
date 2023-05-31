// get the text of Input
const inputText = document.getElementById("notificationInput");
// register click event for button
const sendButton = document.getElementById("sendButton");//notificationCounter
const notificationCounter = document.getElementById("notificationCounter");

// Get the dropdown list element by its id
const dropdownList = document.getElementById("messageList");

sendButton.addEventListener("click", (event) => {
    if (inputText.value.length !== 0) {
        //invoke notification now.
        notification.send("NewNotification", inputText.value);
        //event.preventDefault(); -- this will cause Exception
        inputText.value = ''; //clear the input box
    }
});


// SignalR stuff
var notification = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/notification").build();

// get Update signal from Server
notification.on("updateNotification", notification => {
    console.log("update Notification");
    //update the counter Number
    let counter = parseInt(notificationCounter.innerHTML, 10);
    counter++;
    notificationCounter.innerHTML = counter.toString();
    addItemToDropdown(notification);
});

//start connection
function fulfilled() {
    console.log("Connection to User Hub Successful");
    //new connection get accumulated notificaitons and update the page
    notification
        .invoke("GetNotifications")
        .then(value=>UpdateNotificationList(value));


}
function rejected() {
    //rejected logs
}

//update Notification List, this is for those new connection
function UpdateNotificationList(notificationList) {
    if (notificationList && notificationList.length > 0) {
        //update the number when Inititiation
        notificationCounter.innerHTML = notificationList.length.toString();
        for (let i = 0; i < notificationList.length; i++) {
            addItemToDropdown(notificationList[i])
        }
    }
}



// Function to add a new item to the dropdown list
function addItemToDropdown(value) {
    // Create a new list item
    const newItem = document.createElement("li");
    newItem.innerHTML = `<a class="dropdown-item" href="#">${value}</a>`;

    // Append the new item to the dropdown list
    dropdownList.appendChild(newItem);
}

notification.start().then(fulfilled, rejected);
