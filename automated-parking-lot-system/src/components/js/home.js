export default {
    name: 'Home',
    data () {
        return {
            parkingPlaces: '',
            carsCount: '',
            carsDetails: [],
            carColors: ['red', 'blue', 'green', 'white', 'black']
        }
    },
    methods: {
        submitParkingDetails () {
            console.log(this.carsCount, this.parkingPlaces)
            if (this.carsCount > this.parkingPlaces) {
                alert('Number of Cars Parked Cannot be greater than Number of Parking Places')
                return
            }
            localStorage.setItem('parkingPlaces', this.parkingPlaces)
            localStorage.setItem('carsCount', this.carsCount)
            for (let index=0; index<this.carsCount; index++) {
                let carNumber = Math.random().toString(36).substring(4)
                let carObj = {
                    carNo: carNumber,
                    color: this.carColors[Math.floor(Math.random()* this.carColors.length)],
                    slotNo: index+1,
                    date: new Date(2020, 2, Math.floor(Math.random() * 30) + 1).toDateString(),
                    time: this.formatTime()
                }
                this.carsDetails.push(carObj)
            }
            console.log(this.carsDetails)
            localStorage.setItem('carsDetails', JSON.stringify(this.carsDetails))
            this.$router.push({
                name: 'Details'
            })
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