<script lang="ts">
  // TODO handle tick or use 
  // TODO adjust canvas size to be a multiple of STEP
  import { beforeUpdate, onMount, tick } from "svelte";
  import { onDestroy } from 'svelte';

  // TODO transform to properties
  const KEYS = ["ArrowRight","ArrowLeft","ArrowDown","ArrowUp"];
  const KEYS_CODES = [37,38,39,40];
  const INIT_KEY = "ArrowRight";
  const STEP = 10;
  const TIMER = 300; // ms
  const REBOND = false;
  const PAUSE_ALLOWED = true;
  const SEFL_ALLOWED = false;
  const BGcolor = "#f1b06c";

  let posX = 0;
  let posY = 0;
  // left = 37, up = 38, right = 39, down = 40
  let key = INIT_KEY;
  let m = { x: 0, y: 0 };
  let pixelRatio=1;
  let started = false;
  let paused = false;
  let ended = false;
  let lastFrame: number = 0; // calculate the exact time
  
  const snake: number[][] = [];
  const food: number[][] = [];
 
  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

	let canvas : HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let width: number, height: number;
  let snakeLength = 2;
  //$: size = Math.min(width, height);

  // setup an interval timer to update the store's value repeatedly over time
  let interval: number | undefined = undefined;
  
  onMount(async () => {
      ctx = canvas.getContext("2d");
      width  = canvas.offsetWidth; // avoid looping
      height = canvas.offsetHeight;
  });

  onDestroy(() => {
    if (interval)
      clearInterval(interval);
  });

  function initStart() {
    posX = 0;
    posY = 0;
    ended = false;
    paused = false;
    started = false;
    snake.length=0;
    food.length=0;
    let key = INIT_KEY;
  }

  // TODO use requestAnimationFrame
  function start() {
    if (!ended && !started && !paused) {
      if (!interval) { // not already running
        initStart();
        putFood();
        lastFrame = +new Date,
        interval = setInterval(()=>{
          let now = +new Date, deltaT = now - lastFrame;
          if (deltaT > TIMER) { // advance only after the same time
            advance();
            lastFrame = now;
          }
        }, 16);	// every 16 ms ==> 60 fps 	
        started = true;
      }
    }
    if (paused) paused = false;
  }

  function clear(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) {
    ctx!.clearRect(0,0,width,height);
    started = false;
    ended = false;
    paused = false;
  }

  function pause(){
    paused = true;
  }

  // coloryfy the snake and end the process
  // c: color
  function endGame(c:string) {
    started = false;
    ended = true;
    paused = false;
    ctx!.fillStyle = c;
    snake.forEach(p => {
      let [x,y] = p
      ctx!.fillRect(x,y,STEP,STEP);     
    });
    if (interval)
      clearInterval(interval);
  }

  // return a.every((val, idx) => val === b[idx])
  // (a[0] == b[0]) && (a[1] == b[1]) 
  function findNumTuple(arr: number[][], tuple: number[]): boolean {
    return arr.find((e: number[])=>{
      return e.every((val, idx) => val === tuple[idx])
    }) != undefined // TODO: fast search through BS or Maps
  }

  // test array equality
  const advance = async () => {
    if (started && !ended && !paused && (ctx != null)) {
      ctx.fillStyle = "black";
      if (((posX+STEP-1) > width) || (posX < 0) ||
          (posY < 0) || ((posY+STEP-1) > height)) {
        // if (REBOND)   
        endGame("red");
      } else {
        if (findNumTuple(snake,[posX,posY])) {
          endGame("blue");
        } else {
          if (findNumTuple(food,[posX,posY])) {
            //grow()
            snakeLength += 1;
            putFood();
          } 
          ctx.fillRect(posX,posY,STEP,STEP);
          snake.push([posX,posY])
          if (snake.length > snakeLength) {
            let p = snake.shift();
            if (p) {
              let [x, y] = p;
              ctx.fillStyle = BGcolor;
              ctx.fillRect(x,y,STEP,STEP);     
            }
          }
          //console.log(snake);
          switch (key) {
            case "ArrowLeft": posX -= STEP; break;
            case "ArrowRight": posX += STEP; break;
            case "ArrowUp": posY -= STEP; break;
            case "ArrowDown": posY += STEP; break;
          }
        } 
      }
    }
  }

  function putFood(n: number = 1){
    if (ctx != null) {
      ctx.fillStyle = "green";
      for (let i =0; i < n; i++) {
        let s = "";
        let x = -1;
        let y = -1;
        do { 
          x = getRandomInt(0, Math.floor(width/STEP)) * STEP;
          y = getRandomInt(0, Math.floor(height/STEP)) * STEP;
        } while (findNumTuple(snake,[x,y]) || findNumTuple(food,[x,y]));
        food.push([x,y]); // not in either food or snake ==> free case
        ctx.fillRect(x,y,STEP,STEP);
      }
    }
  }


  const onKeyDown = (event: KeyboardEvent) => {
    //if (event.defaultPrevented) return;

    // var key = event.key || event.keyCode;
    // if (key === 'Escape' || key === 'Esc' || key === 27) {
    if (KEYS_CODES.includes(event.keyCode)) {
      key = event.key;
      advance();
      //console.log(key);
    }
    // event.stopPropagation();
  }

  // down
  function handlePointer(event: PointerEvent & { currentTarget: EventTarget & HTMLCanvasElement; }) {
      m.x = event.clientX;
      m.y = event.clientY;
      console.log("The pointer position is "+m.x+" x "+m.y);
      //throw new Error("Function not implemented.");
  }

  // up
  function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLCanvasElement; }) {
      m.x = event.clientX;
      m.y = event.clientY;
      console.log("The click position is "+m.x+" x "+m.y);
      //throw new Error("Function not implemented.");
  }
</script>

  <svelte:document on:keydown|preventDefault|stopImmediatePropagation|stopPropagation={onKeyDown} />
  <!-- svelte:window on:keydown={onKeyDown} / -->
  <div class="zone">
    <button on:click={clear}>Clear</button>
    <button on:click={pause}>Pause</button>   
    <button on:click={start}>Start</button>
    <span class="zone">{key} s={started} e={ended} {posX},{posY} {STEP} {TIMER} {width} {height}</span>
  </div>
  <canvas bind:this={canvas}  
    class="container"
    on:pointerdown={handlePointer} 
    on:click={handleClick} 
    bind:clientWidth={width}
    bind:clientHeight={height}
    width={width * pixelRatio}
    height={height * pixelRatio}>
      Canvas Not Supported: update your browser
  </canvas>
  <div>{snake}</div>

<style>
  .zone {
    height: 1.2rem;
    margin-bottom: 5px;;
  }
  .container {
    width: 100%;
    height: 100%;
    padding-top: 0;
    border: 1px solid grey;
    /* margin-top: 5%; */
    /* background-color: grey; */
    background-color: #f1b06c;
    overflow: hidden;
  }
</style>
