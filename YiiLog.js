// ==UserScript==
// @name       YiiLog
// @namespace  http://gregtyler.co.uk/
// @version    1.0
// @description  Adds time intervals to the YiiLog and adds a bar at the bottom of the screen to show how queries are taking up your pageload time.
// @match      *://yourURLhere/*
// @copyright  2012+, You
// ==/UserScript==
$(function(){
    "use strict";
    var smallHeight = '10px', bigHeight = '40px', $log = $('.yiiLog');
    
    if( $log.length === 0 ) return;
    
    function randCol() { return '#'+Math.floor(Math.random()*16777215).toString(16); }
    
    var start = 0, end = 0, events = [];
    $log.find('tr').each(function(){
        var $this = $(this),
        	$time = $this.find('td:first-child'),
            $text = $this.find('td:nth-child(4)');
        if( !$time || !$time.html() || !$text || !$text.html() ) return true;
        var m = $time.html().match(/([0-9]+):([0-9]+):([0-9]+).([0-9]+)/),
            time = m[1]*3600 + m[2]*60 + 1*m[3] + parseFloat('0.'+m[4]),
            text = $text.text().trim();
        if( start === 0 ) start = time;
        if( text.substr(0,6) === 'begin:' )
            events.push( {type:'begin',text:text, time:time, el: $this.prev()} );
        else if( text.substr(0,4) === 'end:' )
            events.push( {type:'end',text:text, time:time, el: $this.prev()} );
        end = time;
    });
    
    var $div = $('<div />').css({position:'fixed',left:0,bottom:0,right:0,height:smallHeight,backgroundColor:'#333',color:'#FFF',zIndex:2000,transform:'translateZ(0)'}),
        last = start,
        $act = $('<div />').css({position:'absolute',bottom:0,height:'100%',backgroundColor: randCol() ,cursor:'pointer'});
    
    $div.hover(function(){
        $(this).css({ height: bigHeight });
    }, function(){
        $(this).css({ height: smallHeight });
    });
    
    for( var i = 0; i<events.length; i++ ) {
        var time = events[i].time, act = events[i].type;
        if( act === 'begin' ) {
            $act.css('left',((time-start)/(end-start))*100 + '%')
            	.click({event:events[i]}, function(event){
                    $('body').animate({scrollTop:event.data.event.el.position().top});
                });
            last = time;
        } else if( act === 'end' ) {
            $act.css('width',((time-last)/(end-start))*100 + '%')
            	.attr('title',Math.floor((time - last)*1000)/1000 + 's');
            $div.append( $act );
            $act = $('<div />').css({position:'absolute',bottom:0,height:'100%',backgroundColor: randCol(),cursor:'pointer'});
        }
    }
    $('body').append($div);
    
    // Makes the Yii log a bit more helpful by adding diff times into each row
    $($log.find('tr').get().reverse()).each(function(){
      $td = $(this).find('td:first-child'), $comp = $(this).prev().find('td:first-child');
      if( $td.html() && $comp.html() ) {
        var diff = Math.floor(($td.html().substr(6)*1 - $comp.html().substr(6)*1)*100000)/100000;
        $td.append( "<br><strong style='color:" + (diff>0.1?'red':(diff>0.05?'goldenrod':'inherit')) + ";'>" + diff + "</strong>" );
      }
    });
});
