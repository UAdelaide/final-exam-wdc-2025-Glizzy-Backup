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
            document.getElementById("reveal").style.top = Math.random()*100+"%";
            document.getElementById("reveal").style.left = Math.random()*100+"%";

            if(counter>3){
                this.visible = true;
                this.GetDog();
            }else{
                counter++;
                document.getElementById("reveal").value = 
            }
        },
        async GetDog() {
            const res = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await res.json();
            this.imageUrl = data.message;
        }
    }
}).mount('#app');