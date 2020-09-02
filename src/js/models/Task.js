export default class Task {
    constructor(id, description, isChecked) {
        this.id = id;
        this.description = description;
        this.isChecked = isChecked;
    }

    toggleCheck() {
        this.isChecked = this.isChecked ? false : true;
    }
};