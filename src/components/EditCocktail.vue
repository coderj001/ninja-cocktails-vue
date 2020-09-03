<template>
    <div class="edit-cocktail-recipe container" v-if="cocktail">
        <h2>Edit: {{ cocktail.title }}</h2>
        <form @submit.prevent="EditCocktail">
            <div class="field title">
                <label for="title">Cocktail Title: </label>
                <input type="text" name="title" v-model="cocktail.title" />
            </div>
            <!-- imp consept -->
            <div v-for="(ing, index) in cocktail.ingredients" v-bind:key="index" class="field">
                <label for="ingredient">Ingredient{{ index + 1 }}: </label>
                <input type="text" name="ingredient" v-model="cocktail.ingredients[index]" />
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add Ingredients: </label>
                <input type="text" name="add-ingredient" @keydown.tab="addIng" v-model="another" />
            </div>
            <div class="field center-align">
                <p v-show="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Update Cocktail</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
    name: "EditCocktail",
    components: {},
    data() {
        return {
            cocktail: null,
            another: null,
            feedback: null,
        };
    },
    created() {
        let ref = db.collection("cocktails").where("slug", "==", this.$route.params.cocktail_slug);
        ref.get().then((snapshot) => {
            snapshot.forEach((doc) => {
                this.cocktail = doc.data();
                this.cocktail.id = doc.id;
            });
        });
    },
    methods: {
        EditCocktail() {
            if (this.cocktail.title) {
                this.feedback = null;
                // slug
                this.cocktail.slug = slugify(this.cocktail.title, {
                    replacement: "-",
                    remove: /[$*_+~'"!\-:@]/g,
                    lower: true,
                });
                db.collection("cocktails")
                    .doc(this.cocktail.id)
                    .update({
                        title: this.cocktail.title,
                        ingredients: this.cocktail.ingredients,
                        slug: this.cocktail.slug,
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
                this.cocktail.ingredients.push(this.another);
                this.another = null;
                this.feedback = null;
            } else {
                this.feedback = "You must enter a value to add an ingredient.";
            }
        },
        deleteIng(ing) {
            this.cocktail.ingredients = this.cocktail.ingredients.filter((ingredient) => {
                return ingredient != ing;
            });
        },
    },
};
</script>

<style>
.edit-cocktail-recipe {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.edit-cocktail-recipe h2 {
    font-size: 2em;
    margin: 20px auto;
}
.edit-cocktail-recipe .field {
    margin: 20px auto;
    position: relative;
}
.edit-cocktail-recipe .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>
