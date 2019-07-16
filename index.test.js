
//Required modules and models
var mongoose = require('mongoose').Mongoose
var findOrCreate = require ('.');
const assert = require('assert');

//Configuration of mongoose
var conex = {}
conex["host"] = "172.18.74.142"
conex["port"] = "27017"
conex["database"] = "Tests"

var instance = new mongoose()

const schema = instance.Schema({
    id: Number,
    name: String,
    surname: String
});

schema.statics.findOrCreate = findOrCreate

var testModel = instance.model('findOrCreate', schema);

//Operations pre-test
before(function(done) {
    instance.connect('mongodb://' + conex.host + ':' + conex.port + '/' + conex.database, {useNewUrlParser: true});

    var db = instance.connection;

    db.on('error', function () {
        console.log("Error connecting to " + conex.database)
        done()
    });
    db.once('open', function () {
        console.log("Connected to " + conex.database)
        done()
    });
})

beforeEach(function(done) {
    testModel.deleteMany({}, () => {
        testModel.create({id: 124613423, name: "Diego", surname: "García"}, done());
    });
});

// Begining of tests
describe("· Controlled errors", function() {
    it('- should return a reject promise for invalid number of params (0)', function(done) {
        testModel.findOrCreate(null)
            .then(function() {
                assert.equal(1, 2)
                done()
            }) //If return a resolve promise, it is an error
            .catch(function (err) {
                assert.equal(err, "findOrCreate requires 2 arguments: 'query' and 'document'")
                done()
            })
    });

    it('- should return a reject promise for invalid number of params (1)', function(done) {
        testModel.findOrCreate({'id': 124613423})
            .then(function() {
                assert.equal(1, 2)
                done()
            }) //If return a resolve promise, it is an error
            .catch(function(err) {
                assert.equal(err, "findOrCreate requires 2 arguments: 'query' and 'document'")
                done()
            })
    });
});

// Finding or creating
describe("· Find or create", function() {
    it('- should returns the document found. Call to the function without "document" param', function(done) {
        const query = {id: "124613423"};

        testModel.findOrCreate(query, null)
            .then(function(doc) {
                assert(doc.document);
                assert.strictEqual(doc.created, false);
                done();
            })
            .catch(function() {
                assert.equal(1, 2)
                done()
            }) //If return a reject promise, it is an error
    });

    it('- should returns the document found', function(done) {
        const query = {id: "124613423"};
        const document = {id: "124613423", name: "Michael", surname: "Jordan"}

        testModel.findOrCreate(query, document)
            .then(function(doc) {
                assert(doc.document);
                assert.equal(doc.document.name, "Diego")
                assert.strictEqual(doc.created, false);
                done();
            })
            .catch(function() {
                assert.equal(1, 2)
                done()
            }) //If return a reject promise, it is an error
    });

    it('- should returns the document created', function(done) {
        const query = {id: "512512351"};
        const document = {id: "512512351", name: "Michael", surname: "Jordan"}

        testModel.findOrCreate(query, document)
            .then(function(doc) {
                assert(doc.document);
                assert.strictEqual(doc.created, true);
                done();
            })
            .catch(function() {
                assert.equal(1, 2)
                done()
            }) //If return a reject promise, it is an error
    });

});
