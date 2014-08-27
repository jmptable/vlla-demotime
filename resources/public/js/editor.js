function init() {
    $('#name').val(chance.first());

    for(var i=0; i < vlla.width * vlla.height; i++) {
        vlla.pixels[i] = [0, 0, 0];
    }

    update();

    var textarea = $('#editor');

    var mode = 'javascript';

    var editDiv = $('<div>', {
        position: 'absolute',
        width: textarea.width(),
        height: textarea.height(),
        'class': textarea.attr('class')
    }).insertBefore(textarea);

    textarea.css('visibility', 'hidden');

    var editor = ace.edit(editDiv[0]);
    editor.renderer.setShowGutter(false);
    editor.getSession().setValue(textarea.val());
    editor.getSession().setMode("ace/mode/" + mode);
    editor.setTheme("ace/theme/idle_fingers");

    // copy back to textarea on form submit...
    textarea.closest('form').submit(function () {
        textarea.val(editor.getSession().getValue());
    });

    $('#preview').on('click', function() {
        run = false;

        code = editor.getSession().getValue();

        var bugged = false;

        try {
            eval(code);
        } catch(e) {
            if(e instanceof SyntaxError) {
                alert(e.message);
            }

            bugged = true;
        }

        if(!bugged) {
            t = 0;
            run = true;
        } else {
            run = false;
        }
    });
}

code = "";
run = false;

t = 0;
setInterval(function() {
    if(run) {
        eval(code);
        t += 1;
    }
}, 100);

width = 60;
height = 32;
color = [255, 255, 255];
vlla = {
    scale: 10,
    width: 60,
    height: 32,
    pixels: []
}

function paint(x, y) {
    if(x >= 0 && x < vlla.width && y >= 0 && y < vlla.height) {
        vlla.pixels[y*vlla.width+x] = color;
    }
}

function color(r, g, b) {
    color = [r, g, b];
}

function update() {
    var canvas = $('#viewport')[0];
    var ctx = canvas.getContext('2d');

    for(var y=0; y < vlla.height; y++) {
        for(var x=0; x < vlla.width; x++) {
            var c = vlla.pixels[y*vlla.width+x];
            ctx.fillStyle = 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
            ctx.fillRect(x*vlla.scale, y*vlla.scale, vlla.scale, vlla.scale);
        }
    }
}
