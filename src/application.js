// If your dizmo has a back side, include this function. Otherwise you
// can delete it!

//
var data, ajax;
//
var baseurl = "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19&text=";
var username = "a67c42a8-c251-421b-bb00-6e962d446a96";
var password = "lfwQRxM22ujP";
var text;

function showBack() {
    dizmo.showBack();
}
var emotions = [
			{ label: "anger", value: 5 },
			{ label: "disgust", value: 2 },
			{ label: "fear", value: 6 },
			{ label: "joy", value: 3 },
			{ label: "sadness Tern", value: 2 }
		];
var emotioncolors = [ "#A90418", "#592684", "#325E2B", "#FFD629", "#086DB2"];

function drawPieChart(div, values, colors) {
  var pie = new d3pie(div, {
  	header: {
  		title: {
  			text: "Emotions"
  		}
  	},
  	size: {
  		pieOuterRadius: "100%",
  		canvasHeight: 300
  	},
  	data: {
      content : values,
  	},
  	misc: {
  		colors: {
  			segments: colors
  		}
  	}
  });

}
function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  return "Basic " + hash;
}

function getAnalysisFromText(){
  ajax = $.ajax({
    type: "GET",
    url: baseurl + text,
    dataType: 'json',
    async: false,
    data: '{}',
    beforeSend: function (xhr){
      xhr.setRequestHeader('Authorization', make_base_auth(username, password));
    },
    success: function (res){
      console.log(res);
      data = res;
      updateData(res)
      emotions[0].value = res.document_tone.tone_categories[0].tones[0].score;
      emotions[1].value = res.document_tone.tone_categories[0].tones[1].score;
      emotions[2].value = res.document_tone.tone_categories[0].tones[2].score;
      emotions[3].value = res.document_tone.tone_categories[0].tones[3].score;
      emotions[4].value = res.document_tone.tone_categories[0].tones[4].score;
      endlog();
      jQuery('#charts').empty();
      drawPieChart("charts",emotions, emotioncolors);
    }
  });
}
function endlog(){
  console.log("ended");
}
function updateData(data) {
  //parse emotions (first category)
  for (var i = 0; i < data.length; i++) {
    console.log(data.document_tone.tone_categories[0].tones[i].score);

  }
}

// As soon as the dom is loaded, and the dizmo is ready, instantiate the main class
window.document.addEventListener('dizmoready', function() {
    // Your code should be in here so that it is secured that the dizmo is fully loaded
    document.getElementById('doneBtn').onclick = function() {
        dizmo.showFront();
    };

    dizmo.setHeight(700);
    dizmo.setWidth(700);

    DizmoElements('#analyze-button').on('click',function(){
      text = DizmoElements('#input-text').val();
      getAnalysisFromText();
    });

});
