<script lang="ts">
    import { Carousel, CarouselControl, CarouselItem, CarouselCaption } from 'sveltestrap';
    import type { Image } from 'easybrokerapi'

    export let items: Image[];

    if(items.length == 0){
        items = [{"title": "", "url": "/gray.jpg"}]
    }

    let activeIndex = 0;
</script>
  
<Carousel {items} bind:activeIndex>
<CarouselControl direction="prev" bind:activeIndex {items} />
<div class="carousel-inner">
    {#each items as item, index}
    <CarouselItem bind:activeIndex itemIndex={index}>
        <div class="propertyImage" style="--image: url({item.url})"></div>
        <CarouselCaption
        captionText={item.title}/>
    </CarouselItem>
    {/each}
</div>

<CarouselControl direction="next" bind:activeIndex {items} />
</Carousel>

<style>
.propertyImage{
    background-image: var(--image);
    background-size: cover;
    height: 400px;
    width: 400px;
}
</style>