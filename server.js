var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/MainPage', function(req, res) {
  res.render('pages/MainPage');
});

app.get('/Producer', function(req, res) {
    res.render('pages/Producer');
});

app.get('/Producer2', function(req, res) {
    res.render('pages/Producer2');
});

let playList = ["Unselected", "song1", "song2", "song3"];

let producers = {
  "producer1": {
      "DJ1": [
          { date: "2/10/2024", start: "1:00pm", end: "3:00pm", songs: ["song1", "song2"] },
          { date: "2/11/2024", start: "2:00pm", end: "4:00pm", songs: ["song1", "song2"] },
          { date: "2/11/2024", start: "3:00pm", end: "4:00pm", songs: ["song1", "song2"] },
      ],
      "DJ2": [
          { date: "2/13/2024", start: "1:00pm", end: "3:00pm", songs: ["song1", "song2"] },
          { date: "2/14/2024", start: "2:00pm", end: "4:00pm", songs: ["song1", "song2"] },
      ],
      "DJ3": [
          { date: "2/12/2024", start: "1:00pm", end: "3:00pm", songs: ["song1", "song2"] },
      ]
  },
  "producer2": {
      "DJ1": [
          { date: "2/10/2024", start: "1:00pm", end: "3:00pm", songs: ["song1", "song2"] },
          { date: "2/11/2024", start: "2:00pm", end: "4:00pm", songs: ["song1", "song2"] },
          { date: "2/11/2024", start: "3:00pm", end: "4:00pm", songs: ["song1", "song2"] },
      ],
      "DJ2": [
          { date: "2/13/2024", start: "1:00pm", end: "3:00pm", songs: ["song1", "song2"] },
          { date: "2/14/2024", start: "2:00pm", end: "4:00pm", songs: ["song1", "song2"] },
      ],
  }
};

app.get('/api/data', (req, res) => {
  res.json({ playList, producers });
});

app.use(express.static('public'));

app.listen(8080);
console.log('Server is listening on port 8080');
