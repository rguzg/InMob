<script lang="ts">
    import type { Property } from "easybrokerapi"
    import { Col, Card, CardHeader, CardTitle, CardBody, Button } from "sveltestrap";


    export let property: Property;
</script>

<Card class="mb-3 propertyCard">
    <CardHeader>
      <CardTitle>{property.title}</CardTitle>
    </CardHeader>
    <CardBody class="propertyBody">
        <Col md={4} class="m-3">
            <div class="propertyImage" style="--image: url({property.title_image_full})"></div>
        </Col>
        <Col md={7} class="propertyDetails">
            <b>Type: </b> <p>{property.property_type}</p>
            <br>
            <b>Location: </b> <p>{property.location}</p>
        </Col>
      <Col class="m-3" md={12}>
        <a href="/properties/{property.public_id}"><Button>View Details</Button></a>
      </Col>
    </CardBody>
</Card>

<style>
    :global(.propertyBody){
        display: flex;
        flex-wrap: wrap;
    }

    :global(.propertyDetails){
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    :global(.propertyCard){
        min-height: 400px;
    }

    .propertyImage{
        background-image: var(--image);
        background-size: cover;
        height: 150px;
        width: 150px;
    }

</style>