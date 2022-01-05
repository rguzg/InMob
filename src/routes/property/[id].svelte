<script lang="ts">
    import { Container, Col, Button } from "sveltestrap";
    import { get as getPropertyByID } from "../properties/getPropertyByID"
    import { Chasing } from 'svelte-loading-spinners'
    import Carousel from "../../components/Carousel.svelte";
    import ContactForm from "../../components/ContactForm.svelte";
    import { page } from "$app/stores";

    let propertyID = $page.params.id;
    let isModalOpen = false;
    $: propertyPromise = getPropertyByID(propertyID);
</script>

<Container fluid class="propertyContent__propertyContainer">
    {#await propertyPromise}
        <Chasing size="60" color="#000000" unit="px" duration="1s"></Chasing>
        <h3>Loading a cool property!</h3>
    {:then value}
        <Col md={12} class="mb-4">
            <h3>{value.body.public_id} - {value.body.title}</h3>
        </Col>
        <Col md={12} class="h-flex">
            <Col md="auto" class="propertyContent__propertyCarousel">
                <Carousel items={value.body['property_images']}></Carousel>
            </Col>
            <Col md={5} class="propertyContent__propertyData">
                <div>
                    <h4>Description</h4>
                    <p>{value.body['description']}</p>
                    <h4>Property Type</h4>
                    <p>{value.body.property_type}</p>
                    <h4>Location</h4>
                    <p>{value.body.location['name']}</p>
                </div>
                <Button on:click={() => {isModalOpen = !isModalOpen}}>Contact</Button>
            </Col>
        </Col>
        <ContactForm isOpen={isModalOpen} property_id={value.body.public_id}></ContactForm>
    {:catch _}
        <h3>We couldn't find that cool property...</h3>
    {/await}
</Container>


<style>
    :global(.propertyContent__propertyContainer){
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 500px;
    }

    :global(.propertyContent__propertyCarousel){
        display: flex;
        align-self: flex-start;
        margin-right: 20px;
    }

    :global(.h-flex){
        display: flex;
    }
</style>
