<script lang="ts">
    import Snake from '$lib/Snake.svelte'
    let snake: Snake;
</script>

<main>
    <h1>Snake</h1>
    <Snake bind:this={snake} die_on_edge={false}/>
    <button on:click={()=>snake.start()}>Start</button>
    <button on:click={()=>snake.pause()}>Pause</button>   
    <button on:click={()=>snake.clear()}>Clear</button>
</main>
