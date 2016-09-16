// If your dizmo has a back side, include this function. Otherwise you
// can delete it!
function showBack() {
    dizmo.showBack();
}

// As soon as the dom is loaded, and the dizmo is ready, instantiate the main class
window.document.addEventListener('dizmoready', function() {
    // Your code should be in here so that it is secured that the dizmo is fully loaded
    document.getElementById('doneBtn').onclick = function() {

        if (DizmoElements('#text-input').val()) {
          jQuery('#maintext').text(DizmoElements('#text-input').val());
          dizmo.publicStorage.setProperty('stdout', DizmoElements('#text-input').val());
          dizmo.privateStorage.setProperty('text', DizmoElements('#text-input').val());

          dizmo.showFront();

        }

    };
    dizmo.setHeight(600);
    dizmo.setWidth(500);
    dizmo.canDock(true);
    if (dizmo.privateStorage.getProperty('text')){
      jQuery('#maintext').text(dizmo.privateStorage.getProperty('text'));
      DizmoElements('#text-input').val(dizmo.privateStorage.getProperty('text'));

    }
    dizmo.publicStorage.setProperty('stdout', jQuery('#maintext').text());
});
