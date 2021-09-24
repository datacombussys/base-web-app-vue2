<template>
	<v-container>
		<v-sheet width="200" height="200" light class="flex justify-center align-center">
			<div class="spinner">
				<div class="spinner-text">Loading</div>
				<div class="spinner-sector spinner-sector-red"></div>
				<div class="spinner-sector spinner-sector-blue"></div>
				<div class="spinner-sector spinner-sector-green"></div>
			</div>
		</v-sheet>
	</v-container>
</template>

<script>
  export default {
    name: 'Loader',
  }
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';

.spinner {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
		width: 150px;
		
    height: 150px;
}

.spinner-sector {
    border-radius: 50%;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 10px solid transparent;
    mix-blend-mode: normal;
}

.spinner-text {
    animation: loading-opacity 3s ease-in-out infinite;
    font-size: 1em;
}

.spinner-sector-blue {
    animation: rotate 2s ease-out infinite;
    border-top: 10px solid $primary-dark;
}

.spinner-sector-red {
    animation: rotate 2.5s ease-in infinite;
    border-top: 10px solid $accent-dark;
}

.spinner-sector-green {
    animation: rotate 1.5s ease-in-out infinite;
    border-top: 10px solid $secondary-dark;
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
