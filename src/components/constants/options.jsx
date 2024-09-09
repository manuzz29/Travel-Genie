export const SelectTravelesList=[
    {
        id:1,
        title:'Just me',
        desc:'A sole travels in exploration',
        icon:'🦍',
        people:'1',
    },
    {
        id:'2',
        title:'A couple',
        desc:'Two Travels in tandem',
        icon:'👥',
        people:'2',
    },
    {
        id:'3',
        title:'with Family',
        desc:'A group of fun',
        icon:'🏠',
        people:'3+',
    },
    {
        id:'4',
        title:'with Friends',
        desc:'A bunch of thrill adventures',
        icon:'👽',
        people:'4+',
    },
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the avg side',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💸',
    },
]


export const AI_PROMPT='Generate Travel plan for Location: {destination} ,for {totaldays} days for {Company} with a {budget} budget,Give me a Hotels options list with HotelName,HotelAddress,Price,Hotel image URL,Geo coordinates, ticket Pricing,Time Travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'