/*export var GLOBAL = {
  url :'http://localhost:4200/api',
  ip: '127.0.0.1'
}*/
export var GLOBAL = {
  server : 'http://localhost:3977',
  url :function(api){
    if (api === 'user') {
      return this.server + '/api/user'
    } else if (api === 'artist') {
      return this.server + '/api/artist'
    } else  if (api === 'album') {
      return this.server + '/api/album'
    } else  if (api === 'song') {
      return this.server + '/api/song'
    }
  },
  ip: '127.0.0.1'
}
