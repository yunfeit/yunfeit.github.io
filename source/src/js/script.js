$(function () {
    var music = [
        {
            "url": "data/642431.mp3",
            "name": "平凡之路"
        }
    ];

    var audio = $("<a>" + music[0].name + "</a>");
    audio.attr("id", "miniAudioPlayer");
    audio.attr("class", "audio {autoplay:true,ogg:'audio/allegro.ogg', loop:true}");
    audio.attr("href", music[0].url);
    $("#styleselector").append(audio);
    $("#miniAudioPlayer").mb_miniPlayer({
        width: 300,
        inLine: false,
        id3: false,
        addShadow: false,
        pauseOnWindowBlur: false,
        downloadPage: null
    });

    $.ajax({
        type: 'GET',
        url: 'data/photos.json',
        dataType: 'json',
        success: function (data) {
            var div = $("#photos ul");
            for (var i in data) {
                var li = '<li><a href="' + data[i].img + '" rel="lightbox"><img src="' + data[i].thumb + '"></a></li>';
                div.append(li);
            }
        }
    });
    // START Patch: repair initialize URL with hash
    if (window.location.hash) {
        $('html,body').stop().animate({
            scrollTop: $(window.location.hash).offset().top - 140
        }, 1000, 'easeInOutExpo');
    }
    // END

    $('#styleselector-toggle').bind('click', function () {
        target = $('#styleselector');
        if (target.css('right') === '0px') {
            target.animate({
                right: '-325px'
            });
        } else {
            target.animate({
                right: '0px'
            });
        }
    });

    $('#colors li').bind('click', function () {
        $('#colors li').removeClass('color-active');
        $(this).addClass('color-active');
        color = $(this).attr('id');
        if (color === 'purple') {
            $('#styleselector_css').attr('href', '');
        } else {
            $('#styleselector_css').attr('href', '<%=assets%>css/' + color + '.css');
        }
    });

    //parallax
    $(window).scroll(function () {
        $('#parallax1').css('background-position', '0 -' + $(window).scrollTop() * 0.5 + 'px');
        $('#parallax2').css('background-position', '0 -' + $(window).scrollTop() * 0.2 + 'px');
    })

    //move navbar
    if ($(window).width() >= 979) {
        if ($(window).scrollTop() > 40) {
            $('.navbar').addClass('navbar-move').css('margin-top', 0);
        } else {
            $('.navbar').removeClass('navbar-move').css('margin-top', (40 - $(window).scrollTop()) + 'px')
        }

        $(window).scroll(function () {
            if ($(window).width() >= 979) {
                if ($(window).scrollTop() > 40) {
                    $('.navbar').addClass('navbar-move').css('margin-top', 0);
                } else {
                    $('.navbar').removeClass('navbar-move').css('margin-top', (40 - $(window).scrollTop()) + 'px');
                }
            }
        });
    }
    // toggle sections
    $('section .head .content').bind('click', function () {
        target = $(this).parents('section').find('.box-content');
        if (target.css('display') === 'block') {
            $(this).find('.arrow').addClass('arrow-up');
            $(this).parents('section').animate({
                marginBottom: '50px'
            }, 500);
            $(this).parents('section').prev('section').animate({
                marginBottom: '50px'
            }, 500);
        } else {
            $(this).find('.arrow').removeClass('arrow-up');
            $(this).parents('section').animate({
                marginBottom: '300px'
            }, 500);
            $(this).parents('section').prev('section').animate({
                marginBottom: '300px'
            }, 500);
        }
        target.slideToggle('slow');
    });

    // topnav click event
    $('ul.nav a,#brand a,.custom-nav').bind('click', function (event) {
        var that = $(this);

        $('[data-spy="scroll"]').each(function () {
            $(this).scrollspy('refresh');
        });

        var offset = 140;

        // if window width is smaller than 979px, don't add offset
        if ($(window).width() < 979) {
            offset = 0;
        }

        $('html,body').stop().animate({
            scrollTop: $(that.attr('href')).offset().top - offset
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });
});

function contact_send() {
    contactData = new Object();
    contactData.name = $('#contact-form input[name="name"]').val();
    contactData.email = $('#contact-form input[name="email"]').val();
    contactData.message = $('#contact-form textarea[name="message"]').val();

    // validation
    if (contactData.name == '') {
        $('#contact-form input[name="name"]').parents('.content-no-vert').addClass('error');
        $('#contact-form input[name="name"]').parents('.content-no-vert').fadeOut('slow', function () {
            $(this).fadeIn('slow');
        });
        return false;
    } else {
        $('#contact-form input[name="name"]').parents('.content-no-vert').removeClass('error');
    }

    if (contactData.email == '' || !/^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/.test(contactData.email)) {
        $('#contact-form input[name="email"]').parents('.content-no-vert').addClass('error');
        $('#contact-form input[name="email"]').parents('.content-no-vert').fadeOut('slow', function () {
            $(this).fadeIn('slow');
        });
        return false;
    } else {
        $('#contact-form input[name="email"]').parents('.content-no-vert').removeClass('error');
    }

    $.ajax({
        type: 'POST',
        url: 'data/commit.php',
        data: 'name=' + contactData.name + '&email=' + contactData.email + '&message=' + contactData.message,
        success: function () {
            $('#contact-form input[name="name"]').val('');
            $('#contact-form input[name="email"]').val('');
            $('#contact-form textarea[name="message"]').val('');
            $('#contact-form .button').fadeOut('slow', function () {
                $('#contact-form .button').html('发送成功');
                $('#contact-form .button').fadeIn('slow');
                setTimeout(function () {
                    $('#contact-form .button').fadeOut('slow', function () {
                        $('#contact-form .button').html('发送留言');
                        $('#contact-form .button').fadeIn('slow');
                    });
                }, 3000);
            });
        }
    });
}

var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?3ac417d9ec3cc6fae6b7d81536f831a2";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
