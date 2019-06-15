export class DateHelper {
    static format(date: Date, overrides: {includeDay: boolean} = {includeDay: false}){
        let settings: any = {
            month: 'long',
            year: 'numeric'
        };

        if(overrides.includeDay){
            settings = {...settings, day: 'numeric'}
        }

        return date.toLocaleDateString('en-US', settings);
    }

    static getTime(date: Date){
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric'
        });
    }
}
