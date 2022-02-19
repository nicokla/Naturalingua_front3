<script setup>
import { ref, computed, unref, watch } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()
import listOfFiles from '../listOfFiles.json'

let languages = ['Arabic', 'Chinese', 'French','Greek','Hebrew','Hindi','Italian','Japanese','Korean','Persian','Portuguese','Russian','Spanish','Thai','Turkish','Vietnamese']
let language=ref(languages[0])

let email=ref('')

let url=ref('')

let isDisabled=computed(()=>
	!(email.value!='')
)

let buttonClass=computed(()=>{
	if(!isDisabled.value)
		return 'my-button'
	else
		return 'my-button-disabled'
})


const move = () => {
  if (!isDisabled.value)
    router.push({ 
			name:'Suite',
      params: {
				email: unref(email),
				language: unref(language),
      }
    })
	else{
		window.alert('Please write your email adress so that we can send you the document, and add at least one youtube video.')
	}
}

function youtube_parser(url){
	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
	var match = url.match(regExp);
	return (match&&match[7].length==11)? match[7] : false;
}

async function handleFileUpload( e ){
  let formData = new FormData();
  formData.append( 'method', 'POST' );
  formData.append( 'file', e.target.files[0] );

  await fetch( 'http://localhost:5000/upload', {
    method: 'POST',
    headers: {
      // 'Authorization': 'Bearer '+this.token,
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    },
    body: formData
  } )
}


</script>


<template>

  <div class="liste">
		<img src="../assets/languages2.jpeg" alt="" width="120" height="120">
		<h1 class="text-3xl mb-3 mt-2">
			NaturaLingua
		</h1>
		<div class="text-base">
			Using our website, you can download movies subtitles as pdf documents, to learn new languages easily.<br>Please pick the language you are studying, and upload the two subtitle files in either of the following formats: .srt, .vtt, .xml, .ass. Subtitles can be found on <a href="opensubtitles.org">opensubtitles.org</a> or on netflix using the technique described <a href="https://github.com/isaacbernat/netflix-to-srt">here</a>. The price of a pdf document is 5 euro.
		</div> 
		
		<div>
			language: 
			<select v-model="language" class="m-2 rounded border-1 border-black">
				<option v-for="bidule in languages" :id="bidule">{{bidule}}</option>
			</select>
		</div>

    <form>
      <input type="file" @change="handleFileUpload( $event )"/>
    </form>
    <!-- <form action="" method=post enctype=multipart/form-data> -->
    <!-- <div>
      <label>Select file to upload</label>
      <input type="file">
    </div>
    <button type="submit">Convert</button> -->

		<div>
			email :
			<input autocomplete="email" type="text" class="m-2 rounded border-1 border-black m-2" v-model="email" placeholder="type your email here"/>
		</div>

    <button :class="buttonClass" @click="move"> 
      Go to purchase summary
    </button>
    <br><br><br>
    <p>Other websites by NaturaLingua:
      <ul>
        <li>
          <a href="https://naturalingua.netlify.app">https://naturalingua.netlify.app</a>
        </li>
      </ul>
    </p>
		<br><br><br>
		<a href="https://www.flaticon.com/free-icons/languages" title="languages icons">Languages icons created by Freepik - Flaticon</a>
  </div>

</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
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
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4
}
.my-button-disabled{
	/* pointer-events:none; */
	cursor : default !important;
  @apply bg-gray-500 text-white font-bold py-2 px-4 rounded mt-4
}



</style>
