export class Coupon {

    public constructor(
        public companyName?: string,
        public id?: number,
        public title?: string,
        public startDate?: Date,
        public endDate?: Date,
        public category?: number,
        public amount?: number,
        public description?: string,
        public price?: number,
        public imageURL?: string
    ) {

    }
}