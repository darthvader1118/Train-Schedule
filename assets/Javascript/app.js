 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBMBQgX-IHiiKLgmz8jL_CJzCwBFXhhd1Q",
    authDomain: "train-schedule-95307.firebaseapp.com",
    databaseURL: "https://train-schedule-95307.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "707178885782"
  };
  firebase.initializeApp(config);

 var database = firebase.database();

database.ref().on("value", function(snapshot) {
  

  var data = snapshot.val();
  $('.trainData').empty();
  $.each(data, function(key, value){
    console.log(value);

    var converted = moment(value.ft, "HHmm").subtract(1,"years").format("X") 
    converted = parseInt(converted)
    console.log(converted);
    // debugger;
    var Diff = parseInt(value.freq) - (moment().diff(moment(converted).format("X"), "minutes") % value.freq);
    console.log((moment().diff(moment(converted).format("X"), "minutes") % value.freq))  
    // var Diff = 3;
    console.log(Diff)
    var nextTime = moment().add(Diff, 'minutes').format("hh:mm:A")
    // var converted = moment(nextTime).format("LTS")
    // monthsDiff = parseInt(monthsDiff)
    // console.log(monthsDiff)

    // Add More Stuff here


    var newRow = $('<tr>');

    newRow.addClass("trainData")
    var nameTd = $('<td>');
    var destTd = $('<td>');
    
    var freqTd = $('<td>');
  var ftTd = $('<td>');
    var nextTd = $('<td>');

    nameTd.text(value.name)
    destTd.text(value.dest)
    nextTd.text(Diff)
    ftTd.text(value.ft)
    freqTd.text(value.freq)
  

    newRow.append(nameTd)
    newRow.append(destTd)
    newRow.append(freqTd)
    newRow.append(ftTd)
   
    
    newRow.append(nextTd)

    $('.table').append(newRow);



  });


 });

$("#addTrain").on('click', function(){

    var name = $("#nameInput").val().trim();
    var dest = $("#destInput").val().trim();
    var ft = $("#ftInput").val().trim();
    
    var freq = $("#freqInput").val().trim();
   

    database.ref().push({
      name:name,
      dest:dest,
      ft:ft,
      freq:freq
    })



return false;
})