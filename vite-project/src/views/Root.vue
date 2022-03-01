<script setup>
import { ref, computed, unref, watch } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()

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

// '#upload-form'    'http://localhost:5000/uploadAnglais'
async function tryUpload(selector, path){
  let formElement = document.querySelector(selector)
  let data = new FormData(formElement)
  const response = await fetch( path , {
    method: 'POST',
    headers: {
      'email':email.value
    },
    body: data
  } )
  let text=await response.text()
  return {mystatus: response.status, text: text}
}

async function move() {
  if (isDisabled.value){
    window.alert('Please write your email adress so that we can send you the pdf document.')
    return
  }

  let mystatus, text;
  ({mystatus, text} = await tryUpload('#upload-form', 'https://yshegsjk.xyz/uploadAnglais'))
  if (mystatus != 200){
    window.alert(`${text}`) // Error ${mystatus}:
    return
  }

  ({mystatus, text} = await tryUpload('#upload-form2', 'https://yshegsjk.xyz/uploadJaponais'))
  if (mystatus != 200){
    window.alert(`${text}`) // Error ${mystatus}: 
    return
  }

  router.push({ 
    name:'Suite',
    params: {
      email: unref(email),
      language: unref(language),
    }
  })
}

function youtube_parser(url){
	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
	var match = url.match(regExp);
	return (match&&match[7].length==11)? match[7] : false;
}


</script>


<template>

  <div class="liste">
		<img src="../assets/languages2.jpeg" alt="" width="120" height="120">
		<h1 class="text-3xl mb-3 mt-2">
			NaturaLingua
		</h1>
		<div>
			Using our website, you can download movies subtitles as bilingual pdf documents, to learn new languages easily. Our documents use the latin alphabet to make reading new languages easy and natural.<br>Please pick the language you are studying below, and upload the two subtitle files you want to convert to a bilingual pdf document. We support the following formats of subtitle files : .srt, .vtt, .xml, and .ass. Subtitles can be found on <a href="https://www.opensubtitles.org/">opensubtitles.org</a> or on netflix using the technique described <a href="https://github.com/isaacbernat/netflix-to-srt">here</a>. The price of a bilingual pdf document is 5 euro.
		</div> 
		
		<div>
			Language: 
			<select v-model="language" class="m-2 rounded border-1 border-black">
				<option v-for="bidule in languages" :id="bidule">{{bidule}}</option>
			</select>
		</div>

		<div>
			Email :
			<input autocomplete="email" type="text" class="m-2 rounded border-1 border-black m-2" v-model="email" placeholder="type your email here"/>
		</div>

    <form id='upload-form'>
      <label for="files">Subtitle file of language you know : </label>
      <input
        id='file-field'
        name='files'
        type='file'
      >
    </form>

    <form id='upload-form2'>
      <label for="files">Subtitle file of language you learn : </label>
      <input
        id='file-field2'
        name='files'
        type='file'
        >
    </form>

    <button :class="buttonClass" @click="move"> 
      Go to purchase summary
    </button>
    <br><br><br>
    <p>Other websites by NaturaLingua:
      <ul>
        <li>
          <a href="https://naturalingua.netlify.app">https://naturalingua.netlify.app</a>
        </li>
        <li>
          <a href="https://getyoutubesubtitles.netlify.app">https://getyoutubesubtitles.netlify.app</a>
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

a {
  color: blue;
  text-decoration: underline blue;
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
