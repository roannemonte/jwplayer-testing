/* transcript.js */

var previousElement;

(function($){

    $.fn.playerConnect = function(player){

        var transcriptElements = this;

        player.onTime(function(evt){

                var time =  player.getPosition();
                console.log(time);       // see if working

                 $('.words').each(function(i) {
                                  console.log("time is "+parseFloat(time)+" and start is "+parseFloat(this.getAttribute('data-start'))+" and end is "+(parseFloat(this.getAttribute('data-start')) + parseFloat(this.getAttribute('data-dur'))));

                                  if (parseFloat(time) >= parseFloat(this.getAttribute('data-start')) && parseFloat(time) <= parseFloat(this.getAttribute('data-dur')) + parseFloat(time)) {
                                                   $(previousElement).removeClass("hilite");
                                                   $(this).addClass("hilite");
                                                   previousElement = this;
                                  }

                 });
        });

        return this.click(function(evt){

                 $this = $(this);
                 var time = $this.attr("data-start");
                 player.seek(time);
       })
   };
})(jQuery);

$(document).ready(function(){

   var player = jwplayer("playerDiv").setup({
                    file: "http://www.people.fas.harvard.edu/~lbouthillier/nasa-spinoffs.mp4",
                    //file: "nasa-spinoffs.mp4",
                    height: 360,
                    width: 640,
                    controls:true,
                });

   player.onReady(function(){

        $('.words').playerConnect(player);

    });

});
