<template>
    <div class="index container">
        <div class="card" v-for="cocktail in cocktails" :key="cocktail.id">
            <div class="card-content">
                <i class="material-icons delete" @click="deleteCocktail(cocktail.id)">delete</i>
                <h2 class="indigo-text">{{ cocktail.title }}</h2>
                <ul class="ingredients ">
                    <li v-for="(ing, indx) in cocktail.ingredients" :key="indx">
                        <span class="chip">{{ ing }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
// import database from firebase
import db from "@/firebase/init";
export default {
    name: "Index",
    props: {},
    data() {
        return {
            cocktails: [],
        };
    },
    methods: {
        deleteCocktail(id) {
            this.cocktails = this.cocktails.filter((cocktail) => {
                return cocktail.id != id;
            });
        },
    },
    created() {
        db.collection("cocktails")
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    let cocktail = doc.data();
                    cocktail.id = doc.id;
                    this.cocktails.push(cocktail);
                });
            });
    },
};
</script>

<style scoped>
.index {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 60px;
}
.index h2 {
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
}
.index .ingredients {
    margin: 30px auto;
}
.index .ingredients li {
    display: inline;
}
.index .delete {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4rem;
}
</style>
