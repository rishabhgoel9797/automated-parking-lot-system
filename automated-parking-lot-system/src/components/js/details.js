export default {
    name: 'Details',
    data () {
        return {
            parsedCarsDetails: [],
            cars: '',
            carNoSortCount: 0,
            carColorSortCount: 0,
            carSlotSortCount: 0,
            colorsList: [],
            filterByColor: '',
            parkings: '',
            searchByRegNo: ''
        }
    },
    created () {
        this.parsedCarsDetails = JSON.parse(localStorage.getItem('carsDetails'))
        this.parkings = localStorage.getItem('parkingPlaces')
        this.cars = parseInt(localStorage.getItem('carsCount'))
        this.getColors()
        
    },
    computed: {
        parsedCarsDetailsReactively () {
            return this.parsedCarsDetails
        },
        carsCount () {
            return this.cars
        },
        colorListReactive () {
            console.log(this.colorsList)
            return this.colorsList
        }
    },
    methods: {
        getColors () {
            this.parsedCarsDetails.forEach(car => {
                if (this.colorsList.indexOf(car.color) === -1) {
                    this.colorsList.push(car.color)
                }
            })
        },
        searchCar () {
            if (this.searchByRegNo != '') {
                this.parsedCarsDetails = this.parsedCarsDetails.filter(obj => {
                    return obj.carNo === this.searchByRegNo
                })
            }
            return
        },
        resetSearch () {
            this.parsedCarsDetails = JSON.parse(localStorage.getItem('carsDetails'))
        },
        sortByCarNo () {
            if (this.carNoSortCount%2 === 0) {
                this.parsedCarsDetails.sort((car1, car2) => (car1.carNo > car2.carNo) ? 1 : -1)
            } else {
                this.parsedCarsDetails.sort((car1, car2) => (car1.carNo < car2.carNo) ? 1 : -1)
            }
            this.carNoSortCount++
        },
        sortByColor () {
            if (this.carColorSortCount%2 === 0) {
                this.parsedCarsDetails.sort((car1, car2) => (car1.color > car2.color) ? 1 : -1)
            } else {
                this.parsedCarsDetails.sort((car1, car2) => (car1.color < car2.color) ? 1 : -1)
            }
            this.carColorSortCount++
        },
        sortBySlot () {
            if (this.carSlotSortCount%2 === 0) {
                this.parsedCarsDetails.sort((car1, car2) => (car1.slotNo > car2.slotNo) ? 1 : -1)
            } else {
                this.parsedCarsDetails.sort((car1, car2) => (car1.slotNo < car2.slotNo) ? 1 : -1)
            }
            this.carSlotSortCount++
        },
        filterResultsByColor (event) {
            this.parsedCarsDetails = JSON.parse(localStorage.getItem('carsDetails')).filter(obj => {
                return obj.color === event.target.value
            })
        },
        removeCar (car) {
            this.parsedCarsDetails.forEach((obj, index) => {
                if (obj.slotNo === car.slotNo) {
                    this.parsedCarsDetails.splice(index, 1)
                    localStorage.setItem('carsDetails', JSON.stringify(this.parsedCarsDetails))
                    this.cars++
                    let colorOfRemovedCar = car.color
                    if ( this.parsedCarsDetails.find( car => car['color'] === colorOfRemovedCar )) {
                        return
                    } else {
                        this.colorsList.splice(this.colorsList.indexOf(colorOfRemovedCar), 1)
                    }
                }
            })
        }
    }
}