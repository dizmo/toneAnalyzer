// If your dizmo has a back side, include this function. Otherwise you
// can delete it!
var selectedView, selectedEmotion, selectedLanguage, selectedSocial;
var globalsettings = {};

var data, ajax,subscriptionId;
//
var baseurl = "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2016-05-19";
var username = "0494a328-abab-461f-a56a-ef5cb78b7fec";
var password = "PNRn7Sl4tMjl";
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
      drawProgress(confident, data.document_tone.tone_categories[1].tones[1].score, 'rgba(153,153,153,0.4)' , 'rgba(153,153,153,0.3)','confident');
      drawProgress(tentative, data.document_tone.tone_categories[1].tones[2].score , 'rgba(153,153,153,0.4)' , 'rgba(153,153,153,0.3)', 'tentative');

      drawProgress(openness, data.document_tone.tone_categories[2].tones[0].score , 'rgba(173,200,55,0.4)' , 'rgba(173,200,55,0.3)', 'openness');
      drawProgress(conscientiousness, data.document_tone.tone_categories[2].tones[1].score , 'rgba(173,200,55,0.4)' , 'rgba(173,200,55,0.3)', 'conscientiousness');
      drawProgress(extraversion, data.document_tone.tone_categories[2].tones[2].score , 'rgba(173,200,55,0.4)' , 'rgba(173,200,55,0.3)', 'extraversion');
      drawProgress(agreeableness, data.document_tone.tone_categories[2].tones[3].score , 'rgba(173,200,55,0.4)' , 'rgba(173,200,55,0.3)', 'agreeableness');
      drawProgress(emotionalrange, data.document_tone.tone_categories[2].tones[4].score , 'rgba(173,200,55,0.4)' , 'rgba(173,200,55,0.3)', 'emotionalrange');


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
});

jQuery('input[name=language]').on('click', function(){
  selectedLanguage = jQuery('input[name=language]:checked').val();
});

jQuery('input[name=social]').on('click', function(){
  selectedSocial = jQuery('input[name=social]:checked').val();
});

jQuery('#emotion-btn').click();


jQuery('#analyse-btn').on('click', function(){

  jQuery('#default-logo').hide();
  jQuery('#loading-icon').show();
  setTimeout(function(){
  jQuery('svg').remove();
  jQuery('#loading-icon').hide();
  jQuery('#default-display').hide();
  jQuery('#views').show();
  jQuery('#navigation-tab').show();
  debug();
}, 3000);
});

globalsettings.emotions = {};
globalsettings.language = {};
globalsettings.social = {};


});
