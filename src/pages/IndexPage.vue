<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">

     <div class="col">
      <q-input
      bottom-slots
      v-model="newQweetContent"
      label="What's happening?"
      counter
      maxlength="280"
      autogrow
      class="new-qweet"
      >
        <template v-slot:before>
          <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar5.jpg">
          </q-avatar>
        </template>
      </q-input>
     </div>

     <div class="col col-shrink">
      <q-btn
      @click="addNewQweet"
          unelevated
          rounded
          color="primary"
          label="Qweet"
          no-caps
          :disable="!newQweetContent"
          class="q-mb-lg"
          />

     </div>
    </div>
    <q-separator class="divider" size="10px" color="grey-2" />

    <q-list separator>
      <!-- <transition-group
      appear
      enter-active-class="animated fadeIn slow"
      leave-active-class="animated fadeOut slow"
      > -->
      <q-item
      v-for="qweet in qweets" :key="qweet.id"
      class="q-py-md">
        <q-item-section avatar top>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar5.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            <strong>Austin Muvavi</strong>
            <span class="text-grey-7">
              @amuvavi <br class="lt-md">&bull;  {{relativeDate(qweet.date ) }}
            </span>
          </q-item-label>
          <q-item-label class="qweet-content text-body1">
           {{ qweet.content }}
          </q-item-label>
          <div class="qweet-icons row justify-between q-mt-sm">
            <q-btn
            flat
            round
            color="grey"
            size="sm"
            icon="far fa-comment" />
            <q-btn
            flat
            round
            color="grey"
            size="sm"
            icon="fas fa-retweet" />
            <q-btn
            @click="toggleLiked(qweet)"
            flat
            round
            :color="qweet.liked ? 'pink':'grey'"
            size="sm"
            :icon="qweet.liked? 'fas fa-heart' : 'far fa-heart'"
            />
            <q-btn
            @click="deleteQweet(qweet)"
            flat
            round
            color="grey"
            size="sm"
            icon="fas fa-trash" />
          </div>
        </q-item-section>
      </q-item>
    <!-- </transition-group> -->
    </q-list>
    </q-scroll-area>
  </q-page>

</template>

<script setup lang="ts">
import db from 'src/boot/firebase'
import { addDoc, collection, query, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';

import { onMounted, ref } from 'vue'
import { formatDistance } from 'date-fns'

const qweets = ref([
 // {
//   id: 1,
//   content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elis. Sed est vero minus natus deserunt error consectetur cum recusandae perspiciatis doloribus, velit blanditiis ad. Iste aliquid saepe dolor nemo! Dolores, vero! ',
//   date: 1672496713467,
//   liked: false
// },
// {
//   id: 2,
//   content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elis. Sed est vero minus natus deserunt error consectetur cum recusandae perspiciatis doloribus, velit blanditiis ad. Iste aliquid saepe dolor nemo! Dolores, vo! ',
//   date: 1672496794061,
//   liked: true
// }
])

onMounted(() => {

const q = query(collection(db, 'qweet'))
 onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    let qweetChange = change.doc.data()
    qweetChange.id = change.doc.id
    if (change.type === 'added') {
        console.log('New qweet: ', qweetChange);
        qweets.value.unshift(qweetChange)
    }
    if (change.type === 'modified') {
        console.log('Modified qweet: ', qweetChange);
        let index = qweets.value.findIndex(qweet => qweet.id === qweetChange.id)
        Object.assign(qweets.value[index], qweetChange)

    }
    if (change.type === 'removed') {
        console.log('Removed qweet: ', qweetChange);
        let index = qweets.value.findIndex(qweet => qweet.id === qweetChange.id)
        qweets.value.splice(index, 1)
    }
  });
});
})

const newQweetContent = ref('')
const relativeDate = (value: number | Date) => formatDistance(value, new Date)

const addNewQweet = async () => {

// Add a new document in collection "cities"
await addDoc(collection(db, 'qweet'), {
   content: newQweetContent.value,
    date: Date.now(),
    liked: false
});

  newQweetContent.value = ''
}

const deleteQweet = async (qweet: number | Date ) => {
  await deleteDoc(doc(db, 'qweet', qweet.id));
}

const toggleLiked = async (qweet: number | Date) => {
  const washingtonRef = doc(db, 'qweet',qweet.id);

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  liked: !qweet.liked
});
}

</script>

<style lang="sass">
.new-qweet
  textarea
    font-size: 19px
    line-height: 1.4 !important
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.qweet-content
  white-space: pre-line
.qweet-icons
  margin-left: -5px

</style>
