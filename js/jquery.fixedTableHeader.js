/*!
 * jQuery FixedTableHeader plugin
 *
 * Copyright 2014 Hung Nguyen
 *
 * Date: Tue Nov 4 2014 07:00:00 GMT
 */
/*jslint browser: true, nomen: true, unparam: true, node: true*/
/*global $, jQuery*/
'use strict';
(function ($) {
    $.fn.fixedTableHeader = function () {
        return this.each(function (key, item) {
            var $self = $(this),
                $fixedHeader,
                $originalHeader,
                tableTopOffset,
                tableBottomOffset,
                headerHeight,
                originalWidth = [];

            $self.find('thead > tr > th').each(function (key, item) {
                originalWidth.push($(item).outerWidth());
            });
            function init() {
                $originalHeader = $self.find('thead:first');
                $fixedHeader = $originalHeader.clone();
                $fixedHeader.css('position', 'fixed');
                $fixedHeader.css('display', 'none');
                $fixedHeader.css('height', $self.find('thead').outerHeight());
                $fixedHeader.css('width', $self.find('thead').outerWidth());
                $fixedHeader.css('top', 0);
                $fixedHeader.css('left', $self.find('thead').offset().left);
                $fixedHeader.css('margin-top', 0);
                $fixedHeader.css('z-index', 1);
                $originalHeader.after($fixedHeader);
            }

            function left() {
                return parseInt($self.offset().left, 10) -  parseInt($(window).scrollLeft(), 10);
            }

            function onResize() {
                $fixedHeader.css('left', left());
                $fixedHeader.css('width', $self.find('thead').outerWidth());
                $fixedHeader.find("th").each(function (index) {
                    originalWidth[index] = $originalHeader.find("th").eq(index).outerWidth();
                    $(this).css("min-width", $originalHeader.find("th").eq(index).outerWidth());
                    $(this).css("max-width", $originalHeader.find("th").eq(index).outerWidth());
                });
            }

            function onScroll() {
                tableTopOffset = $self.offset().top;
                headerHeight = $fixedHeader.find('tr').height();
                tableBottomOffset = tableTopOffset + $self.height() - headerHeight;

                $fixedHeader.find('th').each(function (key, item) {
                    $(item).css('min-width', parseInt(originalWidth[key], 10));
                    $(item).css('max-width', parseInt(originalWidth[key], 10));
                });

                $fixedHeader.css('left', left());
                if ($(window).scrollTop() > tableTopOffset && $(window).scrollTop() < tableBottomOffset) {
                    $fixedHeader.show();
                } else {
                    $fixedHeader.hide();
                }
            }
            init();
            $(window).resize(onResize);
            $(window).scroll(onScroll);
        });
    };
}(jQuery));
