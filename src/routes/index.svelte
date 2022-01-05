<script lang="ts">
    import { Container, Col, Pagination, PaginationItem, PaginationLink } from "sveltestrap";
    import { get as getPropertyList, GetPropertyListResponse } from "./properties/getPropertyList"
    import { Chasing } from 'svelte-loading-spinners'
    import PropertyCard from "../components/PropertyCard.svelte";
 
    async function getTotalPages(propertiesPromise: Promise<GetPropertyListResponse>){
        let totalItems = (await propertiesPromise).body.pagination.total;

        totalPages = Math.ceil(totalItems / propertiesToShow)
    }

    const propertiesToShow = 15;

    let totalPages: number;
    let currentPage = 1;
    
    // We need to keep the promise in a separate value so that we can use the await block below
    $: propertiesPromise = getPropertyList(currentPage, propertiesToShow, ["published"]);
    $: getTotalPages(propertiesPromise);

</script>

<Container fluid>
    <Col md={12} class="indexContent_titles">
        <h1>Welcome to InMob!</h1>
        <h5>Select a property to see its details</h5>
    </Col>

    <Col md={12} class="indexContent_propertyListContainer">
        {#await propertiesPromise}
            <Chasing size="60" color="#000000" unit="px" duration="1s"></Chasing>
            <h3>We've got some cool properties. Just wait while they load!</h3>
        {:then value}
        <Pagination>
            <PaginationItem disabled={currentPage == 1}>
                <PaginationLink first on:click={() => currentPage = 1} />
            </PaginationItem>
            <PaginationItem disabled={currentPage == 1}>
                <PaginationLink previous on:click={() => currentPage--} />
            </PaginationItem>
            {#each Array(totalPages) as _, pageNumber}
                <PaginationItem active={currentPage == (pageNumber + 1)}>
                    <PaginationLink on:click={() => currentPage = (pageNumber + 1)}>{pageNumber + 1}</PaginationLink>
                </PaginationItem>
            {/each}
            <PaginationItem disabled={currentPage == totalPages}>
                <PaginationLink next on:click={() => currentPage++} />
            </PaginationItem>
            <PaginationItem disabled={currentPage == totalPages}>
                <PaginationLink last on:click={() => currentPage = totalPages}/>
            </PaginationItem>
        </Pagination>
        <div class="indexContent__propertyList">
            {#each value.body.content as property}
            <Col md={3} class="m-2">
                <PropertyCard {property}></PropertyCard>
            </Col>
            {/each}
        </div>
        {:catch _}
            <h3>We couldn't load our cool properties... Try reloading the page.</h3>
        {/await}
    </Col>
</Container>

<style>
    :global(.indexContent_titles) {
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    :global(.indexContent_propertyListContainer){
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 500px;
    }
    .indexContent__propertyList {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
    h3{
        padding: 10px 0;
    }
</style>
