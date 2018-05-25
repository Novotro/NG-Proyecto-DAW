export class Travels{
    constructor(
        public name: String,
        public country: String,
        public organizer: String,
        public  date: String,
        public  status: Boolean,
        public  description: String,
        public  galery: [String],
        public  markers: Array<any>
    ){}
}
