<template>
  <div class="container">
    <div class="inputArea">
      <h3>Enter Parking Details</h3>
      <div class="inputForm">
        <input
          type="text" placeholder="Number of Parking Places"
          v-model.number="parkingPlaces"
        >
        <input
          type="text" placeholder="Number of Cars Parked"
          v-model.number="carsCount"  
        >
      </div>
      <div class="submitDetails">
        <button @click="submitParkingDetails()">Submit Details</button>
      </div>
    </div>
  </div>
</template>

<script src="./js/home.js"></script>

<style scoped>
.container {
  margin-top: 20px;
}
.inputArea {
  max-width: 500px;
  border: 1px solid grey;
  margin: 0px auto;
}
.inputForm {
  display: flex;
  justify-content: space-around;
}

h3 {
  text-align: center;
}
.submitDetails {
 display: flex;
 justify-content: space-around;
}
.submitDetails button {
  margin: 10px;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>