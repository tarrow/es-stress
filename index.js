var elasticsearch = require('elasticsearch')
var AgentKeepAlive = require('agentkeepalive')

var client = new elasticsearch.Client({
    host: 'localhost:9200'
    maxSockets: 20,
    maxRetries: 50,
    createNodeAgent: function (connection, config) {
      return new AgentKeepAlive(connection.makeAgentConfig(config))
    }
})

var makeQuery = function () {
    client.ping({}, function (err) {
	if (err) throw err
	else makeQuery()
    })
}

makeQuery()
