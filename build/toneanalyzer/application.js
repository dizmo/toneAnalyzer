// If your dizmo has a back side, include this function. Otherwise you
// can delete it!

//
var data, ajax,subscriptionId;
//
var baseurl = "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19";
var username = "0494a328-abab-461f-a56a-ef5cb78b7fec";
var password = "PNRn7Sl4tMjl";
var text;

function showBack() {
    dizmo.showBack();
}
var emotions = [
			{ label: "anger", value: 0 },
			{ label: "disgust", value: 0 },
			{ label: "fear", value: 0 },
			{ label: "joy", value: 0 },
			{ label: "sadness", value: 0 }
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
  		},
      subtitle: {
        text: " "
      },
      location: "top-center",
      titleSubtitlePadding: 15
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
      inner: {
        hideWhenLessThanPercentage: 10,
      },
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
    async: true,
    data: text,
    beforeSend: function (xhr){
      xhr.setRequestHeader('Authorization', make_base_auth(username, password));
    },
    success: function (res){
      data = res;
      updateData(res);
      jQuery('#charts').empty();
      jQuery('#loading-overlay').hide();
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
  for (var j = 0; j < tones.length; j++) {
    social[j].value = tones[j].score;
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
    dizmo.canDock(true);
    dizmo.setAttribute('settings/frameopacity', 0);
    DizmoElements('#analyze-button').on('click',function(){
      text = jQuery('textarea').val();
      if (text !== "") {
        jQuery('#charts').empty();
        jQuery('#loading-overlay').show();
      }
      getAnalysisFromText();
    });
    dizmo.onDock(function(dockingDizmo){
      console.log('Docked to dizmo with id ' + dockingDizmo.identifier);
      console.log('text: ' + dockingDizmo.publicStorage.getProperty('stdout'));
      if (dockingDizmo.publicStorage.getProperty('stdout') !== "") {
        DizmoElements('textarea').val(dockingDizmo.publicStorage.getProperty('stdout'));
        jQuery('#analyze-button').click();
      }

      subscriptionId = dockingDizmo.publicStorage.subscribeToProperty('stdout', function(path, val, oldVal) {
        var stdout = val;
        // do something with the stdout variable
        DizmoElements('textarea').val(stdout);
        jQuery('#analyze-button').click();
      });
    });
    dizmo.onUndock(function(undockedDizmo) {
      dizmo.publicStorage.unsubscribeProperty(subscriptionId);
    });



});
