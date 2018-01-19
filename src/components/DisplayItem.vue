<template>
    <div>
        <h1>List of Cities</h1>

        <div class="row">
          <div class="col-md-10">Add a city of your favorite and add note(Ex:Travelled these days with this temp.!!!).</div>
          <div class="col-md-2">
            <router-link :to="{ name: 'CreateItem' }" class="btn btn-primary">Add City</router-link>
          </div>
        </div><br />

        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Note</td>
                <td>Actions</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="item in items">
                    <td>{{ item._id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td><router-link :to="{name: 'EditItem', params: { id: item._id }}" class="btn btn-primary">Edit</router-link></td>
                    <td><router-link :to="{name: 'Weather', params: { id: item._id }}" class="btn btn-info">Weather</router-link></td>
                    <td><button class="btn btn-danger" v-on:click="deleteItem(item._id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default {
        data(){
            return{
                items: []
            }
        },

        created: function()
        {
            this.fetchItems();
        },

        methods: {
            fetchItems()
            {
              let uri = 'http://localhost:4000/items';
              this.axios.get(uri).then((response) => {
                  this.items = response.data;
              });
            },
            deleteItem(id)
            {
              let uri = 'http://localhost:4000/items/delete/'+id;
              this.items.splice(id, 1);
              this.axios.get(uri);
            }
        }
    }
</script>
