<script lang="ts">
    import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from "sveltestrap";
    import { post as postContactForm } from "../routes/properties/postContactForm";

    export let isOpen = false;
    export let property_id;
    function toggle() {
        isOpen = !isOpen;
    }

    async function submit(){
        try {
            await postContactForm({
                property_id,
                name,
                email,
                phone,
                message,
                source: "InMob",
            });
            toggle();
        } catch (error) {
            errorMessage = error.message;
        }
    }

    let name = "";
    let email = "";
    let phone = "";
    let message = "";

    let errorMessage = "";
</script>

<Modal {isOpen} {toggle}>
    <ModalHeader {toggle}>Contact Property</ModalHeader>
    <ModalBody>
        {#if errorMessage}
            <Alert dismissible color="danger" toggle={() => errorMessage = ""}>{errorMessage}</Alert>
        {/if}

        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" required class="form-control" id="name" placeholder="Enter name" bind:value={name}/>
        </div>
        <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" required class="form-control" id="email" placeholder="Enter email" bind:value={email}/>
        </div>
        <div class="form-group">
            <label for="phone">Phone</label>
            <input type="text" required class="form-control" id="phone" placeholder="Enter phone" bind:value={phone}/>
        </div>
        <div class="form-group">
            <label for="message">Message</label>
            <textarea class="form-control" required id="message" rows="3" bind:value={message}></textarea>
        </div>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={submit}>Send</Button>
      <Button color="secondary" on:click={toggle}>Cancel</Button>
    </ModalFooter>
</Modal>