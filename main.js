//global variables
var dstack = [];
var rstack = [];
var pstack = [];
var rawinput = [];
var program = [];
var maxchar = 0;
var pc = 0;

//screen initialization
var screen = new Jscreen(256,256,2);
screen.init();

//sound initialization
var sound = new Jsound();


//ALU and stack operations
function exec(a, b)
{
    if (a == "put")
        dstack.push(b);

    if (a == "pop")
        rstack.push(dstack.pop());

    if (a == "pul")
        dstack.push(rstack.pop());

    if (a == "add")
        dstack.push(dstack.pop() + dstack.pop());

    if (a == "sub")
        dstack[dstack.length-2] = dstack[dstack.length-2] - dstack.pop();

    if (a == "mul")
        dstack.push(dstack.pop() * dstack.pop());

    if (a == "div")
        dstack[dstack.length-2] = Math.round(dstack[dstack.length-2] / dstack.pop());

    if (a == "jnr")
        if (dstack[dstack.length-1] != rstack[rstack.length-1])
            pc = b - 1;

    if (a == "dup")
        dstack.push(dstack[dstack.length-1]);

    if (a == "dis")
        screen.draw(dstack[dstack.length-2], dstack[dstack.length-1]);
    
    if (a == "snd")
        sound.play(dstack[dstack.length-1]);

    if (a == "clr")
        screen.clear();
}

//input handling and parsing
function parse(input)
{
    var inp = input.split(" ");
    inp[1] = parseInt(inp[1]);
    program.push(inp);
}

document.addEventListener("keydown", function(e)
{
    e.preventDefault();
    if (e.key == "Enter" && rawinput.length > 0)
    {
        rawinput = rawinput.join("");
        parse(rawinput);
        rawinput = [];
        maxchar = 0;
        screen.jumpline();
        
        sound.type = "sine";
        sound.play(30);
    }
    
    if (e.key == "Backspace" && maxchar >= 0)
    {
        rawinput.pop();
        maxchar--;
        screen.delchar();
    }
    
    if (e.key == "Control")
    {
        sound.type = "sine";
        screen.clearheight = 0;
        screen.clear();
        screen.chary = 20;
        if (screen.mode == "text")
        {
            screen.mode = "graph";
        }
        else
        {
            screen.mode = "text";
            screen.write("");
        }

        while (pc < program.length)
        {
                exec(program[pc][0], program[pc][1]);
                pc++;
        }
        pc = 0;
        program = [];
        screen.chars = [];   
    }

    if (maxchar < 7 && (e.keyCode == 32 || e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 65 && e.keyCode <= 90))
    {
        screen.write(e.key);
        rawinput.push(e.key);
        maxchar++;
    }

    //debug
    // console.clear();
    // console.log(dstack);
    // console.log(rstack);
    // console.log(pstack);
    // console.log(rawinput);
    // console.log(program);
    // console.log(pc);
});

//character display
