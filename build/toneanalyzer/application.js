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
			{ label: "anger", value: 0 },
			{ label: "disgust", value: 0 },
			{ label: "fear", value: 0 },
			{ label: "joy", value: 0 },
			{ label: "sadness Tern", value: 0 }
		];
var emotioncolors = [ "#A90418", "#592684", "#325E2B", "#FFD629", "#086DB2"];

var social = [
			{ label: "Openness", value: 0 },
			{ label: "Conscientiousness", value: 0 },
			{ label: "Extraversion", value: 0 },
      { label: "Agreeableness", value: 0 },
      { label: "Emotional Range ", value: 0 }
		];
var socialcolors = [ "#A90418", "#592684", "#325E2B", "#FFD629", "#086DB2"];






var lang = [
			{ label: "analytical", value: 0 },
			{ label: "confident", value: 0 },
			{ label: "tentative", value: 0 }
		];
var langcolors = [ "#A90418", "#592684", "#325E2B", "#FFD629", "#086DB2"];


function drawPieChart(div, values, colors, label, width) {
  var pie = new d3pie(div, {
  	header: {
  		title: {
  			text: label,
        color: "white",
        font: "VAG Rounded"
  		}
  	},
  	size: {
  		pieOuterRadius: "100%",
      // pieInnerRadius: "60%",
  		canvasHeight: 200,
      canvasWidth: width
  	},
  	data: {
      content : values,
  	},
    labels : {
      mainLabel: {
        color: "white",
        font: "VAG Rounded",
        fontSize: 10
      },
      lines: {
        enabled: true,
        style: "straight",
        color: "white" // "segment" or a hex color
      }
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
    type: "POST",
    url: baseurl,
    dataType: 'json',
    contentType: 'text/plain',
    async: false,
    data: text,
    beforeSend: function (xhr){
      xhr.setRequestHeader('Authorization', make_base_auth(username, password));
    },
    success: function (res){
      data = res;
      updateData(res)
      jQuery('#charts').empty();
      drawPieChart("charts",emotions, emotioncolors, "emotions", 500);
      if (lang.show) {
        drawPieChart("charts",lang, langcolors, "languages", 350);

      }
      drawPieChart("charts",social, socialcolors, "social", 350);


    }
  });
}
function endlog(){
  console.log("ended");
}
function updateData(data) {
  //parse emotions (first category)
  var empty = 0;
  var tones = data.document_tone.tone_categories[0].tones;
  for (var i = 0; i < tones.length; i++) {
    emotions[i].value = tones[i].score;
  }
  tones = data.document_tone.tone_categories[1].tones;
  for (var i = 0; i < tones.length; i++) {
    lang[i].value = tones[i].score;
    if (tones[i].score == 0) {
      empty++;
    }
    if (empty>1) {
      lang.show = false;
    }
    else {
      lang.show = true;
    }
  }
  tones = data.document_tone.tone_categories[2].tones;
  for (var i = 0; i < tones.length; i++) {
    social[i].value = tones[i].score;
  }
}

// As soon as the dom is loaded, and the dizmo is ready, instantiate the main class
window.document.addEventListener('dizmoready', function() {
    // Your code should be in here so that it is secured that the dizmo is fully loaded
    document.getElementById('doneBtn').onclick = function() {
        dizmo.showFront();
    };

    dizmo.setHeight(811);
    dizmo.setWidth(935);
    dizmo.setAttribute('settings/frameopacity', 0);
    DizmoElements('#analyze-button').on('click',function(){
      text = jQuery('textarea').val();
      getAnalysisFromText();
    });

});
