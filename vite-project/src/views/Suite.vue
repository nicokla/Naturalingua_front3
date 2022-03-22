<template>
  <div class="liste">
		<h1 class="text-3xl mb-2">
			Purchase summary
		</h1>
		<div class="m-3">
			After payment, we will send your document to study <b>{{language}}</b> to the email address <b>{{email}}</b> for 3.20 €. If the language or the email address is incorrect, please come back to the previous page and choose the correct document and email address.
		</div>
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :lineItems="lineItems"
			:successUrl="successURL"
      :cancelUrl="cancelURL"
			:sessionId="sessionId"
      @loading="v => loading = v"
    />

    <button class="my-button" @click="submit">Checkout</button>
  </div>
</template>


<script>
// https://dashboard.stripe.com/settings/account?support_details=true
// https://vitejs.dev/guide/env-and-mode.html
// https://dashboard.stripe.com/test/dashboard
// https://vuestripe.com/stripe-checkout/one-time-payment

import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {
  components: {
    StripeCheckout,
  },
  data () {
    return {
			backend:'https://yshegsjk.xyz', //'http://127.0.0.1:5000', // 'https://naturalingua.herokuapp.com'
			//https://yshegsjk.xyz/
			// publishableKey: 'pk_live_51KCkGtL309RW9KQT3X8xJbr279hnoVOInlYz1kNWOIzGM5DcBtH78r8BIPXQPKvMxEaerNCugl7pl3XvN79wK6vc00q4OIC5Cl', // import.meta.env.VITE_PUBLISHABLE_KEY_TEST,
			publishableKey:'pk_live_51KCkGtL309RW9KQT3X8xJbr279hnoVOInlYz1kNWOIzGM5DcBtH78r8BIPXQPKvMxEaerNCugl7pl3XvN79wK6vc00q4OIC5Cl',
      loading: false,
      lineItems: [
        {
          price: 'price_1KYmYpL309RW9KQT577ea5ow', // 'price_1KVHfCL309RW9KQT03B5fosI',
          quantity: 1,
        },
      ],
			email:this.$route.params.email,
			alphabetId:this.$route.params.alphabetId,
			language:this.$route.params.language,
			sessionId:''
    };
  },
  methods: {
    async submit () {
			if(this.sessionId == ''){
				window.alert('There was a problem, please try again in a few seconds.')
			}
			else{
				window.alert('After clicking ok, you will be redirected to checkout within a few seconds.')
				this.$refs.checkoutRef.redirectToCheckout();
			}
    },
  },
	computed:{
		successURL(){return `https://getmoviessubtitles.netlify.app/success/${this.email}`},
		cancelURL(){return `https://getmoviessubtitles.netlify.app/cancel`},
		stripeUrl(){
			// localhost:5000/stripe_pay/french/nicolas.klarsfeld@gmail.com?id=E3Blxs0Wfco&id=StXPXDij6rw
			return `${this.backend}/stripe_pay2/${this.language}/${this.alphabetId}/${this.email}`
		}
	},
	async mounted() {
		let truc= await fetch(this.stripeUrl)
		let trucjson= await truc.json()
		this.sessionId = trucjson.checkout_session_id
	}
};

</script>




<style scoped>
.liste{
	padding: 0.8em;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	align-content: space-between;
}
.my-button{
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3
}
</style>
