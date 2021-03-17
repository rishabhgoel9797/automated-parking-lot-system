import { template } from "babel-core";

<template>
    <div class="container">
        <div class="countAndQuery">
            <div class="count">
                <p>Total Parking Slots: <span class="countFetched">{{ parkings }}</span></p>
                <p>Available Parking Slots: <span class="countFetched">{{ carsCount }}</span></p>
            </div>
            <div class="query">
                <button class="queryButton">Query Data</button>
                <button class="parkButton">Park a Car</button>
            </div>
        </div>
        <div class="searchData">
            <input
                type="text" placeholder="Type Exact Reg No."
                v-model="searchByRegNo"
                @keypress.enter="searchCar()"
            >
            <select v-model="filterByColor" @change="filterResultsByColor($event)">
                <option disabled value="">Choose Color</option>
                <option v-for="color in colorListReactive" v-bind:value="color">
                    {{ color }}
                </option>
            </select>
            <button class="searchButton" @click="searchCar()">Search</button>
            <button class="resetButton" @click="resetSearch()">Reset</button>
        </div>
        <div class="carDetails">
            <table width="100%">
                <tr class="table-heading-row">
                    <th>#</th>
                    <th>Car No<img class="sort-icon" src="../assets/sort-solid.svg" @click="sortByCarNo()"></th>
                    <th>Color<img class="sort-icon" src="../assets/sort-solid.svg" @click="sortByColor()"></th>
                    <th>Slot No.<img class="sort-icon" src="../assets/sort-solid.svg" @click="sortBySlot()"></th>
                    <th>Date Time</th>
                    <th></th>
                </tr>
                <tr v-for="(car, index) in parsedCarsDetailsReactively" :key="index+car.carNo">
                    <td>{{ index+1 }}</td>
                    <td>{{ car.carNo }}</td>
                    <td>{{ car.color }}</td>
                    <td>{{ car.slotNo }}</td>
                    <td>{{ car.date + ' ' + car.time}}</td>
                    <td><button class="removeCar" @click="removeCar(car)">Remove</button></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script src="./js/details.js"></script>

<style scoped>
    .countAndQuery {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
    }
    .queryButton, .parkButton, .searchButton, .resetButton {
        border: none;
        color: white;
        padding: 5px 10px;
        border-radius: 7px;
        font-weight: bold;
    }
    .queryButton {
        background: green;
    }
    .parkButton {
        background: red;
    }
    .searchData {
        float: right;
    }
    .searchButton {
        background: #008385;
    }
    .resetButton {
        background: grey;
    }
    .carDetails {
        margin-top: 70px;
    }
    .table-heading-row {
        background: grey;
        color: white;
    }
    table, td, th {
        border: 1px solid darkgray;
        border-collapse: collapse;
        padding: 5px;
        text-align: center;
    }
    .countFetched {
        color: red;
    }
    .sort-icon {
        height: 15px;
        margin: 5px 0 0 7px;
    }
    .removeCar {
        background: orange;
        color: black;
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
</style>


