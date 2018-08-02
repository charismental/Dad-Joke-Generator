new Vue({
    el: "#app",
    data: {
      newJoke: "",
      buttons: 0,
      jokes: [],
      newColor: "",
      randomNumber: null,
      displayedColor: "",
      displayedFont: "",
      fonts: {
        fFamily: [
          "'Rakkas', cursive",
          "'Concert One', cursive",
          "'Yatra One', cursive",
          "'Abril Fatface', cursive",
          "'Ubuntu Mono', monospace",
          "'Old Standard TT', serif",
          "'Oswald', sans-serif",
          "'Poppins', sans-serif",
          "'Karla', sans-serif"
        ],
        fStyle: [],
        fWeight: [],
        fVariant: [],
        fSize: []
      },
      currentIndex: 0
    },
    methods: {
      randomizer: function(arr) {
        this.randomNumber =  Math.floor(Math.random() * arr.length);
      },
      randomColor: function() {
        this.newColor = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
      },
      lastJoke: function() {
        //refactor with nextJoke??
        this.currentIndex--;
        this.newJoke = this.jokes[this.currentIndex].joke;
        this.displayedColor = this.jokes[this.currentIndex].fColor;
      },
      nextJoke: function() {
        this.currentIndex++;
        this.newJoke = this.jokes[this.currentIndex].joke;
        this.displayedColor = this.jokes[this.currentIndex].fColor;
      },
      getJoke: function() {
        this.randomColor();
        axios
          .get("https://icanhazdadjoke.com/", {
            headers: {
              Accept: "application/json"
            }
          })
          .then(response => {
            this.newJoke = response.data.joke;
            this.jokes.push({
              id: this.jokes.length,
              joke: this.newJoke,
              fColor: this.newColor
            });
          })
          .catch(error => {
            console.log(error);
          });
        this.displayedColor = this.newColor;
        this.randomizer(this.fonts.fFamily);
        this.displayedFont = this.fonts.fFamily[this.randomNumber];
        this.updateIndex();
      },
      updateIndex: function (){
        this.currentIndex = this.jokes.length - 1;
      }
    },
    watch: {
      jokes: {
        handler: function (val, oldVal) {
          this.updateIndex();
        },
        deep: true
      }
    },
   
    computed: {
      buttonsDisplayed: function() {
        if (this.jokes.length == 0) {
         return 0
        }else if (this.jokes.length == 1) {
         return 1
        }else if (this.jokes.length >= 2 && this.currentIndex != 0 && this.currentIndex == this.jokes.length - 1) {
         return 2 //"2 buttons, last/new"
        }else if (this.jokes.length >= 2 && this.currentIndex == 0) {
         return 3 //"2 buttons, next/new"
        }else {
         return 4 //"3 buttons"
        }
      }
    }
  });
  