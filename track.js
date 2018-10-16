/*  */
//Get Data
getIP();

function ValidateIPaddress(ipaddress) {
 if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
  {
    return (true);
  }
    return (false);
}


function getGEO(ip){
    if(ValidateIPaddress(ip)==true){
        var GEO = new XMLHttpRequest();
        GEO.open('GET', 'http://ip-api.com/json/', true);
        GEO.onload = function () {
            if(GEO.readyState == 4 && GEO.status == 200 ){
                var GEOarray = JSON.parse(this.response);
                if(GEOarray['status']=="success"){
                    SendTraffic(GEOarray);
                    $str="IP Address = "+ ip +"<br/> City = " + GEOarray['city'] + "<br/>State= " +GEOarray['regionName'] + "<br> Country="+ GEOarray['country'] + "<br> Zip= " + GEOarray['zip'];
                    document.getElementById("IP").innerHTML =$str;
                }
              } else {
                return false;
            }
        }
        GEO.send();
    }else{
        return false;
    } 
}

// IP Address
function getIP(){
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.ipify.org', true);
    request.onload = function () {
      if (request.readyState == 4 && request.status == 200 ) {
            var ip = this.response;
            getGEO(ip);
      }
    }
    request.send();
}

//Send Data
function SendTraffic(GEOarray){
    var req = new XMLHttpRequest();
    //ar postData = 'ip='++'&p2=y';
    var postData = 'ip='+GEOarray['query']+'&status='+GEOarray['status']+'&city='+GEOarray['city'];
    req.open('POST', '../tracker/trafic.php', true);
    req.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
    req.onreadystatechange = function()
    {
      if ( req.readyState == 4 && req.status == 200 )
      {
        //alert( 'Got Stuff Back= ' + req.responseText );
      }
    }
    req.send(postData);
    console.log(GEOarray); 
}
