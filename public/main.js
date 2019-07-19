   var votesFetctingApi = {
    productionApi : 'https://scenic-lassen-volcanic-49836.herokuapp.com/vote/result',
    LocalhostApi : 'http://localhost:3000/vote/result'
   }
 
   var contestantsNamesFetchingApi = {
    productionApi : 'https://scenic-lassen-volcanic-49836.herokuapp.com/admin/results',
    LocalhostApi : 'http://localhost:3000/admin/results'
   }

 function getContestants(){
     var xhr = new XMLHttpRequest();
     xhr.open('GET', contestantsNamesFetchingApi.productionApi, true);

     xhr.onload = function(){
         if(this.status == 200){
var data =JSON.parse(this.responseText);
// console.log(data.contestantNames.FirstContestant)
  var first = data.contestantNames.FirstContestant;
  var second = data.contestantNames.SecondContestant;
  var third = data.contestantNames.ThirdContestant;
  var fourth = data.contestantNames.FourthContestant;

  fetch(votesFetctingApi.productionApi)
  .then(res => res.json())
  .then(data => {
    const votes = data.Votes;
    const totalVotes = votes.length;
  
    //count vote points = acc/current
    const voteCounts = votes.reduce((acc, vote) => ((acc[vote.sug] = (acc[vote.sug] || 0) + parseInt(vote.points)), acc), {});
  
    let dataPoints = [
      {label: `${first}`, y: voteCounts.George},
      {label: `${second}`, y: voteCounts.Pascals},
      {label: `${third}`, y: voteCounts.Chijioke},
      {label: `${fourth}`, y: voteCounts.Esther},
    ];
    
    const chartContainer = document.querySelector
    ('#chartContainer');
    
    if(chartContainer){
      const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
          text: 'CURRENT STANDINGS'
        },
        data: [
          {
            Type: 'column',
            dataPoints : dataPoints
          }
        ]
      });
      chart.render();
    
      // Enable pusher logging - don't include this in production
      pusher.logToConsole = true;
    
      var pusher = new Pusher('3f4d26e83aa58f641cd5', {
        cluster: 'eu',
        forceTLS: true
      });
    
      var channel = pusher.subscribe('sug-poll');
      channel.bind('sug-vote', function(data) { 
        // alert(JSON.stringify(data));
        dataPoints = dataPoints.map(x => {
          if(x.label == data.sug){
            x.y += data.points;
            return x;
          } else{
            return x;
          }
        });
        chart.render();
      });
    }
  
  });
  
}
         else{
             console.log('false')
      
          }
     }
     xhr.send();

 }
 getContestants();





























// fetch('https://scenic-lassen-volcanic-49836.herokuapp.com/vote/result')
// .then(res => res.json())
// .then(data => {
//   const votes = data.Votes;
//   const totalVotes = votes.length;

//   //count vote points = acc/current
//   const voteCounts = votes.reduce((acc, vote) => ((acc[vote.sug] = (acc[vote.sug] || 0) + parseInt(vote.points)), acc), {});

//   let dataPoints = [
//     {label: `${first}`, y: voteCounts.George},
//     {label: 'Pascals', y: voteCounts.Pascals},
//     {label: 'Chijioke', y: voteCounts.Chijioke},
//     {label: 'Esther', y: voteCounts.Esther},
//   ];
  
//   const chartContainer = document.querySelector
//   ('#chartContainer');
  
//   if(chartContainer){
//     const chart = new CanvasJS.Chart('chartContainer', {
//       animationEnabled: true,
//       theme: 'theme1',
//       title: {
//         text: 'CURRENT STANDINGS'
//       },
//       data: [
//         {
//           Type: 'column',
//           dataPoints : dataPoints
//         }
//       ]
//     });
//     chart.render();
  
//     // Enable pusher logging - don't include this in production
//     pusher.logToConsole = true;
  
//     var pusher = new Pusher('3f4d26e83aa58f641cd5', {
//       cluster: 'eu',
//       forceTLS: true
//     });
  
//     var channel = pusher.subscribe('sug-poll');
//     channel.bind('sug-vote', function(data) { 
//       // alert(JSON.stringify(data));
//       dataPoints = dataPoints.map(x => {
//         if(x.label == data.sug){
//           x.y += data.points;
//           return x;
//         } else{
//           return x;
//         }
//       });
//       chart.render();
//     });
//   }

// });