var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: 'localhost:9200'
})

var makeQuery = function () {
    client.ping({}, function (err) {
	if (err) throw err
	else makeQuery()
    })
}

makeQuery()
