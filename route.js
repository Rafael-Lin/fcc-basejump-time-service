'use strict';


module.exports = function( useragent, locale, app, url, bodyParser ) {

    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    var path = process.cwd();
    var RedirectObj = {};
    var monthArr = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    app.route('/').get(function(req, res) {
        res.sendFile(process.cwd() + '/public/index.html');
    });

    app.route('/api/whoami').get( function( req,res ){
        var retJson ={};
        var arr = req.headers["accept-language"];
        var str = arr.split(",");
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var ip_str =  req.connection.remoteAddress;
        var softwareValue = req.useragent.source;
        var tmpStr = softwareValue.substring(
                             softwareValue.indexOf('(')+1,
                             softwareValue.indexOf(')')  );
        console.log(tmpStr);
        ip_str  = req.headers['x-forwarded-for'] ||
         req.connection.remoteAddress ||
         req.socket.remoteAddress ||
         req.connection.socket.remoteAddress;
        retJson.ipaddress= ip_str ;
        retJson.language = str[0];
        retJson.software = tmpStr ;
        res.json( retJson );
    });

    app.route('/:input')
    .get( function( req,res ){
            var retJson = {};
            var num = req.params.input;

            var array = num.split(',');
            console.log( array );
            console.log( array.length );
            if( array.length == 1  ){
                if( !isNumber( array[0] ) ){
                    res.redirect('/');
                    return ;
                }
                  var date = new Date( Number(  array[0] ) * 1000 );
                  var dateArr = date.toString().split(' ');
                  var dateStr = monthArr[ date.getUTCMonth() ] +" " +  dateArr[2] + ", " +  dateArr[3];
                  console.log( date.toString() );

                  num = dateStr ;
                  retJson.unix = Number(  array[0] ) ;
                  retJson.natural = dateStr ;

            }else{
                try{
                    var inputDate = array[0] + "," + array[1] ;
                    if( !isNumber( array[1] ) )
                        throw new UserException("InvalidMonthNo");

                    var d = Date.parse( inputDate ) / 1000;
                    retJson.unix = d ;
                    retJson.natural = inputDate;
                }catch( e ){
                    console.log( e.message );
                    retJson.unix = null ;
                    retJson.natural = null ;
                }
            }
            res.json( retJson );

        });

    function fullUrl(req) {
      return url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
      });
    }
    app.route('/new/http://:originUrl')
    .get( function( req,res ){
            var retJson = {};
            var originUrl = "http://" + req.params.originUrl;
            /*
            retJson.original_url = originUrl ;
            for( var i = 0 ; i < RedirectObj.length ; i ++  ){
                if(RedirectObj.indexOf( originUrl ) != -1 ){
                    res.redirect( RedirectObj.originUrl ) ;
                    return ;
                }
            }
            req.getUrl = function() {
              return req.protocol + "://" + req.get('host') + req.originalUrl;
            }
            */
           retJson.first = originUrl ;
           retJson.second = fullUrl(req) ;

            res.json( retJson );

        });

};
