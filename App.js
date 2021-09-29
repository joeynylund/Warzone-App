import React, { useState, useEffect } from 'react';
import { Button, View, StatusBar, StyleSheet, ScrollView, Text, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Header from './components/Header';
import moment from 'moment';

const styles = StyleSheet.create({
  detailContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  detailItems: {
    width: '50%',
    alignItems: 'center',
    padding: 20
  },
  detailHeader: {
    fontSize: 35,
    fontWeight: '800',
    color: '#ff0000'
  },
  detailDescription: {
    fontSize: 15,
    color: '#fff'
  },
  winner: {
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 5
  },
  loser: {
    backgroundColor: '#ff0000',
    padding: 5,
    borderRadius: 5
  }
})


const MatchInfo = ({ mode, position, kills, damage, deaths, average, time, id }) => {
  const [loading, setLoading] = useState(true);

  var total = 0;

  var count = 0;

  var totalCount = 0;

  const [matchKD, setMatchKD] = useState(0);

  const [kdAverage, setkdAverage] = useState(0);

  const [playerCount, setPlayerCount] = useState(0);

  const [totalplayerCount, setTotalPlayerCount] = useState(0);

  fetch('https://api.tracker.gg/api/v2/warzone/standard/matches/' + id)
  .then(response => response.json())
  .then(data => {
    var players = data.data.segments;

    players.forEach(player => {
      if(player.attributes.lifeTimeStats != null) {
        total += player.attributes.lifeTimeStats.kdRatio
        count++      }
        totalCount++;
    })
    var avg = (total/count).toFixed(2);
    setkdAverage(avg);
    setPlayerCount(count);
    setTotalPlayerCount(totalCount);
    switch(true) {
    case (avg == 0):
      average = 'N/A';
      setMatchKD('N/A')
      break;
    case (avg < 0.578):
      average = 'BRONZE 4';
      setMatchKD('BRONZE 4');
      break;
    case (avg < 0.619):
      average = 'BRONZE 3';
      setMatchKD('BRONZE 3');
      break;
    case (avg < 0.671):
      average = 'BRONZE 2';
      setMatchKD('BRONZE 2');
      break;
      case (avg < 0.743):
        average = 'BRONZE 1';
        setMatchKD('BRONZE 1');
        break;
        case (avg < 0.792):
      average = 'SILVER 4';
      setMatchKD('SILVER 4');
      break;
      case (avg < 0.822):
      average = 'SILVER 3';
      setMatchKD('SILVER 3');
      break;
      case (avg < 0.845):
      average = 'SILVER 2';
      setMatchKD('SILVER 2');
      break;
      case (avg < 0.865):
      average = 'SILVER 1';
      setMatchKD('SILVER 1');
      break;
      case (avg < 0.884):
      average = 'GOLD 4';
      setMatchKD('GOLD 4');
      break;
      case (avg < 0.907):
      average = 'GOLD 3';
      setMatchKD('GOLD 3');
      break;
      case (avg < 0.936):
      average = 'GOLD 2';
      setMatchKD('GOLD 2');
      break;
      case (avg < 0.974):
      average = 'GOLD 1';
      setMatchKD('GOLD 1');
      break;
      case (avg < 1.012):
      average = 'PLATINUM 4';
      setMatchKD('PLATINUM 4');
      break;
      case (avg < 1.040):
      average = 'PLATINUM 3';
      setMatchKD('PLATINUM 3');
      break;
      case (avg < 1.060):
      average = 'PLATINUM 2';
      setMatchKD('PLATINUM 2');
      break;
      case (avg < 1.078):
      average = 'PLATINUM 1';
      setMatchKD('PLATINUM 1');
      break;
      case (avg < 1.095):
      average = 'DIAMOND 4';
      setMatchKD('DIAMOND 4');
      break;
      case (avg < 1.113):
      average = 'DIAMOND 3';
      setMatchKD('DIAMOND 3');
      break;
      case (avg < 1.140):
      average = 'DIAMOND 2';
      setMatchKD('DIAMOND 2');
      break;
      case (avg >= 1.140):
      average = 'DIAMOND 1';
      setMatchKD('DIAMOND 1');
      break;}
      setLoading(false)
  });
  switch(mode) {
    case 'br_brsolo':
      mode = 'SOLO'
      break;
    case 'br_brduos':
      mode = 'DUOS'
      break;
    case 'br_brtrios':
      mode = 'TRIOS'
      break;
    case 'br_brquads':
      mode = 'QUADS'
      break;
    case 'br_dmz_plnbld':
      mode = 'PLUNDER'
      break;
  };

  var now = moment(time).format('M/D h:mm A');
  return (
    <View style={{backgroundColor: '#212121', padding: 5, marginBottom: 15}}>
      <View style={{flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center',padding: 15}}>
        <Text>
          <Text style={{color:'#fff', fontSize: 20, fontWeight: '900'}}>{mode}</Text>
          <View>
            <Text style={{color:'#fff'}}>{' ' + ' ' + now}</Text>
          </View>
        </Text>
        <View style={(position == '1st') ? styles.winner : styles.loser}>
          <Text style={{color:'#fff', fontSize: 20, fontWeight: '900'}}>{position}</Text>
        </View>
      </View>

      <View style={{flexDirection: 'row',justifyContent: 'space-between', alignContent:'center'}}>
        <View style={{flexDirection: 'column',justifyContent:'center', alignContent: 'center',width:'30%'}}>
          <Text style={{color:'#fff', fontSize: 28, fontWeight: '900', textAlign: 'center'}}>{kills}</Text>
          <Text style={{color:'#fff', fontSize: 15, textAlign: 'center'}}>{kills == 1 ? 'Kill' : 'Kills'}</Text>
        </View>
        <View style={{flexDirection: 'column',justifyContent:'center', alignContent: 'center',width:'30%'}}>
          <Text style={{color:'#fff', fontSize: 28, fontWeight: '900', textAlign: 'center'}}>{deaths}</Text>
          <Text style={{color:'#fff', fontSize: 15, textAlign: 'center'}}>{deaths == 1 ? 'Death' : 'Deaths'}</Text>
        </View>
        <View style={{flexDirection: 'column',justifyContent:'center', alignContent: 'center',width:'30%'}}>
          <Text style={{color:'#fff', fontSize: 28, fontWeight: '900', textAlign: 'center'}}>{damage}</Text>
          <Text style={{color:'#fff', fontSize: 15, textAlign: 'center'}}>Damage</Text>
        </View>
  </View>

  <View style={{flexDirection: 'row',justifyContent: 'space-evenly', alignContent:'center',paddingTop:10}}>
        <View style={{flexDirection: 'column',justifyContent:'center', alignContent: 'center',width:'30%'}}>
          <Text style={{color:'#fff', fontSize: 25, fontWeight: '900', textAlign: 'center'}}>{kdAverage}</Text>
          <Text style={{color:'#fff', fontSize: 13, textAlign: 'center'}}>Avg Lobby K/D</Text>
        </View>
        <View style={{flexDirection: 'column',justifyContent:'center', alignContent: 'center',width:'30%'}}>
          <Text style={{color:'#fff', fontSize: 25, fontWeight: '900', textAlign: 'center'}}>{playerCount + '/' + totalplayerCount}</Text>
          <Text style={{color:'#fff', fontSize: 13, textAlign: 'center'}}>Players Processed</Text>
        </View>
  </View> 

  </View>
)};

function HomeScreen({ navigation }) {

  const [url, setUrl] = useState('');

  const [wins, setWins] = useState('');

  const [kd, setKd] = useState('');


  useEffect(() => {
    setUrl('');
    setWins('');
    setKd('');
  })
  return (
    <View style={{backgroundColor: '#121212', flex: 1}}>
      <Header title='HoeZone' navigation={navigation} />
      <ScrollView>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate('Details',{
            player: 'Joseph'
          })}
          title="Joseph"
        />
        <Button
          onPress={() => navigation.navigate('Details',{
            player: 'Danny'
          })}
          title="Danny"
        />
        <Button
          onPress={() => navigation.navigate('Details',{
            player: 'Anthony'
          })}
          title="Anthony"
        />
        <Button
          onPress={() => navigation.navigate('Details',{
            player: 'Tyler'
          })}
          title="Tyler"
        />
        <Button
          onPress={() => navigation.navigate('Details',{
            player: 'Zac'
          })}
          title="Zac"
        />
        </View>
      </ScrollView>
    </View>
  );
}

function DetailsScreen({ route, navigation }) {

  const [loading, setLoading] = useState(true);

  const [matches, setMatches] = useState([]);

  const [wins, setWins] = useState('');

  const [kd, setKd] = useState('');

  const [kills, setKills] = useState('');

  const [games, setGames] = useState('');

  const [kpg, setKpg] = useState('');

  const player = route.params.player;

  useEffect(() => {
    setLoading(true)
    setMatches([]);
    setTimeout(function(){ 
    switch (player) {
      case 'Joseph':
        console.log('You are on Joseph!');
        fetch('https://api.tracker.gg/api/v2/warzone/standard/profile/battlenet/nylund%2311429')
          .then(response => response.json())
          .then(data => {
            console.log(data.data.segments[1].stats.kills.value);
            setWins(data.data.segments[1].stats.wins.value);
            setKd(data.data.segments[1].stats.kdRatio.value)
            setKills(data.data.segments[1].stats.kills.value);
            setGames(data.data.segments[1].stats.gamesPlayed.value);
            setKpg((data.data.segments[1].stats.kills.value/data.data.segments[1].stats.gamesPlayed.value).toFixed(2))
            fetch('https://api.tracker.gg/api/v2/warzone/standard/matches/battlenet/nylund%2311429')
              .then(response => response.json())
              .then(data => {
                console.log('Fetched');
                setMatches(data.data.matches);
                setLoading(false)
              });
          });
        break;
      case 'Danny':
        console.log('You are on Danny!');
        fetch('https://api.tracker.gg/api/v2/warzone/standard/profile/xbl/thereflektor')
          .then(response => response.json())
          .then(data => {
            console.log(data.data.segments[1].stats.kills.value);
            setWins(data.data.segments[1].stats.wins.value);
            setKd(data.data.segments[1].stats.kdRatio.value)
            setKills(data.data.segments[1].stats.kills.value);
            setGames(data.data.segments[1].stats.gamesPlayed.value);
            setKpg((data.data.segments[1].stats.kills.value/data.data.segments[1].stats.gamesPlayed.value).toFixed(2))
            fetch('https://api.tracker.gg/api/v2/warzone/standard/matches/xbl/thereflektor')
              .then(response => response.json())
              .then(data => {
                console.log('Fetched');
                setMatches(data.data.matches);
                setLoading(false)
              });
          });
        break;
      case 'Anthony':
        console.log('You are on Anthony!');
        fetch('https://api.tracker.gg/api/v2/warzone/standard/profile/xbl/tickledaivories')
          .then(response => response.json())
          .then(data => {
            console.log(data.data.segments[1].stats.kills.value);
            setWins(data.data.segments[1].stats.wins.value);
            setKd(data.data.segments[1].stats.kdRatio.value)
            setKills(data.data.segments[1].stats.kills.value);
            setGames(data.data.segments[1].stats.gamesPlayed.value);
            setKpg((data.data.segments[1].stats.kills.value/data.data.segments[1].stats.gamesPlayed.value).toFixed(2))
            fetch('https://api.tracker.gg/api/v2/warzone/standard/matches/xbl/tickledaivories')
              .then(response => response.json())
              .then(data => {
                console.log('Fetched');
                setMatches(data.data.matches);
                setLoading(false)
              });
          });
        break;
      case 'Tyler':
        console.log('You are on Tyler!');
        fetch('https://api.tracker.gg/api/v2/warzone/standard/profile/xbl/burtmacklin90')
          .then(response => response.json())
          .then(data => {
            console.log(data.data.segments[1].stats.kills.value);
            setWins(data.data.segments[1].stats.wins.value);
            setKd(data.data.segments[1].stats.kdRatio.value)
            setKills(data.data.segments[1].stats.kills.value);
            setGames(data.data.segments[1].stats.gamesPlayed.value);
            setKpg((data.data.segments[1].stats.kills.value/data.data.segments[1].stats.gamesPlayed.value).toFixed(2))
            fetch('https://api.tracker.gg/api/v2/warzone/standard/matches/xbl/burtmacklin90')
              .then(response => response.json())
              .then(data => {
                console.log('Fetched');
                setMatches(data.data.matches);
                setLoading(false)
              });
          });
        break;
      case 'Zac':
        console.log('You are on Zac!');
        fetch('https://api.tracker.gg/api/v2/warzone/standard/profile/xbl/blacklabzmattuh')
          .then(response => response.json())
          .then(data => {
            console.log(data.data.segments[1].stats.kills.value);
            setWins(data.data.segments[1].stats.wins.value);
            setKd(data.data.segments[1].stats.kdRatio.value)
            setKills(data.data.segments[1].stats.kills.value);
            setGames(data.data.segments[1].stats.gamesPlayed.value);
            setKpg((data.data.segments[1].stats.kills.value/data.data.segments[1].stats.gamesPlayed.value).toFixed(2))
            fetch('https://api.tracker.gg/api/v2/warzone/standard/matches/xbl/blacklabzmattuh')
              .then(response => response.json())
              .then(data => {
                console.log('Fetched');
                setMatches(data.data.matches);
                setLoading(false)
              });
          });
        break;
    }
  },1000)
  },[route])

  const renderItem = ({ item }) => {

    return (
    <MatchInfo mode={item.attributes.modeId} position={item.segments[0].stats.placement.displayValue} kills={item.segments[0].stats.kills.displayValue} damage={item.segments[0].stats.damageDone.displayValue} deaths={item.segments[0].stats.deaths.displayValue} average={item.matchStatData === undefined ? 0 : item.matchStatData.playerAverage} time={item.metadata.timestamp} id={item.attributes.id} />
  )
    };
  
  return (
    
    <View style={{backgroundColor:'#121212', flex: 1}}>
      <Header title={player} navigation={navigation} />
      {loading === true ? <View style={{justifyContent: 'center',alignContent: 'center', flex: 1}}><ActivityIndicator size="large" color="#ff0000" /></View> : <ScrollView>
      <View style={styles.detailContainer}>
        <View style={styles.detailItems}>
          <Text style={styles.detailHeader}>{wins}</Text>
          <Text style={styles.detailDescription}>Total Wins</Text>
        </View>
        <View style={styles.detailItems}>
          <Text style={styles.detailHeader}>{games}</Text>
          <Text style={styles.detailDescription}>Games Played</Text>
        </View>
        <View style={styles.detailItems}>
          <Text style={styles.detailHeader}>{kills}</Text>
          <Text style={styles.detailDescription}>Total Kills</Text>
        </View>
        <View style={styles.detailItems}>
          <Text style={styles.detailHeader}>{kd}</Text>
          <Text style={styles.detailDescription}>K/D Ratio</Text>
        </View>
        <View style={styles.detailItems}>
          <Text style={styles.detailHeader}>{kpg}</Text>
          <Text style={styles.detailDescription}>Kills/Game</Text>
        </View>
        <View style={styles.detailItems}>
          <Text style={styles.detailHeader}>{(wins/games*100).toFixed(2) + '%'}</Text>
          <Text style={styles.detailDescription}>Win Percentage</Text>
        </View>
        
      </View>
      <View><FlatList
        data={matches}
        renderItem={renderItem}
        keyExtractor={item => item.id}></FlatList></View>
      </ScrollView>}
    </View>
  );
  loadData()
}

const Drawer = createDrawerNavigator();

export default function App() {

  StatusBar.setBarStyle('light-content', true);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" drawerType='slide'>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Details" component={DetailsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>

    
  );
}

