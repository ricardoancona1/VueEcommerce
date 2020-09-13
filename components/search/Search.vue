<template>
	<p class="control has-icons-left">
		<input
			class="input is-rounded"
			type="text"
			v-model="value"
			:placeholder="placeholder"
			v-on:keyup.delete="reestablecerProductos"
			@keyup="search(value)"
		>
		<span class="icon is-small is-left">
			<i class="fa fa-search"></i>
		</span>
	</p>
</template>

<script>
export default {
  name: 'search',
	data () {
		return {
			value: '',
			hasSearched:false
		} 
	},

	computed: {
		placeholder () {

		}
	},

	methods: {
		search (value) {
			console.log("route params",this.$route)
			if(this.$route.params.id||this.$route.path=="/TuPerfil"){
				
			this.$router.push({ name: 'index' });
		}
			
			if (value.length > 0) {
				this.$store.commit('setHasUserSearched', true);
				this.$store.commit('setProductTitleSearched', value);
				this,this.hasSearched=true
			} else {
				this.$store.commit('setHasUserSearched', true);
				this.$store.commit('setProductTitleSearched', '');
				this,this.hasSearched=false
			}
		},
		reestablecerProductos(){
			this.$store.commit("setHasUserErased", true);

		}
	}
}
</script>

