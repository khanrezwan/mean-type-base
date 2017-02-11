export interface section
{
    course_code: string,
    regular_schedule: [
        { 
            dayOfWeek:string, 
            roomNo:string, 
            startTime:string, 
            endTime:string
        }],
    faculty: Faculty,
    capacity: number,
    students: [Student],
    conducted_class: [
    {
        type: string,//Regular, Makeup, Central Makeup
        status: string, //Scheduled, Conducted, Cancelled
        schedule: { 
            dayOfWeek:string, 
            roomNo:string, 
            startTime:string, 
            endTime:string
        }
        }],
        approvedBy: string,
        makeupOf: string, // n/a or cancelled class
        classOf: string,// n/a or makeup class
        roomNo: number
    }
