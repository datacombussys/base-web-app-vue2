<template>
	<v-container>
		<div class="spinner">
			<div class="spinner-sector spinner-sector-red"></div>
			<div class="spinner-sector spinner-sector-blue"></div>
			<div class="spinner-sector spinner-sector-green"></div>
		</div>
	</v-container>
</template>

<script>
  export default {
    name: 'Spinner',
  }
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';

.spinner {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
		width: 50px;
    height: 50px;
}

.spinner-sector {
    border-radius: 50%;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 5px solid transparent;
    mix-blend-mode: multiply;
}

.spinner-sector-blue {
    animation: rotate 1.5s ease-out infinite;
    border-top: 5px solid $primary-light;
}

.spinner-sector-red {
    animation: rotate 2.0s ease-in infinite;
    border-top: 5px solid $accent-light;
}

.spinner-sector-green {
    animation: rotate 1.0s ease-in-out infinite;
    border-top: 5px solid $secondary-light;
}

@keyframes rotate {
    from { transform: rotate(0); }
    to { transform: rotate(360deg); }
}

@keyframes loading-opacity {
    0%, 100% {
        opacity: 1;
    }
    25%, 75% {
        opacity: .5;
    }
    50% {
        opacity: .1;
    }
}

</style>
