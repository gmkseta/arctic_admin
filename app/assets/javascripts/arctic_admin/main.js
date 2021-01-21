document.addEventListener('DOMContentLoaded', () => {

  // right filter sidebar
  const sidebar = document.querySelector('#sidebar')
  if (sidebar) {
    sidebar.addEventListener('click', event => {
      const insideSection = document.querySelector('#filters_sidebar_section')
      if (!(event.target === insideSection || insideSection.contains(event.target))) {
        sidebar.classList.toggle('sidebar_open')
      }
    })
  }

  const menuButton = document.querySelector('#utility_nav')
  const menu = document.querySelector('#tabs')

  // toggle menu sidebar with the menu button
  menuButton.addEventListener('click', event => {
    const currentUser = document.querySelector('#current_user')
    const logout = document.querySelector('#logout')
    const forbiddenLinks = event.target === logout ||
        logout.contains(event.target) ||
        event.target === currentUser ||
        currentUser.contains(event.target)
    if (!forbiddenLinks) {
      menu.classList.toggle('tabs_open')
    }
  })

  // close left menu sidebar on any click outside
  document.body.addEventListener('click', event => {
    const forbiddenLinks = event.target === menu ||
        menu.contains(event.target) ||
        event.target === menuButton ||
        menuButton.contains(event.target)
    if (menu.classList.contains('tabs_open') && !forbiddenLinks) {
      menu.classList.remove('tabs_open')
    }
  })

  // toggle of nested menu items
  const nestedMenuItems = document.querySelectorAll('#tabs .has_nested')
  nestedMenuItems.forEach(
    (nestedMenuItem) => {
      nestedMenuItem.addEventListener('click', (e) => {
        e.stopPropagation()
        nestedMenuItem.classList.toggle('open')
      })
    }
  )

})


document.addEventListener('DOMContentLoaded', () => {
  $(document).on('click touchstart', '#sidebar', function(e) {
    var position = $(this).position();
    var width = $(this).width();
    var target = e.target;
    if ((e.pageX < position.left) && (target.tagName != 'SELECT') && (target.tagName != 'OPTION')) {
      if ($(this).css('right') == '0px') {
        $(this).css('position', 'fixed');
        $(this).animate({
          right: "-="+width
        }, 600, function() {
          $(this).removeAttr('style');
          animationFilterDone = true;
        });
      } else {
        $(this).animate({
          right: "+="+width
        }, 600, function() {
          $(this).css('position', 'absolute');
          animationFilterDone = true;
        });
      }
    }
  });
  var animationDone = true;
  $(document).on('click touchstart', '#utility_nav', function(e) {
    var position = $(this).position();
    var tabs = $('#tabs');
    var width = Math.round(tabs[0].getBoundingClientRect().width);
    if (e.pageX < (position.left + 40)) {
      if(animationDone == true) {
        animationDone = false;
        if (tabs.css('left') == '0px') {
          tabs.animate({
            left: "-="+width
          }, 400, function() {
            animationDone = true;
          });
        } else {
          tabs.animate({
            left: "+="+width
          }, 400, function() {
            animationDone = true;
          });
        }
      }
    }
  });
  $(document).on('click touchstart', 'body', function(e) {
    var tabs = $('#tabs');
    var width = Math.round(tabs[0].getBoundingClientRect().width);
    if (tabs.css('left') == '0px') {
      if (e.pageX > width && e.pageY > 60) {
        if(animationDone == true) {
          animationDone = false;
          tabs.animate({
            left: "-="+width
          }, 400, function() {
            animationDone = true;
          });
        }
      }
    }
  });
  $(document).on('click', '#tabs .has_nested', function(e) {
    e.stopPropagation();
    $('#tabs .has_nested').not(this).removeClass("open").removeClass("current")
    $('#tabs .has_nested').not(this).find("ul").hide()
    $(this).toggleClass('open');
    $(this).find('ul').fadeIn();
  });
});
