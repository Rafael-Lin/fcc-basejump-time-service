'use strict';


module.exports = function( app ) {

    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    var path = process.cwd();
    var monthArr = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    app.route('/').get(function(req, res) {
        res.sendFile(process.cwd() + '/public/index.html');
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

        }
    )

};
