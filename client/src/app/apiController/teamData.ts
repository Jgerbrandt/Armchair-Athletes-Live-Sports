export interface TeamData 
  {
    get: string,
    parameter: {
      team: string,
      league: string,
      season: string
      },
    errors: string[],
    results: Number,
    response: {
        country: {
            id: Number,
            name: string,
            code: string,
            flag: String
            },
        league: {
            id: number,
            name: string,
            type: string,
            logo: string,
            season: Number
            },
        team: {
            id: number,
            name: string,
            logo: string
            },
        games: {
            played: {
            home: number,
            away: number,
            all: number
            },
        wins: {
            home: {
                total: number,
                percentage: string
                },
            away: {
                total: number,
                percentage: string
                },
            all: {
                total: number,
                percentage: string
                }
        },
        loses: {
            home: {
                total: number,
                percentage: string
                },
            away: {
                total: number,
                percentage: string
                },
            all: {
                total: number,
                percentage: string
                }
            }
        },
        goals: {
            for: {
                total: {
                home: number,
                away: number,
                all: number
                },
                average: {
                home: string,
                away: string,
                all: string
                }
                },
            against: {
                total: {
                home: number,
                away: number,
                all: number
                },
                average: {
                 home: string,
                away: string,
                all: string
                }
                }
            }
        }
    }