$(document).ready(function() {
        var isMobile = window.matchMedia("only screen and (max-width: 830px)").matches;

        $(".fancybox-button").fancybox({
            type: "image",
            fitToView: false,
            maxWidth: "100%",
            padding: 0,
            nextEffect: "fade",
            prevEffect: "fade",
            autoSize: false,
            scrolling: "no",
            scrollOutside: "false",
            helpers: {
                title: {
                    type: 'outside',
                    position: 'top'
                },
                overlay: { locked: true }
            },
            beforeShow: function() {
                var alt = this.element.find('img').attr('alt');
                this.inner.find('img').attr('alt', alt);
                this.title = alt;

                // hide arrows when mouse is inactive
                var timeout;
                $(document).on("mousemove touchmove", function(e){
                clearTimeout(timeout);
                    if (isMobile) {
                        $(".fancybox-nav span").css("opacity", "1");
                        timeout = setTimeout(function(){
                            $(".fancybox-nav span").css("opacity", "0");
                        }, 1500);
                    } else {
                        $(".fancybox-nav span, .fancybox-close").css("opacity", "1");
                        timeout = setTimeout(function(){
                            $(".fancybox-nav span, .fancybox-close").css("opacity", "0");
                        }, 1500);
                    }
            });

            var timeout2;
            if (isMobile) {
                $(".fancybox-overlay").on("scroll", function(e){
                    clearTimeout(timeout2);
                    $(".fancybox-nav span, .fancybox-close").css("opacity", "0");
                    timeout2 = setTimeout(function(){
                        $(".fancybox-close").css("opacity", "1");
                    }, 300);
                });
            }
            },
            afterShow: function() {
                if ($(".fancybox-image").height() > $(window).height()) {
                    $(".fancybox-inner").addClass("scroll-bottom");
                }

                $(".fancybox-overlay").scroll(function() {
                    if ($(".fancybox-overlay").scrollTop() == 0) {
                        $(".fancybox-inner").removeClass("scroll-top").addClass("scroll-bottom");
                    } else if ($(".fancybox-overlay").scrollTop() + $(".fancybox-overlay").height() - 20 == $(".fancybox-image").height()) {
                        $(".fancybox-inner").removeClass("scroll-bottom").addClass("scroll-top");
                    } else {
                        $(".fancybox-inner").addClass("scroll-top scroll-bottom");
                    }
                });
            }
        });
    });