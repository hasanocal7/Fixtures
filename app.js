const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const methodOverride = require('method-override');
require('dotenv').config(); // .env dosyasını yapılandırmak için 'dotenv' modülünü kullanıyoruz.
const errorHandler = require('./middleware/errorHandler');

// Express Applicaton
const app = express();

// DB Connection
const db = require('./models');

// TEMPLATE ENGINE
app.set('view engine', 'ejs'); // app.set ile görünüm motorunu ayarlıyoruz. Bu kod, EJS (Embedded JavaScript) görünüm motorunu kullanmayı ayarlar.

// MIDDLEWARES
app.use(express.static('public')); // public dizini, istemci tarafından erişilebilen statik dosyaların saklandığı dizindir.
app.use(cors()); //CORS (Cross-Origin Resource Sharing) için middleware'i etkinleştiriyoruz. Bu, farklı kökenlerden gelen isteklere izin verir.
app.use(bodyParser.json()); // İstek gövdelerini işlemek için bodyParser middleware'ini kullanıyoruz. Bu, gelen verileri ayrıştırabilir ve uygulamada kullanılabilir hale getirebilir.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(methodOverride('_method')); // HTTP yöntemlerini (GET, POST, PUT, vb.) belirlemek için methodOverride middleware'ini kullanıyoruz. Bu, özellikle HTML formları ve AJAX istekleriyle çalışırken PUT ve DELETE isteklerini işlemek için kullanışlıdır.

// ROUTES
app.use('/', require('./routes/pageRoute'));
app.use('/users', require('./routes/userRoute'));

// ERROR HANDLER
app.use(errorHandler);

// SERVER CONNECTION
const port = process.env.PORT || 5000;
db.sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server is connected Port: ${port}`);
  });
});
