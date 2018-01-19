<template>
  <div>
    <h1>Add a City</h1>
    <form v-on:submit.prevent="addItem">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-control" v-model="item.name">
          </div>
        </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Note:</label>
              <input type="text" class="form-control col-md-6" v-model="item.description" />
            </div>
          </div>
        </div><br />
        <div class="form-group">
          <button class="btn btn-primary">Add</button>
        </div>
    </form>
  </div>
</template>
<script>
  export default {
    data(){
        return{
          item:{}
        }
    },
    methods: {
      addItem(){
        let uri = 'http://localhost:4000/items/add';
        this.axios.post(uri, this.item).then((response) => {
          this.$router.push({name: 'DisplayItem'})
        })
    }
  }
}
</script>
