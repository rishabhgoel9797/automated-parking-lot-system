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
            collectedAmount: 0,
            filterByColor: '',
            newCarColor: '',
            newCarNumber: '',
            newCarSlot: '',
            newColorsList: ['red', 'blue', 'green', 'white', 'black'],
            parkings: '',
            parkCar: false,
            searchByRegNo: '',
            showAmount: false
        }
    },
    created () {
        this.parsedCarsDetails = JSON.parse(localStorage.getItem('carsDetails'))
        this.parkings = localStorage.getItem('parkingPlaces')
        this.cars = parseInt(this.parkings) - parseInt(localStorage.getItem('carsCount'))
        this.getColors()
        this.collectedAmount = parseInt(localStorage.getItem('collectedAmount'))
    },
    computed: {
        parsedCarsDetailsReactively () {
            return this.parsedCarsDetails
        },
        carsCount () {
            return this.cars
        },
        colorListReactive () {
            return this.colorsList
        },
        collectedAmountComputed () {
            return this.collectedAmount
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
            let colorOfRemovedCar = car.color
            this.parsedCarsDetails.forEach((obj, index) => {
                if (obj.slotNo === car.slotNo) {
                    this.parsedCarsDetails.splice(index, 1)
                    localStorage.setItem('carsDetails', JSON.stringify(this.parsedCarsDetails))
                    let carsCount = JSON.parse(localStorage.getItem('carsDetails')).length
                    localStorage.setItem('carsCount', carsCount)
                    this.cars++
                    this.collectedAmount += 20
                    localStorage.setItem('collectedAmount', this.collectedAmount)
                }
            })
            if (this.parsedCarsDetails.find( car => car['color'] != colorOfRemovedCar)) {
                this.colorsList.splice(this.colorsList.indexOf(colorOfRemovedCar), 1)
            }
        },
        checkAmount () {
            this.showAmount = !this.showAmount
        },
        parkCarMethod () {
            if (parseInt(this.parkings) === parseInt(localStorage.getItem('carsCount'))) {
                alert('Sorry No Car Parking Slots are availabe')
                return
            }
            this.parkCar = true
        },
        getSlot () {
            let slotArray = []
            this.parsedCarsDetails.forEach(element => {
                slotArray.push(element.slotNo)
            });
            slotArray.sort()
            for (let index = 0; index < parseInt(this.parkings); index++) {
                if ((slotArray).indexOf(index+1) === -1 ) {
                    this.newCarSlot = index+1
                    break;
                }
            }
        },
        addNewCar () {
            this.getSlot()
            let carObj = {
                carNo: this.newCarNumber,
                color: this.newCarColor,
                slotNo: this.newCarSlot,
                date: new Date().toDateString(),
                time: this.formatTime()
            }
            let allCarDetails = JSON.parse(localStorage.getItem('carsDetails'))
            allCarDetails.push(carObj)
            localStorage.setItem('carsDetails', JSON.stringify(allCarDetails))
            let carsCount = JSON.parse(localStorage.getItem('carsDetails')).length
            localStorage.setItem('carsCount', carsCount)
            this.cars--
            this.parsedCarsDetails.push(carObj)
            this.parkCar = false
        },
        formatTime () {
            let date = new Date()
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        }
    }
}