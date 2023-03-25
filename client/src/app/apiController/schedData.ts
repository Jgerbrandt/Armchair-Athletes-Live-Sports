export interface SchedData
{
    get: string
    parameters: {
        league: string
        season: string
        team: string
        }
    errors: string[]
    results: number
    response: [{
        id: number;
        date: string;
        timestamp: number;
        timezone: string;
        week: any;
        timer: any;
        status:{
            long: string;
            short: string;
        }
        country:{
            id: number;
            name: string;
            code: string;
            flag: String;
        }
        league:{
            id:number;
            name:string;
            type:string;
            logo:string;
            season:number;
        }
        teams:{
            home:{
                id:number;
                name:string;
                logo:string;
            }
            away:{
                id:number;
                name: string;
                logo:string;
            }
        }
        scores:{
            home:number;
            away:number;
        }
        periods:{
            first:string;
            second:string;
            third:string;
            overtime:string;
            penalties:any;
        }
        events: boolean;
        }
    ]
}