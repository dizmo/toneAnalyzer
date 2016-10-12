// If your dizmo has a back side, include this function. Otherwise you
// can delete it!
var selectedView, selectedEmotion, selectedLanguage, selectedSocial, subscriptionId, desub;
var globalsettings = {};

var data, ajax,subscriptionId;
//
var baseurl = "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19";
var username = "e93b137d-6073-4388-8414-038c0a933531";
var password = "XcpjZT4TwMEv";
var text;

//
// function showBack() {
//     dizmo.showBack();
// }
function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  return "Basic " + hash;
}
function appendColoredTextFromSelection(){
  "use strict";
  jQuery('#text-input').empty();
  var sub;
  if(selectedView == "emotion"){
    sub = selectedEmotion;
  }else if (selectedView == "language") {
    sub = selectedLanguage;
  }else {
    sub = selectedSocial;
  }
  desub = sub;

  for (var i = 0; i < data.sentences_tone.length; i++) {




    jQuery('#text-input').append('<span id="span' + i +'">' +data.sentences_tone[i].text+  '</span><br>');

    if (data.sentences_tone[i].tone_categories.length > 0) {
      console.log(data.sentences_tone[i].tone_categories.length);
      if (data.sentences_tone[i].tone_categories[getIndexFromSelection(selectedView)].tones[getIndexFromSelection(sub)].score > 0.75) {
        jQuery('#span' + i).attr('class', 'label high');
      }
      else if (data.sentences_tone[i].tone_categories[getIndexFromSelection(selectedView)].tones[getIndexFromSelection(sub)].score > 0.5) {
        jQuery('#span' + i).attr('class', 'label low');
      }
      else if (selectedView == "language") {
        if (data.sentences_tone[i].tone_categories[getIndexFromSelection(selectedView)].tones[getIndexFromSelection(sub)].score > 0) {
          jQuery('#span' + i).attr('class', 'label low');
        }
      }
    }
  }
  jQuery('.low').css('background-color', getBackgroundColor('low'));
  jQuery('.high').css('background-color', getBackgroundColor('high'));
}
function getBackgroundColor(level){
  var color;
if (selectedView == "language") {
  color = 'rgba(153,153,153,';
}
else if (selectedView == "social") {
  color = 'rgba(173,200,55,';
}
else {
  switch (selectedEmotion) {
    case 'anger':
      color = 'rgba(239,59,69,';
      break;
    case 'disgust':
      color = 'rgba(142,73,156,';
      break;
    case 'fear':
      color = 'rgba(127,137,55,';
      break;
    case 'joy':
      color = 'rgba(236,209,47,';
      break;
    case 'sadness':
      color = 'rgba(88,154,200,';
      break;

  }
}



  if (level === 'high') {
    return color + '0.7)';
  }
  else {
    return color + '0.35)';
  }
}
function getIndexFromSelection(selection){
  switch (selection) {
    case "anger":
      return 0;
    case "disgust":
      return 1;
    case "fear":
      return 2;
    case "joy":
      return 3;
    case "sadness":
      return 4;

    case "analytical":
      return 0;
    case "confident":
      return 1;
    case "tentative":
      return 2;

    case "openness":
      return 0;
    case "conscientiousness":
      return 1;
    case "extraversion":
      return 2;
    case "agreeableness":
      return 3;
    case "emotionalrange":
      return 4;

    case "emotion":
      return 0;
    case "language":
      return 1;
    case "social":
      return 2;
  }
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
      jQuery('svg').remove();

      jQuery('#loading-icon').hide();
      jQuery('#default-display').hide();
      jQuery('#views').show();
      jQuery('#navigation-tab').show();

      drawProgress(anger, data.document_tone.tone_categories[0].tones[0].score , 'rgba(239,59,69,0.4)' , 'rgba(239,59,69,0.3)', 'anger');
      jQuery('#anger .percentage').text(textFromPercentage(data.document_tone.tone_categories[0].tones[0].score, "emotion"));
      drawProgress(disgust, data.document_tone.tone_categories[0].tones[1].score , 'rgba(142,73,156,0.4)' , 'rgba(142,73,156,0.3)', 'disgust');
      jQuery('#disgust .percentage').text(textFromPercentage(data.document_tone.tone_categories[0].tones[1].score, "emotion"));
      drawProgress(fear, data.document_tone.tone_categories[0].tones[2].score , 'rgba(127,137,55,0.4)' , 'rgba(127,137,55,0.3)', 'fear');
      jQuery('#fear .percentage').text(textFromPercentage(data.document_tone.tone_categories[0].tones[2].score, "emotion"));
      drawProgress(joy, data.document_tone.tone_categories[0].tones[3].score , 'rgba(236,209,47,0.4)' , 'rgba(236,209,47,0.3)', 'joy');
      jQuery('#joy .percentage').text(textFromPercentage(data.document_tone.tone_categories[0].tones[3].score, "emotion"));
      drawProgress(sadness, data.document_tone.tone_categories[0].tones[4].score , 'rgba(88,154,200,0.4)' , 'rgba(88,154,200,0.3)', 'sadness');
      jQuery('#sadness .percentage').text(textFromPercentage(data.document_tone.tone_categories[0].tones[4].score, "emotion"));

      drawProgress(analytical, data.document_tone.tone_categories[1].tones[0].score , 'rgba(153,153,153,0.4)' , 'rgba(153,153,153,0.3)','analytical');
      jQuery('#analytical .percentage').text(textFromPercentage(data.document_tone.tone_categories[1].tones[0].score, "emotion"));
      drawProgress(confident, data.document_tone.tone_categories[1].tones[1].score, 'rgba(153,153,153,0.4)' , 'rgba(153,153,153,0.3)','confident');
      jQuery('#confident .percentage').text(textFromPercentage(data.document_tone.tone_categories[1].tones[1].score, "emotion"));
      drawProgress(tentative, data.document_tone.tone_categories[1].tones[2].score , 'rgba(153,153,153,0.4)' , 'rgba(153,153,153,0.3)', 'tentative');
      jQuery('#tentative .percentage').text(textFromPercentage(data.document_tone.tone_categories[1].tones[2].score, "emotion"));

      drawProgress(openness, data.document_tone.tone_categories[2].tones[0].score , 'rgba(173,200,55,0.4)' , 'rgba(173,200,55,0.3)', 'openness');
      jQuery('#openness .percentage').text(textFromPercentage(data.document_tone.tone_categories[2].tones[0].score, "emotion"));
      drawProgress(conscientiousness, data.document_tone.tone_categories[2].tones[1].score , 'rgba(173,200,55,0.4)' , 'rgba(173,200,55,0.3)', 'conscientiousness');
      jQuery('#conscientiousness .percentage').text(textFromPercentage(data.document_tone.tone_categories[2].tones[1].score, "emotion"));
      drawProgress(extraversion, data.document_tone.tone_categories[2].tones[2].score , 'rgba(173,200,55,0.4)' , 'rgba(173,200,55,0.3)', 'extraversion');
      jQuery('#extraversion .percentage').text(textFromPercentage(data.document_tone.tone_categories[2].tones[2].score, "emotion"));
      drawProgress(agreeableness, data.document_tone.tone_categories[2].tones[3].score , 'rgba(173,200,55,0.4)' , 'rgba(173,200,55,0.3)', 'agreeableness');
      jQuery('#agreeableness .percentage').text(textFromPercentage(data.document_tone.tone_categories[2].tones[3].score, "emotion"));
      drawProgress(emotionalrange, data.document_tone.tone_categories[2].tones[4].score , 'rgba(173,200,55,0.4)' , 'rgba(173,200,55,0.3)', 'emotionalrange');
      jQuery('#emotionalrange .percentage').text(textFromPercentage(data.document_tone.tone_categories[2].tones[4].score, "emotion"));


    }
  });
}
function textFromPercentage(percentage, type){
  var likely;
  if (percentage>0.5){
    likely = ' likely';
  }
  else{
    likely = ' unlikely';
  }
  if (type === "emotion") {
    return Math.floor(percentage*100)/100 + likely;
  }
}
function drawProgress(container, p, color, colorlight, label) {
  var bar = new ProgressBar.Line(container, {
    strokeWidth: 1,
    easing: 'easeInOut',
    duration: 1400,

    color: color,
    trailColor: colorlight,
    trailWidth: 1,
    svgStyle: {width: '100%', height: '30px'}
  });

  bar.animate(p);  // Number from 0.0 to 1.0

  var id = jQuery(container).attr('id');
return bar;
}
function debug() {
  globalsettings.emotions = {};
  globalsettings.language = {};
  globalsettings.social = {};


drawProgress(anger, 0.1 , 'rgba(239,59,69,0.4)' , 'rgba(239,59,69,0.3)', 'anger');
drawProgress(disgust, 0.8 , 'rgba(142,73,156,0.4)' , 'rgba(142,73,156,0.3)', 'disgust');
drawProgress(fear, 0.32 , 'rgba(127,137,55,0.4)' , 'rgba(127,137,55,0.3)', 'fear');
drawProgress(joy, 0.1 , 'rgba(236,209,47,0.4)' , 'rgba(236,209,47,0.3)', 'joy');
drawProgress(sadness, 0.85 , 'rgba(88,154,200,0.4)' , 'rgba(88,154,200,0.3)', 'sadness');

drawProgress(analytical, 0.6 , 'rgba(153,153,153,0.4)' , 'rgba(153,153,153,0.3)','analytical');
drawProgress(confident, 0.5 , 'rgba(153,153,153,0.4)' , 'rgba(153,153,153,0.3)','confident');
drawProgress(tentative, 0.2 , 'rgba(153,153,153,0.4)' , 'rgba(153,153,153,0.3)', 'tentative');

drawProgress(openness, 0.7 , 'rgba(173,200,55,0.4)' , 'rgba(173,200,55,0.3)', 'openness');
drawProgress(conscientiousness, 0.5 , 'rgba(173,200,55,0.4)' , 'rgba(173,200,55,0.3)', 'conscientiousness');
drawProgress(extraversion, 0.4 , 'rgba(173,200,55,0.4)' , 'rgba(173,200,55,0.3)', 'extraversion');
drawProgress(agreeableness, 0.7 , 'rgba(173,200,55,0.4)' , 'rgba(173,200,55,0.3)', 'agreeableness');
drawProgress(emotionalrange, 0.8 , 'rgba(173,200,55,0.4)' , 'rgba(173,200,55,0.3)', 'emotionalrange');

}
function setRadioButtonBackgrounds(){
  jQuery('.dizmo-radiobutton .dizmo-radiobutton-label span.dizmo-radiobutton-label-image').css('background-image', 'url(style/radiobutton-unchecked.svg)');
  jQuery('.dizmo-radiobutton .dizmo-radiobutton-input:checked + .dizmo-radiobutton-label span.dizmo-radiobutton-label-image').css('background-image', 'url(style/radiobutton-checked.svg)');
}
// As soon as the dom is loaded, and the dizmo is ready, instantiate the main class
window.document.addEventListener('dizmoready', function() {
    // Your code should be in here so that it is secured that the dizmo is fully loaded
    document.getElementById('doneBtn').onclick = function() {
        dizmo.showFront();
    };

dizmo.setHeight(550);
dizmo.setWidth(400);
dizmo.canDock(true);
dizmo.setAttribute('settings/title', "Tone Analyzer");
jQuery('#front').css('background-image', 'url(style/background.png)');
setRadioButtonBackgrounds();
debug();


jQuery('#navigation-tab button').on('click', function(){
  jQuery('#navigation-tab button').css('background', 'none');
  jQuery('#navigation-tab button').css('color', 'rgb(87,151,229)');


  jQuery(this).css('background-color', 'rgb(87,151,229)');
  jQuery(this).css('color', 'white');
  jQuery(this).css('padding-left', '20px');

  jQuery(this).css('padding-right', '20px');
  jQuery(this).css('border-color', 'rgb(87,151,229)');

  selectedView = jQuery(this).attr('view');

  jQuery('.front-view').hide();
  jQuery('#' + selectedView).show();
});

jQuery('input[type=radio]').on('click', function(){
  setRadioButtonBackgrounds();
});

jQuery('input[name=emotion]').on('click', function(){
  selectedEmotion = jQuery('input[name=emotion]:checked').val();
  appendColoredTextFromSelection();
});

jQuery('input[name=language]').on('click', function(){
  selectedLanguage = jQuery('input[name=language]:checked').val();
  appendColoredTextFromSelection();
});

jQuery('input[name=social]').on('click', function(){
  selectedSocial = jQuery('input[name=social]:checked').val();
  appendColoredTextFromSelection();
});

jQuery('#emotion-btn').click();


jQuery('#analyse-btn').on('click', function(){

  jQuery('#default-display').show();
  jQuery('#views').hide();
  jQuery('#navigation-tab').hide();

  text = jQuery('#text-input').text();
  getAnalysisFromText();
  jQuery('#default-logo').hide();
  jQuery('#loading-icon').show();
  jQuery('svg').remove();
});

dizmo.onDock(function(dockingDizmo){
  console.log('Docked to dizmo with id ' + dockingDizmo.identifier);
  console.log('text: ' + dockingDizmo.publicStorage.getProperty('stdout'));
  if (dockingDizmo.publicStorage.getProperty('stdout') !== "") {
    jQuery('#text-input').text(dockingDizmo.publicStorage.getProperty('stdout'));
    jQuery('#analyse-btn').click();
  }

  subscriptionId = dockingDizmo.publicStorage.subscribeToProperty('stdout', function(path, val, oldVal) {
    var stdout = val;
    // do something with the stdout variable
    jQuery('#text-input').text(stdout);
    jQuery('#analyse-btn').click();
  });
});
dizmo.onUndock(function(undockedDizmo) {
  dizmo.publicStorage.unsubscribeProperty(subscriptionId);
});

globalsettings.emotions = {};
globalsettings.language = {};
globalsettings.social = {};


});
