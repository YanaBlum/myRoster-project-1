const express = require("express")
const router = express.Router()
const urllib = require('urllib')


  const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

const json = {
  data: {}
}


urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', (err, res) => {
    const result = JSON.parse(res.toString())
    json.data = result.league.standard
})

router.get('/teams/:teamName', (req, res) => {
  const teamName = req.params.teamName

  if (teamToIDs[teamName]){
    const teamID = teamToIDs[teamName]

    const team = json.data
    .filter(p => {
      return p.teamId === teamID && p.isActive})
    .map(p => {
      return {
        firstName: p.firstName.toUpperCase(),
        lastName: p.lastName.toUpperCase(),
        jersey: p.jersey || 'unavailable',
        pos: p.pos,
        img: `https://nba-players.herokuapp.com/players/${p.lastName}/${p.firstName}`
      }
    })
    res.send(team)
  }else{
    res.send({error: 'not found' })
  }
})

module.exports = router