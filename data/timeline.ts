export type TimelineEvent = {
    time: string,
    description: string,
    coverUrl: string,

}

export const timelineEvents: Array<TimelineEvent> = [
    {
        time: "Nov 1996",
        description: "🍼 Born in the province of Jiangxi, China.",
        coverUrl: "/images/profile.png"
    },
    {
        time: "Sep 2012",
        description: "🎟️ Enter Beijing Institue of Technology for my bachelor's degree. Major in Electronic Engineering.",
        coverUrl: "/images/profile.png"
    },
    {
        time: "Sep 2016",
        description: "Enter University of California, San Diego for my master's degres. Major in Intelligent Systems, Robtics & Control.",
        coverUrl: "/images/profile.png"
    },
    {
        time: "Sep 2018",
        description: "Join MicroStrategy as a Frontend software engineer. Focus on data visualiztion",
        coverUrl: "/images/profile.png"
    },
    {
        time: "Mar 2020",
        description: "Join Microsoft as a Full-stack software engineer. Developing web applications and web services.",
        coverUrl: "/images/profile.png"
    }
]