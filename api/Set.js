class Set {
    constructor(array) {
        this.members = array
    }

    union (set) {
        let collection = [...this.members, ...set.members]
        return new Set (collection.filter(x => !collection.some(y => y !== x)))
    }
    intersection (set) {
        return new Set ([...this.members, ...set.members].filter(x => this.members.includes(x) && set.members.includes(x)))
    }

    add (x) {
        this.members.push(x)
    }


}

module.exports = Set