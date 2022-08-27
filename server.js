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
routes.get('/', (req, res) => {
    const events = [];
    number = 20;
    while (number >= 0) {
        var presenterName = faker.name.firstName();
        var quota = randomIntFromInterval(0, 100);
        var audience = [];
        presenter = {
            name: presenterName,
            presenterImage: faker.image.cats(),
            rating: `${randomIntFromInterval(1,5)}.0`,
            job: faker.name.jobType(),
            about: faker.lorem.paragraphs(2),
            email: `${presenterName}@gmail.com`
        };
        for (let i = 0; i < quota; i++) {
            audience.push({
                name: faker.name.firstName(),
                image: faker.image.cats(),
                date: faker.date.future(),
            });
        }
        events.push({
            id: number,
            presenter: presenter,
            eventName: faker.company.catchPhrase(),
            description: faker.lorem.paragraphs(5),
            price: faker.finance.amount(25, 100, 3, 'Rp '),
            isOnline: faker.datatype.boolean(),
            quota: quota,
            audience: audience,
            image: faker.image.cats(),
            city: `${faker.address.city()}, ${faker.address.country()}`,
            date: faker.date.future(),
        });
        number--;
    }
    res.status(200).send({
        data: events
    });
});

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

server.listen(8080, () => {
    console.log('listening on *:8080');
});