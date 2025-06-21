const { createApp } = Vue;

let counter = 0;

createApp({
    data() {
        return {
            imageUrl: '',
            visible: false
        };
    },
    methods: {
        Reveal(){
            
        }
        async GetDog() {
            const res = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await res.json();
            this.imageUrl = data.message;
        }
    }
}).mount('#app');