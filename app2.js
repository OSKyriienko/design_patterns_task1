class User {
    constructor(lastVisitDate, globalDiscount, nightDiscount, weekendDiscount, ordersCount, ordersTotalPrice, bonus) {
        this.lastVisitDate = lastVisitDate;
        this.globalDiscount = globalDiscount;
        this.nightDiscount = nightDiscount;
        this.weekendDiscount = weekendDiscount;
        this.ordersCount = ordersCount;
        this.ordersTotalPrice = ordersTotalPrice;
        this.bonus = bonus;
    }
    getUserDiscount(night = this.nightDiscount, weekend = this.weekendDiscount) {
        return this.globalDiscount + night + weekend;
    }

    getUserBonus(additionBonus = this.bonus) {
        return additionBonus;
    }
}
const getDiscount = function(func, user) {
    let date = new Date();
    let hours = date.getHours();
    let day = date.getDay();
    let night,weekDay;
    if (hours > 22  || hours < 6) {
        night = user.nightDiscount;
    }
    else {
        night = 0;
    }

    if ((day === 0 ) || (day > 4)) {
        weekDay = user.weekendDiscount;
    }
    else {
        weekDay = 0;
    }
    return function() {
        return func.call(this, night, weekDay);
    }
}

const getBonus = function(func, user) {
    let date = new Date();
    let userDate = user.lastVisitDate;
    let year = userDate.slice(0,4);
    let month = userDate.slice(5,7);
    let day = userDate.slice(8,10);
    let hours = userDate.slice(11,13);
    let minutes = userDate.slice(14,16);
    let lastVisit = new Date(year,month-1,day,hours,minutes);
    let bonus = 240 - Math.floor((date - lastVisit)/(1000*60*60)) + user.ordersCount;
    return function() {
        return func.call(this,bonus);
    }
}

const user = new User('2018/05/24 19:30',15,20,30,5, 100, 5);

user.getUserDiscount = getDiscount(user.getUserDiscount, user);
console.log(`Total discount: ${user.getUserDiscount()}`);
user.getUserBonus = getBonus(user.getUserBonus, user);
console.log(`Total bonus: ${user.getUserBonus()}`);
//const user1 = new User('2018/05/24 19:30',15,20,30,5, 100, 5);
//console.log(user.getUserDiscount());