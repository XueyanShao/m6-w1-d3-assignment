module.exports = function(app) {
    var booklists = require('../controllers/booklist.controller.js');

    app.post('/api/booklist', booklists.createBooklist);
    app.get('/api/booklist/:id', booklists.getBooklist);
    app.get('/api/booklists', booklists.booklists);
    app.put('/api/booklist', booklists.updateBooklist);
    app.delete('/api/booklist/:id', booklists.deleteBooklist);
}