// photo limit 2 mb
$(function(){
    let fileInput = $('.input-file');
        maxSize = fileInput.data('max-size');
        label = fileInput.next();
        labelVal = label.html();

    fileInput.change(function(e){
        let fileName = e.target.value.split( '\\' ).pop();
        if(fileInput.get(0).files.length){
            let fileSize = fileInput.get(0).files[0].size; // in bytes
            if(fileSize > maxSize){
                alert('размер файла превышает 2Мб');
                return false;
            }
            else {
                label.html(fileName).addClass('input-btn__text')
            }
        }
        else {
            label.html(labelVal)
            return false;
        }
    });
});

// google maps
function initMap() {
    let myLatlng = new google.maps.LatLng(59.939284, 30.336480);
        myOptions = {
        zoom: 13,
        center: myLatlng
    }
    let map = new google.maps.Map(document.getElementById("map"), myOptions);
        geocoder = new google.maps.Geocoder();

    google.maps.event.addListener(map, 'click', function(event) {
        geocoder.geocode({
            'latLng': event.latLng
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    $('#input-address').val(results[0].formatted_address);
                }
            }
        });
    });
}

// drop down calendar
$.datetimepicker.setLocale('ru');
$('#datetimepicker').datetimepicker({
            timepicker: false,
            format:'d/m/Y',
            maxDate: '0',
            dayOfWeekStart: '1'
        })

// regular expressions
$.validator.addMethod("checkName", function(value, element) {
    return /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u.test(value);
});

// validation check
$(".form").validate({
    rules: {
        name: {
            required: true,
            minlength: 3,
            checkName: true
        },
        surname: {
            required: true,
            minlength: 3,
            checkName: true
        },
        email: {
            required: true,
            email: true
        },
        tel: {
            required: true
        },
        date: {
            required: true,
            date: false
        },
        address: {
            required: true
        }
    },
    messages: {
        name: {
            required: "Пожалуйста, укажите ваше имя",
            minlength: "Пожалуйста, введите не менее 2-х символов",
            checkName: "Пожалуйста, введите коректное имя"
        },
        surname: {
            required: "Пожалуйста, укажите вашу фамилию",
            minlength: "Пожалуйста, введите не менее 2-х символов",
            checkName: "Пожалуйста, введите коректное имя"
        },
        email: {
            required: "Нам нужен ваш адрес электронной почты, чтобы связаться с вами",
            email: "Ваш адрес электронной почты должен быть в формате name@domain.com",
        },
        tel: {
            required: "Нам нужен ваш номер телефона, чтобы связаться с вами"
        },
        date: {
            required: "Пожалуйста, укажите вашу дату рождения"
        },
        address: {
            required: "Пожалуйста, укажите адрес проживания"
        }
    }
});

// form submission
$('.form__submit').click(function () {
    let form = $('.form')
    if (form.valid()) {
        form[0].reset()
        label.html(labelVal)
        smoke.alert ("Ваше сообщение <br> успешно отправлено")
    }
    else {
        return false
    }
});

// mask
$('.js-phone').inputmask("+7 (999) 999 - 99 - 99", {autoclear: false});
$('.date').inputmask("**/**/****", {autoclear: false})
$('.js-email').inputmask ({
    mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
    greedy: false,
    casing: "lower",
    onBeforePaste: function(pastedValue, opts) {
        pastedValue = pastedValue.toLowerCase();
        return pastedValue.replace("mailto:", "");
    },
    definitions: {
        "*": {
            validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5!#$%&'*+/=?^_`{|}~-]"
        },
        "-": {
            validator: "[0-9A-Za-z-]"
        }
    },
    onUnMask: function(maskedValue, unmaskedValue, opts) {
        return maskedValue;
    },
})


