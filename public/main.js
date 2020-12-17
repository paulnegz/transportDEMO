// sidenav-trigger
// const locationForm = document.getElementById('location');
// form.addEventListener('submit', (e) => {
//     //close navbar
    
// });
let body = document.querySelector('body');
body.addEventListener("load",popOneTimeAlert );
function popOneTimeAlert(){
    $('#contact-me-modal').modal('toggle');
    body.removeEventListener("load", popOneTimeAlert);
}

//birthday
var currYear = (new Date()).getFullYear();
$(document).ready(function(){
    $('.datepicker').datepicker(
        {
            defaultDate: new Date(currYear,1,31),
            // setDefaultDate: new Date(2000,01,31),
            maxDate: new Date(currYear,12,31),
            yearRange: [1928, currYear],   
            autoClose: true,
          }
    );
  });

//dropDown
$(document).ready(function(){
    $('select').formSelect();
  });

const form = document.getElementById('poll-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const choice = document.querySelector('input[name=group1]:checked').value;
    const data = {primaryMode: choice};

    // fetch('http://localhost:3000/demo', {
        fetch('/demo', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json() ).then(data => console.log(data) ).catch(err => console.log(err));
});

// fetch('http://localhost:3000/demo')
fetch('/demo')
    .then(res =>res.json())
    .then(data => {
        const votes  = data.votes;
        const totalVotes = votes.length;
        //Count vote points for each mode
        const voteCounts = votes.reduce((acc, vote) => (
            (acc[vote.primaryMode] = (acc[vote.primaryMode] || 0) + parseInt(vote.points)), acc),
            {}
        );
        
        console.log(data);
    
    
let  dataPoints=[ 
    {label: 'personalVehicle', y: voteCounts.personalVehicle },
    {label: 'Bus', y: voteCounts.Bus},
    {label: 'commercialVehicle', y: voteCounts.commercialVehicle},
    {label: 'Bicycle', y: voteCounts.Bicycle},
    // {label: 'Airplane', y: 0},
    // {label: 'Train', y: 0},
    // {label: 'Ferry', y: 0},
    // {label: 'Others', y: 0},

];

const chartContainer = document.querySelector('#chartContainer');
if (chartContainer){
    const chart = new CanvasJS.Chart("chartContainer",{
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: 'Live Chart (NOT SHOWN TO USER + SAVES TO EXCEL)'
        },
        data: [
            {
                type: 'column',//column chart
                dataPoints: dataPoints
            }
        ]

    });
    chart.render();


    var pusher = new Pusher('5ec2daa1e7575e3a5eef', {
      cluster: 'us2', 
      encrypted: true
    });

    var channel = pusher.subscribe('primaryMode-poll');
    channel.bind('primaryMode-vote', function(data) {
    //   console.log(data.primaryMode);
        dataPoints = dataPoints.map(x =>{
          if(x.label == data.primaryMode){
            x.y +=data.points;
            return x;
          }
          else{
              return x;
          }
      })
      chart.render();
    });
}


    
    });
