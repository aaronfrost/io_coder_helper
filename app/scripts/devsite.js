'use strict';

//var b = /(goo\.gl\/[A-Za-z0-9]{2,8})/g;
//var a = document.body.innerText;
//var c = b.exec(a);
//if(c != null){
//  alert('Found Codes!!!!\n\n'+ c.join('\n'));
//}

var foohtml = document.body.innerHTML;
var pattern = /<!-- Such colors.*?\n.*?color: #(\d{6}).*?color: #(\d{6}).*?\n.*?\n .*?(\d{6} \d{6} \d{6} \d{6} \d{6} \d{6}) .*? -->/g;
var matches = pattern.exec(foohtml);

var firstColor, secondColor, binary;
console.log("HERE");
if(matches && matches.length){
  firstColor = matches[1],
    secondColor = matches[2],
    binary = matches[3].split(' ');
  var nums = '';
  for(var i = 0; i < binary.length; i++){
    nums += parseInt(binary[i].substr(-3), 2);
  }
  var conversion = convert(firstColor, secondColor, nums);
  var url = 'goo.gl/'+conversion;
  var urls = JSON.parse(localStorage.urls || '[]');
  if(urls.indexOf(url) < 0){
    urls.push(url);
    localStorage.urls = JSON.stringify(urls);
    alert(url);
  } else {
    console.log('FOUND ONE', url);
  }

}


function hex2a(hexx) {
  var hex = hexx.toString();//force conversion
  var str = '';
  for (var i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}
function moreHex(one, two){
  var rone = hex2a(one);
  var rtwo = hex2a(two);
  return rone+rtwo;
}
function convert(one, two, order){
  var orderString = ""+order;
  var code = moreHex(one, two);
  var objArray = [];
  code.split('').forEach(function(char, index){
    objArray.push({val:char, order:orderString.split('')[index]})
  });

  objArray.sort(function(o, next){
    return parseInt(o.order, 10) > parseInt(next.order, 10);
  });
  var blah = objArray.map(function(o){
    return o.val;
  });
  return blah.join('');
}
