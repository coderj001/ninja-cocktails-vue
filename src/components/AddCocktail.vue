<template>
    <div class="add-cocktail-recipe container">
        <h2 class="center-algin indigo-text">Add New Cocktail Recipe</h2>
        <form @submit.prevent="AddCocktail">
            <div class="field title">
                <label for="title">Cocktail Title: </label>
                <input type="text" name="title" v-model="title" />
            </div>
            <!-- imp consept -->
            <div v-for="(ing, index) in ingredients" v-bind:key="index" class="field">
                <label for="ingredient">Ingredient{{ index + 1 }}: </label>
                <input type="text" name="ingredient" v-model="ingredients[index]" />
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add Ingredients: </label>
                <input type="text" name="add-ingredient" @keydown.tab="addIng" v-model="another" />
            </div>
            <div class="field center-align">
                <p v-show="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Add Cocktail</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
    name: "AddCocktail",
    components: {},
    data() {
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null,
        };
    },
    methods: {
        AddCocktail() {
            if (this.title) {
                this.feedback = null;
                // slug
                this.slug = slugify(this.title, {
                    replacement: "-",
                    remove: /[$*_+~'"!\-:@]/g,
                    lower: true,
                });
                db.collection("cocktails")
                    .add({
                        title: this.title,
                        ingredients: this.ingredients,
                        slug: this.slug,
                    })
                    .then(() => {
                        this.$router.push({ name: "Index" });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                this.feedback = "You must enter title.";
            }
        },
        addIng() {
            if (this.another) {
                this.ingredients.push(this.another);
                this.another = null;
                this.feedback = null;
            } else {
                this.feedback = "You must enter a value to add an ingredient.";
            }
        },
        deleteIng(ing) {
            this.ingredients = this.ingredients.filter((ingredient) => {
                return ingredient != ing;
            });
        },
    },
};
</script>

<style>
.add-cocktail-recipe {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.add-cocktail-recipe h2 {
    font-size: 2em;
    margin: 20px auto;
}
.add-cocktail-recipe .field {
    margin: 20px auto;
    position: relative;
}
.add-cocktail-recipe .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>
