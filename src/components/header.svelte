<script lang="ts">
    import { Col } from 'sveltestrap';
</script>

<div class="header">
    <Col md={2} class="header__logo">
        <img class="logo" src="/house.svg" alt="House with Laptop"/>
        <h3>InMob</h3>
    </Col>
    <Col md={2} class="header__links">
        <a href="/">Home</a>
        <a href="/about">About</a>
    </Col>
</div>

<style>
    a{
        color: #000;
        text-decoration: none;
        font-weight: 600;
    }

    .logo{
        padding: 5px;
        height: 50px;
        width: 50px;
    }

    .header{
        justify-content: space-between;
        display: flex;
        height: 50px;
        padding: 5px;
        width: 100%;
    }

    /*Due to a limitation with Svelte, component class must be global*/
    :global(.header__logo){
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :global(.header__links){
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
</style>