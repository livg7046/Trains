// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAxZ4aDc4oEpfu0oQrVHZYO1X_TJ0kPodQ",
    authDomain: "trains-38ac6.firebaseapp.com",
    databaseURL: "https://trains-38ac6.firebaseio.com",
    projectId: "trains-38ac6",
    storageBucket: "",
    messagingSenderId: "1026884165378"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// Capture Button Click
$("#add-user").on("click", function(event) {
    
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    startTime = $("#startTime").val().trim();
    rate = $("#rate").val().trim();


    // Code for handling the push
    database.ref().push({
      name: name,
      destination: destination,
      startTime: startTime,
      rate: rate,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });



  });

 
  database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
    
    var sv = snapshot.val();
    
    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.startTime);
    console.log(sv.rate);

    // Train Name
    var tr = $("<tr>");
    var td = $("<td>");
    td.append(sv.name);
    tr.append(td);
    $("#tableRows").append(tr);

    // Train Destination
    var td = $("<td>");
    td.append(sv.destination);
    tr.append(td);
   
    // Train Frequency
    var td = $("<td>");
    td.append(sv.rate);
    tr.append(td);

    // Minutes Away
    
    var tFreq = sv.rate;
    var firstTime = sv.startTime;
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes")
    var tRemainder = diffTime % tFreq;
    var tUntilTrain = tFreq - tRemainder;
    
    // Next Arrival
    var nextArrival = moment(moment().add(tUntilTrain, "minutes")).format("hh:mm"); 
    
    var td = $("<td>");
    td.append(nextArrival);
    tr.append(td);

    var td = $("<td>");
    td.append(tUntilTrain);
    tr.append(td);
   
    // Clearing Form
    $("#startTime").val("");
    $("#destination").val("");
    $("#role").val("");
    $("#name").val("");
    $("#rate").val("");
    
    
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });