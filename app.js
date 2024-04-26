const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const homeRoutes = require('./routes/home');
const adminRoutes = require('./routes/admin');

app.use('/', homeRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;

// Mongoose connection to MongoDB
mongoose.connect('mongodb+srv://your-MONGDB-URI', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Database connected successfully');

    // Optionally perform a simple database operation to confirm connection
    const User = mongoose.model('User', new mongoose.Schema({ name: String }));
    const testUser = new User({ name: 'Test User' });

    testUser.save()
        .then((doc) => {
            console.log('Test insert successful:', doc);
            // Optionally remove the test document after verification
            return User.deleteOne({ _id: doc._id });
        })
        .then(() => console.log('Cleanup successful'))
        .catch(err => console.log('Cleanup failed:', err));
})
.catch(err => {
    console.log('Database connection error:', err);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
