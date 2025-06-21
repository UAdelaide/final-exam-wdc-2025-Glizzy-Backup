const { createApp } = Vue;

createApp({
    data() {
        return {
            imageUrl: ''
        };
    },
    methods: {
        async getDog() {
            const res = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await res.json();
            this.imageUrl = data.message;
        }
    },
    mounted() {
        this.getDog();
    }
}).mount('#app');