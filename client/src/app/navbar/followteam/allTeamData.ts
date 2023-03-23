export interface AllTeamData{
    get: string,
    parameters: {
        id: Number
    },
    errors: String[],
    results: Number,
    response: {
        id: Number,
        name: String,
        logo: String,
        founded: Number,
        national: Boolean,
        colors: {
            color: String
        },
        arena: {
            name: String,
            capacity: Number,
            location: String
        },
        country: {
            id: Number,
            name: string,
            code: string,
            flag: string
        }
    }[]
}

export interface OneTeamData{
    id: string,
    name: String,
    logo: String,
    founded: Number,
    national: Boolean,
    colors: {
        color: String
    },
    arena: {
        name: String,
        capacity: Number,
        location: String
    },
    country: {
        id: string,
        name: string,
        code: string,
        flag: string
    }
}
