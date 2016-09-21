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
    var converted = moment(new Date(value.start)).format("X");
    var Diff = moment(converted).diff(moment(), "minutes") % value.freq;
    var nextTime = moment.add(Diff, 'm')
    var converted = moment(nextTime).format("LTS")
    // monthsDiff = parseInt(monthsDiff)
    // console.log(monthsDiff)

    // Add More Stuff here


    var newRow = $('<tr>');

    newRow.addClass("trainData")
    var nameTd = $('<td>');
    var destTd = $('<td>');
    var ftTd = $('<td>');
    var freqTd = $('<td>');
  
    var nextTd = $('<td>');

    nameTd.text(value.name)
    destTd.text(value.dest)
    monthTd.text(Diff)
    ftTd.text(value.ft)
    freqTd.text(converted)
  

    newRow.append(nameTd)
    newRow.append(destTd)
    newRow.append(ftTd)
   
    newRow.append(freqTd)
    newRow.append(nextTd)

    $('.table').append(newRow);



  });


 });

$("#addTrain").on('click', function(){

    var name = $("#nameInput").val().trim();
    var dest = $("#destInput").val().trim();
    var ft = $("#ftInput").val().trim();
    var months = 8
    var freq = $("#freqInput").val().trim();
    var total = 8

    database.ref().push({
      name:name,
      dest:dest,
      ft:ft,
      months:months,
      freq:freq,
      total:total
    })



return false;
})