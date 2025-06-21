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
            const top = Math.floor(Math.random() * 90);
            const left = Math.floor(Math.random() * 90);
            this.buttonStyle.top = `${top}%`;
            this.buttonStyle.left = `${left}%`;

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