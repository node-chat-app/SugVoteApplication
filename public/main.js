// const form = document.getElementById('vote-form');

//  form.addEventListener('submit', e => {
//   const choice = document.querySelector('input[name=sug]:checked').value;
//   const data = {sug: choice};

//   fetch('http://localhost:3000/vote', {
//     method: 'post',
//     body: JSON.stringify(data),
//     headers: new Headers({
//       'Content-Type': 'application/json'
//     })
//   })
//   .then(res => res.json())
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

//   e.preventDefault();
// });
fetch('https://scenic-lassen-volcanic-49836.herokuapp.com/vote/result')
.then(res => res.json())
.then(data => {
  const votes = data.Votes;
  const totalVotes = votes.length;

  //count vote points = acc/current
  const voteCounts = votes.reduce((acc, vote) => ((acc[vote.sug] = (acc[vote.sug] || 0) + parseInt(vote.points)), acc), {});

  let dataPoints = [
    {label: 'George', y: voteCounts.George},
    {label: 'Pascals', y: voteCounts.Pascals},
    {label: 'Chijioke', y: voteCounts.Chijioke},
    {label: 'Esther', y: voteCounts.Esther},
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

