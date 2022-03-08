/* eslint-disable */
<template>
    <div class='header-wrapper'>
        <h1 class='title'>Kosmiczny spacer</h1>
        <p class='subtitle'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
        <p class='subtitle'>
            Lorem Ipsum is simply dummy text.
        </p>
    </div>
</template>
<script>
export default {
  name: 'HeaderComponent',
};
</script>
<style lang='scss' scoped>
.header-wrapper {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    padding-top: 180px;

}
.title {
    font-size: 4rem;
    text-transform: uppercase;
    font-weight: bold;
}
.subtitle:last-child {
    font-weight: bold;
}
</style>
