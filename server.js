const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const faker = require('faker');
const server = http.createServer(app);
const routes = express.Router();


dotenv.config({ path: './config/config.env' });
//init project
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

//routes
routes.get('/news/:pageSize/:page', (req, res) => {
    let pageSize = req.params.pageSize;
    let page = req.params.page;
    var events = [];
    number = 0;
    while (number < pageSize) {
        events.push({
            author: faker.name.firstName(),
            title: faker.lorem.paragraphs(1),
            description: faker.lorem.paragraphs(1),
            content: faker.lorem.paragraphs(5),
            urlToImage: `https://picsum.photos/id/${randomIntFromInterval(0,100)}/480/640`,
            publishedAt: faker.date.future()
        });
        number++;
    }
    setTimeout(()=> {
        res.status(200).send({
            articles: events
        });
     }
     ,1000);
});

routes.get('/news', (req, res) => {
    var events = [];
    number = 0;
    while (number < 5) {
        events.push({
            author: faker.name.firstName(),
            title: faker.lorem.paragraphs(1),
            description: faker.lorem.paragraphs(1),
            content: faker.lorem.paragraphs(5),
            urlToImage: `https://picsum.photos/id/${randomIntFromInterval(0,100)}/480/640`,
            publishedAt: faker.date.future()
        });
        number++;
    }
    setTimeout(()=> {
        res.status(200).send({
            articles: events
        });
     }
     ,1000);
   
});

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

server.listen(8080, () => {
    console.log('listening on *:8080');
});