$.sidebarMenu = function (menu) {
    var animationSpeed = 100,
        subMenuSelector = '.sidebar-submenu';

    $(menu).on('click', 'li a', function (e) {
        var $this = $(this);
        var checkElement = $this.next();
        var spanElem = '';

        if (checkElement.is(subMenuSelector) && checkElement.is(':visible')) {
            checkElement.slideUp(animationSpeed, function () {
                checkElement.removeClass('menu-open');
                $('a').removeClass('active-color');
                $this.parents('ul').first().prev('a').addClass('active-color');
                spanElem = $this.children('span');
                // spanElem.removeClass('icon-down').addClass('icon-right');
                spanElem.html('&#9654;&#xFE0E;');
            });
            checkElement.parent("li").removeClass("active");
        }
        else if ((checkElement.is(subMenuSelector)) && (!checkElement.is(':visible'))) {
            var parent = $this.parents('ul').first();
            var ul = parent.find('ul:visible').slideUp(animationSpeed);
            ul.removeClass('menu-open');
            var parent_li = $this.parent("li");
            spanElem = parent.find('ul:visible').prev('a').children('span');
            // spanElem.removeClass('icon-down').addClass('icon-right');
            spanElem.html('&#9654;&#xFE0E;');

            checkElement.slideDown(animationSpeed, function () {
                checkElement.addClass('menu-open');
                parent.find('li.active').removeClass('active');
                parent_li.addClass('active');
                $('a').removeClass('active-color');
                $this.addClass('active-color');
                
                spanElem = $this.children('span');
                // spanElem.removeClass('icon-right').addClass('icon-down');
                spanElem.html('&#9660;');

            });
        }
        if (checkElement.is(subMenuSelector)) {
            e.preventDefault();
        }
    });
}
