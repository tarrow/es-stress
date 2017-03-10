var elasticsearch = require('elasticsearch')
var AgentKeepAlive = require('agentkeepalive')

var client = new elasticsearch.Client({
    host: 'localhost:80',
    maxSockets: 20,
    maxRetries: 50,
    createNodeAgent: function (connection, config) {
      return new AgentKeepAlive(connection.makeAgentConfig(config))
    }
})

var makeQuery = function () {
    client.search({
    index: 'wikifactmine-papers',
    body: {
      _source: false,
      fields: ['cprojectID'],
      query: {
        match_phrase: {
          fulltext: 'Eesti Teaduste Akadeemia'
        }
      },
      highlight: {
        encoder: 'html',
        fields: {
          fulltext: { boundary_chars: '.,!?\t\n' }
        }
      }
    }
    }, function (err) {
	if (err) throw err
	else makeQuery()
    })
}

makeQuery()
