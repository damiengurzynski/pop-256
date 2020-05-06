class Jscreen
{
    constructor(row,col,cellsize)
    {
        this.rows = row;
        this.cols = col;
        this.csize = cellsize;
        this.pxheight = this.rows * this.csize;
        this.pxwidth = this.cols * this.csize;
        this.dram = [];
        this.screen = document.createElement("canvas");
        this.ctx = this.screen.getContext("2d");
        this.mode = "text";
        this.chars = [];
        this.charx = 5;
        this.chary = 20;
        this.clearheight = 0;
    }
    
    init()
    {
        this.screen.height = this.pxheight;
        this.screen.width = this.pxwidth;
        this.screen.style.backgroundColor = "goldenrod";
        document.body.appendChild(this.screen);
        this.write();

        for (var i = 0; i < this.rows * this.cols; i++)
        {
            this.dram.push(0);
        }
    }

    draw(x,y)
    {
        if (this.mode == "graph")
        {
            var pos = x + (y * this.rows);
            x *= this.csize;
            y *= this.csize;
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(x,y,this.csize,this.csize);
            this.dram[pos] = 1;
        }
    }

    write(letter)
    {
        if (this.mode == "text")
        {
            this.clear();
            this.chars.pop();
            this.chars.push(letter);
            this.chars.push("_");
            this.ctx.font = "20px Monospace";
            this.ctx.fillStyle = "white";
            this.ctx.fillText(this.chars.join(""), this.charx, this.chary);
        }
    }

    jumpline()
    {
        this.chars.pop();
        this.clear();
        this.ctx.fillText(this.chars.join(""), this.charx, this.chary);
        this.chary += 25;
        this.clearheight += 25;
        this.chars = [];
        this.write();
    }

    delchar()
    {
        this.chars.pop();
        this.chars.pop();
        this.chars.push("_")
        this.clear();
        this.ctx.font = "20px Monospace";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.chars.join(""), this.charx, this.chary);
    }

    clear()
    {
        this.ctx.clearRect(0,this.clearheight,this.pxwidth, this.pxheight);
    }
}