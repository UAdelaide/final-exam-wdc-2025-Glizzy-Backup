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
            .buttonStyle.top = Math.random()*100+"%";
            this.buttonStyle.left = Math.random()*100+"%";

            if(counter>3){
                this.visible = true;
                this.GetDog();
            }else{
                counter++;
            }
        },
        async GetDog() {
            const res = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await res.json();
            this.imageUrl = data.message;
        }
    }
}).mount('#app');